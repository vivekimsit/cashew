/**
 *
 * Cashew is a JAVA parser written in JavaScript.
 *
 * Cashew is written by Lucas Farias and Rafael Monteiro and released under an MIT
 * license. It was written using (Jison)[https://github.com/zaach/jison] by Zaach.
 *
 * Git repository for Cashew are available at
 *
 *     https://github.com/codecombat/cashew.git
 *
 * Please use the [github bug tracker][ghbt] to report issues.
 *
 * [ghbt]: https://github.com/codecombat/cashew/issues
 *
 **/

var variablesDictionary;

var Cashew = function(){
	variablesDictionary = [];

	//A little trick so we don't need to generate a static parser and can use a runtime generated parse
	var javaGrammar;
	jQuery.ajaxSetup({async:false});
	var jsFileLocation = $('script[src*=cashew]').attr('src'); //used to find the correct path to the coco-jison file
	jsFileLocation = jsFileLocation.substring(0, jsFileLocation.lastIndexOf('/')+1); 
	$.get(jsFileLocation+"coco-java.jison",function(data){ javaGrammar = data});

	var Parser= require("jison").Parser;
	var options = {'type' : 'slr'};
	var parser = new Parser(javaGrammar, options);

	//parser helpers
	parser.yy._ = _;
	parser.yy.JSON = JSON;

	function getRuntimeFunctions(range){
		var functions = new node("MemberExpression");
		functions.range = range;
		var runtime = createIdentifierNode("___JavaRuntime", range);

		var runtimeMethod =  createIdentifierNode("functions", range);

		functions.object = runtime;
		functions.property = runtimeMethod;
		functions.computed = false;
		return functions;
	}

	function getRuntimeOps(range){
		var functions = new node("MemberExpression");
		functions.range = range;
		var runtime = createIdentifierNode("___JavaRuntime", range);

		var runtimeMethod =  createIdentifierNode("ops", range);

		functions.object = runtime;
		functions.property = runtimeMethod;
		functions.computed = false;
		return functions;
	}

	getVariableType = function(varName){
		console.log(variablesDictionary);
		var varType = "unknown";
		_.each(variablesDictionary, function(variableEntry){
			if(variableEntry.name == varName){
				varType = variableEntry.type;
			}
		});
		return varType;
	}

	getArgumentForName = function(name, range){
		return createLiteralNode(name, "\""+name + "\"", range);
	}

	getArgumentForVariable = function(name, range){
		return createIdentifierNode(name, range);
	}

	getArgumentForNumber = function(number, range){
		return createLiteralNode(number, number, range);

	}

	/** AST Variable declaration and validation **/

	var varEntryId = 0;
	variableEntry = function(varName, varAccess, varType, varScope, varClazz, varMethod, varASTNodeID){
		this.id = varEntryId;
    	this.name = varName;
    	this.access = varAccess;
    	this.type = varType;
    	this.scope = varScope;
    	this.clazz = varClazz;
    	this.method = varMethod;
    	this.ASTNodeID = varASTNodeID;
		this.clazz = varClazz
		varEntryId += 1;
	}


// auxiliary functions

//
	//This method is going to recursively look for all the references using a variable from this block and bellow it
	//TODO: make this more clear
	findUpdateChildren = function(ast, variable) {
	  for (var k in ast) {
	    if (typeof ast[k] == "object" && ast[k] !== null) {
	     	var node = ast[k];
	     	if(node.type !== undefined && node.type === "VariableDeclaration"){
				if(node.declarations[0].id.name == variable.name){
					node.declarations[0].id.name = "__" + variable.id;
				}
			}
			if(node.type === "CallExpression"){
				if(node.name == variable.name){
					node.name = "__" + variable.id;	
				}
				_.each(node.arguments, function(argNode){
					if(argNode.type == "Identifier" && argNode.name == variable.name){
						argNode.name = "__" + variable.id;
					}
				});
				if(node.callee.property.name == "validateSet" && node.callee.object.object.name == "___JavaRuntime"){
					if(node.arguments[1].type == "Identifier" && node.arguments[1].name == "__" + variable.id){
						node.arguments[1].type = "Literal";

						node.arguments[1].name = undefined;

						node.arguments[1].value = "__" + variable.id;
					}
				}
			}
			if(node.type !== undefined && node.type === "ExpressionStatement" ){
				if(node.expression.type == "AssignmentExpression"){
					if (node.expression.left.name == variable.name){
						node.expression.left.name = "__" + variable.id;
					}
					_.each(node.expression.right.arguments, function(argNode){
						if(argNode.type == "Identifier" && argNode.name == variable.name){
							argNode.name = "__" + variable.id;
						}
					});
				}
			}
			ast[k] = node;
			ast[k] = findUpdateChildren(ast[k], variable);
	    }
	  }
	  return ast;
	}
	

	parser.yy.createUpdateMethodVariableReference = function createUpdateMethodVariableReference(variableNodes, methodProperties, block){
		if (variablesDictionary.length > 0) {

		}else{
			_.each(variableNodes, function(variableNode){
				var newVar = new variableEntry(variableNode.declarations[0].id.name, "", variableNode.javaType, 
					"method", "", methodProperties.methodSignature, variableNode.ASTNodeID);
				findUpdateChildren(block, newVar);
				variablesDictionary.push(newVar);
			});
		}
	} 

	parser.yy.createMethodSignatureObject = function createMethodSignatureObject(methodIdentifier, methodSignature){
		var methodSignatureObject = {
			'methodName' : methodIdentifier,
			'methodSignature' : methodSignature,
			'returnType' : null,
			'modifiers' : null
		}
		return methodSignatureObject;
	}

	var createVariableAttribution = parser.yy.createVariableAttribution = function createVariableAttribution(varName, varRange, assignmentRange, expressionNode){
		var assignmentNode = new node("ExpressionStatement");
		assignmentNode.range = assignmentRange;

		var assignmentExpressionNode = new node("AssignmentExpression");
		assignmentExpressionNode.range = assignmentRange;
		assignmentExpressionNode.operator = '=';

		var varIdentifier = createIdentifierNode(varName, varRange); 

		assignmentExpressionNode.left = varIdentifier;

		var setNode = new node("CallExpression");
		setNode.range = assignmentRange;
		setNode.arguments = [];
		setNode.arguments.push(expressionNode);
		setNode.arguments.push(getArgumentForVariable(varName, varRange));
		setNode.arguments.push(getArgumentForNumber(assignmentNode.ASTNodeID, assignmentRange));
		var callee = new node("MemberExpression");
		callee.range = assignmentRange;

		var functions = getRuntimeFunctions(assignmentRange);

		var setProperty = createIdentifierNode("validateSet", assignmentRange);

		callee.object = functions;
		callee.property = setProperty;
		callee.computed  = false;


		setNode.callee = callee;

		assignmentExpressionNode.right = setNode;

		assignmentNode.expression = assignmentExpressionNode;
		return assignmentNode;
	}

	parser.yy.createEmptyStatement = function createEmptyStatement(range){
		var emptyStatement = new node("EmptyStatement");
		emptyStatement.range = range;
		return emptyStatement;
	}

	parser.yy.createMathOperation = function createMathOperation(op, left, right, range){
		var operation;
		switch (op){
			case '+':
				operation = "add";
				break;
			case '-':
				operation = "sub";
				break;
			case '*':
				operation = "mul";
				break;
			case '/':
				operation = "div";
				break;
			case '%':
				operation = "mod";
				break;
			default:
				throw SyntaxError('Invalid Operation');
				break;
		}

		var operationNode = new node("CallExpression");
		operationNode.range = range;
		operationNode.arguments = [];
		operationNode.arguments.push(left);
		operationNode.arguments.push(right);
		var callee = new node("MemberExpression");
		callee.range = range;

		var ops = getRuntimeOps(range);

		var opsProperty = createIdentifierNode(operation, range);

		callee.object = ops;
		callee.property = opsProperty;
		callee.computed  = false;

		operationNode.callee = callee;

		return operationNode;
	}

	/** AST generation methods and structures **/
	var ASTNodeID = 0;
	var ast = {
	    rootNode: {
	        type : "Program",
	        ASTNodeID: 0,
	        range: [],
	        body : []
	    },
	    currentNode: this.rootNode,
	    createRoot: function(node, range) {
	     this.rootNode.range = range;
	     if(node != null){
	     	this.rootNode.body = this.rootNode.body.concat(node);
	     }
	     return this.rootNode;
	    }

	  };
	parser.yy.ast = ast;

	this.toNode = function(p){
		var node = new node();
		for(var prop in p){
			node[prop] = p[prop];
		}
		return node;
		function node(){}
	}

	node = function(type){
		ASTNodeID += 1;
		this.type = type;
		this.ASTNodeID = ASTNodeID;
	}

	createLiteralNode = function(value, raw, range){
		var literalNode = new node("Literal");
		literalNode.range = range;
		literalNode.value = value;
		literalNode.raw = raw;
		return literalNode;
	}

	createIdentifierNode = function(name, range){
		var identifierNode = new node("Identifier");
		identifierNode.range = range;
		identifierNode.name = name;
		return identifierNode;
	}

	parser.yy.createLiteralNode = createLiteralNode;

	parser.yy.createIdentifierNode = function createIdentifierNode(name , range){
		var identifierNode = new node("Identifier");
		identifierNode.range = range;
		identifierNode.name = name;
		return identifierNode;
	}

	parser.yy.createVarDeclarationNodeNoInit = function createVarDeclarationNodeNoInit(varName, declarationRange){
		var varDeclarationNode = new node("VariableDeclaration");
		varDeclarationNode.range = declarationRange;
		varDeclarationNode.kind = "var";
		varDeclarationNode.javaType = null;
		varDeclarationNode.declarations = [];


		var varDeclaratorNode = new node("VariableDeclarator");
		varDeclaratorNode.range = declarationRange;

		var idNode = createIdentifierNode(varName, declarationRange);

		varDeclaratorNode.id = idNode;

		varDeclaratorNode.init = null;

		varDeclarationNode.declarations.push(varDeclaratorNode);

		return varDeclarationNode;
	}

	parser.yy.createVarDeclarationNodeWithInit = function createVarDeclarationNodeWithInit(varName, varRange, assignment, assignmentRange, declarationRange){
		var varDeclarationNode = new node("VariableDeclaration");
		varDeclarationNode.range = declarationRange;
		varDeclarationNode.kind = "var";
		varDeclarationNode.javaType = null;
		varDeclarationNode.declarations = [];


		var varDeclaratorNode = new node("VariableDeclarator");
		varDeclaratorNode.range = declarationRange;

		var idNode = createIdentifierNode(varName, declarationRange);

		varDeclaratorNode.id = idNode;


		var initNode = new node("CallExpression");
		initNode.range = assignmentRange;
		initNode.arguments = [];
		initNode.arguments.push(assignment);
		initNode.arguments.push(getArgumentForVariable(varName, varRange));
		initNode.arguments.push(getArgumentForNumber(assignment.ASTNodeID, assignmentRange));
		var callee = new node("MemberExpression");
		callee.range = assignmentRange;

		var functions = getRuntimeFunctions(assignmentRange);

		var initProperty = createIdentifierNode("validateSet", assignmentRange);

		callee.object = functions;
		callee.property = initProperty;
		callee.computed  = false;


		initNode.callee = callee;


		varDeclaratorNode.init = initNode;

		varDeclarationNode.declarations.push(varDeclaratorNode);

		attrNode = createVariableAttribution(varName, assignmentRange, declarationRange, assignment);

		return varDeclarationNode;
	}

	parser.yy.setVariableTypes = function setVariableTypes(type, nodes){
		_.each(nodes, function(node) {
			node.javaType = type;
		});
		return nodes;
	}

	parser.yy.createExpressionStatementNode =  function createExpressionStatementNode(expression, range){
		var expressionStatementNode = new node("ExpressionStatement");
		expressionStatementNode.range = range
		expressionStatementNode.expression = expression;
		return expressionStatementNode;
	}

	parser.yy.createConsoleLogExpression = function createConsoleLogExpression(expression, range){
		var consoleLogNode = new node("CallExpression");
		consoleLogNode.range = range;
		consoleLogNode.arguments = [];
		consoleLogNode.arguments.push(expression);
		var callee = new node("MemberExpression");
		callee.range = range;

		var functions = getRuntimeFunctions(range);

		var printProperty = createIdentifierNode("print", range);

		callee.object = functions;
		callee.property = printProperty;
		callee.computed  = false;


		consoleLogNode.callee = callee;

		return consoleLogNode;
	}
	

	this.parse = function parse(javaCode){
		ast = parser.parse(javaCode);
		return ast;
	}

	return this;
}



var ___JavaRuntime = { 
	functions : {
		print: function(str){
			console.log(str);
		},
		validateSet: function(value, variable, ASTNodeID){
			if(typeof value === "function")
				value = value();
			//Removes the '__' from the variable name
			var index = parseInt(variable.substring(2));
			var varType = variablesDictionary[index].type;
			
			switch (varType){
				case 'int':
					if (typeof value === 'number'){
						if (value % 1 === 0){
							return value;
						}
					}
					throw new SyntaxError("This is not an int maybe a cast is missing");
				
					break;
				case 'double':
					if (typeof value === 'number'){
							return value;
					}
					throw new SyntaxError("This is not a double maybe a cast is missing");
					break;
				case 'boolean':
					if (typeof value === 'boolean'){
							return value;
					}
					throw new SyntaxError("This is not a boolean maybe a cast is missing");
					break;
				case 'String':
					if (typeof value === 'string'){
							return value;
					}
					throw new SyntaxError("This is not a String maybe a cast is missing");
					break;
				default:
					break;

			}
		}
	},
	ops : {
		add: function(arg1, arg2){
			return arg1 + arg2;
		},
		sub: function(arg1, arg2){
			return arg1 - arg2;
		},
		mul: function(arg1, arg2){
			return arg1 * arg2;
		},
		div: function(arg1, arg2){
			return arg1 / arg2;
		},
		mod: function(arg1, arg2){
			return arg1 % arg2;
		}
	}
}



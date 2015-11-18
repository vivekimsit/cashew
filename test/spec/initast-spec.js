
// Empty Program
describe("Empty program", function() {
	var code = '';
  var cashew = new Cashew();
  var parsedAST = cashew.parse(code);
	var ast =  {
	  "type": "Program",
    "range": [0, 0],
	  "body": []
	};
  ast = toASTNodes(cashew, ast);
  it("Should return an empty program AST", function() {
  expect(
      JSON.stringify(cleanAST(parsedAST)) === JSON.stringify(ast)
    ).toBe(true);	
  });

  });

//Milestone 3 

describe("Variable declaration", function() {
  var code = 'public class MyClass { public static void main(String[] args) { int x; }}';
  var cashew = new Cashew();
  var parsedAST = cashew.parse(code);
  var ast =  {
              "type": "Program",
              "range": [
                23,
                72
              ],
              "body": [
                {
                  "type": "VariableDeclaration",
                  "range": [
                    68,
                    69
                  ],
                  "kind": "var",
                  "javaType": "int",
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "range": [
                        68,
                        69
                      ],
                      "id": {
                        "type": "Identifier",
                        "range": [
                          68,
                          69
                        ],
                        "name": "__0"
                      },
                      "init": null
                    }
                  ]
                }
              ]
            };
  ast = toASTNodes(cashew, ast);
  it("Should return variable declaration AST", function() {
  expect(
      JSON.stringify(cleanAST(parsedAST)) === JSON.stringify(ast)
    ).toBe(true); 
    });
  });

describe("Assignments", function() {
  var code = 'public class VariableClass { public static void main(String[] args) { int i1, i2; i1 = 0; i2 = 2; }}';
  var cashew = new Cashew();
  var parsedAST = cashew.parse(code);
  var ast =  {
        "type": "Program",
        "range": [
          29,
          99
        ],
        "body": [
          {
            "type": "VariableDeclaration",
            "range": [
              74,
              76
            ],
            "kind": "var",
            "javaType": "int",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "range": [
                  74,
                  76
                ],
                "id": {
                  "type": "Identifier",
                  "range": [
                    74,
                    76
                  ],
                  "name": "__0"
                },
                "init": null
              }
            ]
          },
          {
            "type": "VariableDeclaration",
            "range": [
              78,
              80
            ],
            "kind": "var",
            "javaType": "int",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "range": [
                  78,
                  80
                ],
                "id": {
                  "type": "Identifier",
                  "range": [
                    78,
                    80
                  ],
                  "name": "__1"
                },
                "init": null
              }
            ]
          },
          {
            "type": "ExpressionStatement",
            "range": [
              82,
              89
            ],
            "expression": {
              "type": "AssignmentExpression",
              "range": [
                82,
                89
              ],
              "operator": "=",
              "left": {
                "type": "Identifier",
                "range": [
                  82,
                  84
                ],
                "name": "__0"
              },
              "right": {
                "type": "CallExpression",
                "range": [
                  82,
                  89
                ],
                "arguments": [
                  {
                    "type": "Literal",
                    "range": [
                      87,
                      88
                    ],
                    "value": 0,
                    "raw": "0"
                  },
                  {
                    "type": "Literal",
                    "range": [
                      82,
                      84
                    ],
                    "value": "__0",
                    "raw": "\"__0\""
                  },
                  {
                    "type": "Literal",
                    "range": [
                      82,
                      89
                    ],
                    "value": 8,
                    "raw": 8
                  }
                ],
                "callee": {
                  "type": "MemberExpression",
                  "range": [
                    82,
                    89
                  ],
                  "object": {
                    "type": "MemberExpression",
                    "range": [
                      82,
                      89
                    ],
                    "object": {
                      "type": "Identifier",
                      "range": [
                        82,
                        89
                      ],
                      "name": "___JavaRuntime"
                    },
                    "property": {
                      "type": "Identifier",
                      "range": [
                        82,
                        89
                      ],
                      "name": "functions"
                    },
                    "computed": false
                  },
                  "property": {
                    "type": "Identifier",
                    "range": [
                      82,
                      89
                    ],
                    "name": "validateSet"
                  },
                  "computed": false
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "range": [
              90,
              97
            ],
            "expression": {
              "type": "AssignmentExpression",
              "range": [
                90,
                97
              ],
              "operator": "=",
              "left": {
                "type": "Identifier",
                "range": [
                  90,
                  92
                ],
                "name": "__1"
              },
              "right": {
                "type": "CallExpression",
                "range": [
                  90,
                  97
                ],
                "arguments": [
                  {
                    "type": "Literal",
                    "range": [
                      95,
                      96
                    ],
                    "value": 2,
                    "raw": "2"
                  },
                  {
                    "type": "Literal",
                    "range": [
                      90,
                      92
                    ],
                    "value": "__1",
                    "raw": "\"__1\""
                  },
                  {
                    "type": "Literal",
                    "range": [
                      90,
                      97
                    ],
                    "value": 20,
                    "raw": 20
                  }
                ],
                "callee": {
                  "type": "MemberExpression",
                  "range": [
                    90,
                    97
                  ],
                  "object": {
                    "type": "MemberExpression",
                    "range": [
                      90,
                      97
                    ],
                    "object": {
                      "type": "Identifier",
                      "range": [
                        90,
                        97
                      ],
                      "name": "___JavaRuntime"
                    },
                    "property": {
                      "type": "Identifier",
                      "range": [
                        90,
                        97
                      ],
                      "name": "functions"
                    },
                    "computed": false
                  },
                  "property": {
                    "type": "Identifier",
                    "range": [
                                90,
                                97
                              ],
                              "name": "validateSet"
                            },
                            "computed": false
                          }
                        }
                      }
                    }
                  ]
                };
  ast = toASTNodes(cashew, ast);
  it("Should return assignment AST", function() {
  expect(
      JSON.stringify(cleanAST(parsedAST)) === JSON.stringify(ast)
    ).toBe(true); 
    });
  });

describe("Logic operators", function() {
  var code = 'public class LogicalClass { public static void main(String[] args) { boolean a1 = true && false; boolean o2 = false || true; boolean n3 = !true; }}';
  var cashew = new Cashew();
  var parsedAST = cashew.parse(code);
  var ast =  {
  "type": "Program",
  "range": [
    28,
    146
  ],
  "body": [
    {
      "type": "VariableDeclaration",
      "range": [
        77,
        95
      ],
      "kind": "var",
      "javaType": "boolean",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "range": [
            77,
            95
          ],
          "id": {
            "type": "Identifier",
            "range": [
              77,
              95
            ],
            "name": "__0"
          },
          "init": {
            "type": "CallExpression",
            "range": [
              82,
              95
            ],
            "arguments": [
              {
                "type": "LogicalExpression",
                "range": [
                  82,
                  95
                ],
                "operator": "&&",
                "left": {
                  "type": "Literal",
                  "range": [
                    82,
                    86
                  ],
                  "value": true,
                  "raw": "true"
                },
                "right": {
                  "type": "Literal",
                  "range": [
                    90,
                    95
                  ],
                  "value": false,
                  "raw": "false"
                }
              },
              {
                "type": "Literal",
                "range": [
                  77,
                  79
                ],
                "value": "__0"
              },
              {
                "type": "Literal",
                "range": [
                  82,
                  95
                ],
                "value": 3,
                "raw": 3
              }
            ],
            "callee": {
              "type": "MemberExpression",
              "range": [
                82,
                95
              ],
              "object": {
                "type": "MemberExpression",
                "range": [
                  82,
                  95
                ],
                "object": {
                  "type": "Identifier",
                  "range": [
                    82,
                    95
                  ],
                  "name": "___JavaRuntime"
                },
                "property": {
                  "type": "Identifier",
                  "range": [
                    82,
                    95
                  ],
                  "name": "functions"
                },
                "computed": false
              },
              "property": {
                "type": "Identifier",
                "range": [
                  82,
                  95
                ],
                "name": "validateSet"
              },
              "computed": false
            }
          }
        }
      ]
    },
    {
      "type": "VariableDeclaration",
      "range": [
        105,
        123
      ],
      "kind": "var",
      "javaType": "boolean",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "range": [
            105,
            123
          ],
          "id": {
            "type": "Identifier",
            "range": [
              105,
              123
            ],
            "name": "__1"
          },
          "init": {
            "type": "CallExpression",
            "range": [
              110,
              123
            ],
            "arguments": [
              {
                "type": "LogicalExpression",
                "range": [
                  110,
                  123
                ],
                "operator": "||",
                "left": {
                  "type": "Literal",
                  "range": [
                    110,
                    115
                  ],
                  "value": false,
                  "raw": "false"
                },
                "right": {
                  "type": "Literal",
                  "range": [
                    119,
                    123
                  ],
                  "value": true,
                  "raw": "true"
                }
              },
              {
                "type": "Literal",
                "range": [
                  105,
                  107
                ],
                "value": "__1"
              },
              {
                "type": "Literal",
                "range": [
                  110,
                  123
                ],
                "value": 28,
                "raw": 28
              }
            ],
            "callee": {
              "type": "MemberExpression",
              "range": [
                110,
                123
              ],
              "object": {
                "type": "MemberExpression",
                "range": [
                  110,
                  123
                ],
                "object": {
                  "type": "Identifier",
                  "range": [
                    110,
                    123
                  ],
                  "name": "___JavaRuntime"
                },
                "property": {
                  "type": "Identifier",
                  "range": [
                    110,
                    123
                  ],
                  "name": "functions"
                },
                "computed": false
              },
              "property": {
                "type": "Identifier",
                "range": [
                  110,
                  123
                ],
                "name": "validateSet"
              },
              "computed": false
            }
          }
        }
      ]
    },
    {
      "type": "VariableDeclaration",
      "range": [
        133,
        143
      ],
      "kind": "var",
      "javaType": "boolean",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "range": [
            133,
            143
          ],
          "id": {
            "type": "Identifier",
            "range": [
              133,
              143
            ],
            "name": "__2"
          },
          "init": {
            "type": "CallExpression",
            "range": [
              138,
              143
            ],
            "arguments": [
              {
                "type": "UnaryExpression",
                "range": [
                  138,
                  143
                ],
                "operator": "!",
                "prefix": "true",
                "argument": {
                  "type": "Literal",
                  "range": [
                    139,
                    143
                  ],
                  "value": true,
                  "raw": "true"
                }
              },
              {
                "type": "Literal",
                "range": [
                  133,
                  135
                ],
                "value": "__2"
              },
              {
                "type": "Literal",
                "range": [
                  138,
                  143
                ],
                "value": 52,
                "raw": 52
              }
            ],
            "callee": {
              "type": "MemberExpression",
              "range": [
                138,
                143
              ],
              "object": {
                "type": "MemberExpression",
                "range": [
                  138,
                  143
                ],
                "object": {
                  "type": "Identifier",
                  "range": [
                    138,
                    143
                  ],
                  "name": "___JavaRuntime"
                },
                "property": {
                  "type": "Identifier",
                  "range": [
                    138,
                    143
                  ],
                  "name": "functions"
                },
                "computed": false
              },
              "property": {
                "type": "Identifier",
                "range": [
                  138,
                  143
                ],
                "name": "validateSet"
              },
              "computed": false
            }
          }
        }
      ]
    }
  ]
};
  ast = toASTNodes(cashew, ast);
  it("Should return Logic operators AST", function() {
  expect(
      JSON.stringify(cleanAST(parsedAST)) === JSON.stringify(ast)
    ).toBe(true); 
    });
  });

describe("Math operations", function() {
  var code = '  ';
  var cashew = new Cashew();
  var parsedAST = cashew.parse(code);
  var ast =  {
    "type": "Program",
    "range": [0, 0],
    "body": []
    };
  ast = toASTNodes(cashew, ast);
  xit("Should return Math operations AST", function() {
  expect(
      JSON.stringify(cleanAST(parsedAST)) === JSON.stringify(ast)
    ).toBe(true); 
    });
  });

describe("String concatenation", function() {
  var code = '  ';
  var cashew = new Cashew();
  var parsedAST = cashew.parse(code);
  var ast =  {
    "type": "Program",
    "range": [0, 0],
    "body": []
    };
  ast = toASTNodes(cashew, ast);
  xit("Should return String concatenation AST", function() {
  expect(
      JSON.stringify(cleanAST(parsedAST)) === JSON.stringify(ast)
    ).toBe(true); 
    });
  });
  
describe("If Clause", function() {
  var code = '  ';
  var cashew = new Cashew();
  var parsedAST = cashew.parse(code);
  var ast =  {
    "type": "Program",
    "range": [0, 0],
    "body": []
    };
  ast = toASTNodes(cashew, ast);
  xit("Should return an IF clause AST", function() {
  expect(
      JSON.stringify(cleanAST(parsedAST)) === JSON.stringify(ast)
    ).toBe(true); 
    });
  });

describe("For loop", function() {
  var code = '  ';
  var cashew = new Cashew();
  var parsedAST = cashew.parse(code);
  var ast =  {
    "type": "Program",
    "range": [0, 0],
    "body": []
    };
  ast = toASTNodes(cashew, ast);
  xit("Should return an For loop AST", function() {
  expect(
      JSON.stringify(cleanAST(parsedAST)) === JSON.stringify(ast)
    ).toBe(true); 
    });
  });

describe("While loop", function() {
  var code = '  ';
  var cashew = new Cashew();
  var parsedAST = cashew.parse(code);
  var ast =  {
    "type": "Program",
    "range": [0, 0],
    "body": []
    };
  ast = toASTNodes(cashew, ast);
  xit("Should return a While loop AST", function() {
  expect(
      JSON.stringify(cleanAST(parsedAST)) === JSON.stringify(ast)
    ).toBe(true); 
    });
  });


// done

describe("System.out.println", function() {
  var code= 'public class MyClass{/** main method */public static void main(String[]args){System.out.println(\"Type your code here\");}}';
  var cashew = new Cashew();
  var parsedAST = cashew.parse(code);
	var ast ={
   "type": "Program",
    "range": [
      39,
      120
    ],
    "body": [
      {
        "type": "ExpressionStatement",
        "range": [
          77,
          119
        ],
        "expression": {
          "type": "CallExpression",
          "range": [
            77,
            119
          ],
          "arguments": [
            {
              "type": "Literal",
              "range": [
                96,
                117
              ],
              "value": "Type your code here",
              "raw": "\"Type your code here\""
            }
          ],
          "callee": {
            "type": "MemberExpression",
            "range": [
              77,
              119
            ],
            "object": {
              "type": "MemberExpression",
              "range": [
                77,
                119
              ],
              "object": {
                "type": "Identifier",
                "range": [
                  77,
                  119
                ],
                "name": "___JavaRuntime"
              },
              "property": {
                "type": "Identifier",
                "range": [
                  77,
                  119
                ],
                "name": "functions"
              },
              "computed": false
            },
            "property": {
              "type": "Identifier",
              "range": [
                77,
                119
              ],
              "name": "print"
            },
            "computed": false
          }
        }
      }
    ]
  };

  ast = toASTNodes(cashew, ast);
	it("Should return a System.out.println AST", function() {
      expect( JSON.stringify(cleanAST(parsedAST)) == JSON.stringify(ast)).toBe(true);
	});

});



// auxiliary functions
function cleanAST(ast) {
  for (var k in ast) {
    if (typeof ast[k] == "object" && ast[k] !== null) {
     ast[k] = cleanAST(ast[k]);
    } else {
      if(k === "ASTNodeID") {
        delete ast[k];
      }
    }
  }
  return ast;
}

function toASTNodes(parser, ast) {
  for (var k in ast) {
    if (typeof ast[k] == "object" && ast[k] !== null && ast[k] !== "Program") {
     // console.log("---"+ast[k]);
      //console.log("TESTE");
      if(!Array.isArray(ast[k]))
        ast[k] = toASTNodes(parser, parser.toNode(ast[k]));
      else 
        ast[k] = toASTNodes(parser, ast[k]);
    }
  }
  return ast;
}
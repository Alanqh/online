export const Behavior3_HppyHopcotch = {
  "name": "HppyHopcotch",
  "root": {
    "id": 1,
    "name": "Selector",
    "desc": "新行为树",
    "args": {},
    "children": [
      {
        "id": 2,
        "name": "Selector",
        "args": {},
        "children": [
          {
            "id": 3,
            "name": "Sequence",
            "children": [
              {
                "id": 4,
                "name": "GhostInit"
              },
              {
                "id": 5,
                "name": "GetCurGameTheme",
                "args": {
                  "themes": "2|3"
                }
              },
              {
                "id": 6,
                "name": "GhostChangeSpd",
                "args": {
                  "spdRate": 0.6
                }
              }
            ]
          },
          {
            "id": 7,
            "name": "Sequence",
            "children": [
              {
                "id": 8,
                "name": "GhostInit",
                "children": []
              },
              {
                "id": 9,
                "name": "SetInt",
                "args": {
                  "num": 0
                },
                "output": [
                  "Stat"
                ]
              }
            ]
          },
          {
            "id": 10,
            "name": "AlwaysFail",
            "children": [
              {
                "id": 11,
                "name": "GhostGetDistance",
                "args": {
                  "treeName": "MommyLongLegs"
                },
                "output": [
                  "momDis"
                ]
              }
            ]
          },
          {
            "id": 12,
            "name": "Sequence",
            "desc": "buff状态",
            "args": {},
            "children": [
              {
                "id": 13,
                "name": "Cmp",
                "args": {
                  "eq": 800,
                  "cmpType": ">"
                },
                "input": [
                  "momDis"
                ],
                "children": []
              },
              {
                "id": 14,
                "name": "AlwaysSuccess",
                "children": [
                  {
                    "id": 15,
                    "name": "Selector",
                    "desc": "进攻版本",
                    "args": {},
                    "children": [
                      {
                        "id": 16,
                        "name": "Sequence",
                        "children": [
                          {
                            "id": 17,
                            "name": "Cmp",
                            "args": {
                              "eq": 2,
                              "cmpType": "="
                            },
                            "input": [
                              "Stat"
                            ]
                          },
                          {
                            "id": 18,
                            "name": "SetInt",
                            "args": {
                              "num": 1
                            },
                            "output": [
                              "Stat"
                            ]
                          },
                          {
                            "id": 19,
                            "name": "GhostPlayMusic",
                            "args": {
                              "music": "130808",
                              "radius": 500,
                              "keepTime": -1
                            }
                          }
                        ]
                      },
                      {
                        "id": 20,
                        "name": "Sequence",
                        "args": {},
                        "children": [
                          {
                            "id": 21,
                            "name": "GhostCheckStat",
                            "args": {
                              "stat": "Chasing"
                            },
                            "children": []
                          },
                          {
                            "id": 22,
                            "name": "GhostTargetId",
                            "args": {},
                            "output": [
                              "targetId"
                            ]
                          },
                          {
                            "id": 23,
                            "name": "Selector",
                            "children": [
                              {
                                "id": 24,
                                "name": "Selector",
                                "args": {},
                                "children": [
                                  {
                                    "id": 25,
                                    "name": "Sequence",
                                    "children": [
                                      {
                                        "id": 26,
                                        "name": "Not",
                                        "children": [
                                          {
                                            "id": 27,
                                            "name": "GhostCheckTargetSafe",
                                            "args": {},
                                            "input": [
                                              "targetId"
                                            ]
                                          }
                                        ]
                                      },
                                      {
                                        "id": 28,
                                        "name": "GhostLockAttackTarget",
                                        "args": {
                                          "checkDis": 100
                                        },
                                        "input": [
                                          "targetId"
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    "id": 29,
                                    "name": "Sequence",
                                    "children": [
                                      {
                                        "id": 30,
                                        "name": "GhostCheckTarget",
                                        "args": {
                                          "isCheckPos": 0
                                        },
                                        "input": [
                                          "targetId"
                                        ]
                                      },
                                      {
                                        "id": 31,
                                        "name": "GhostClearTarget"
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "id": 32,
                                "name": "GhostChaseTarget",
                                "args": {},
                                "input": [
                                  "targetId"
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": 33,
                        "name": "Selector",
                        "desc": "休闲分支",
                        "args": {},
                        "children": [
                          {
                            "id": 34,
                            "name": "Sequence",
                            "args": {},
                            "children": [
                              {
                                "id": 35,
                                "name": "FallBack",
                                "args": {},
                                "children": [
                                  {
                                    "id": 36,
                                    "name": "GhostSightCheckNode",
                                    "args": {
                                      "isCheckPos": 0
                                    },
                                    "output": [
                                      "targetId"
                                    ]
                                  }
                                ]
                              },
                              {
                                "id": 37,
                                "name": "GhostStartChaseTarget",
                                "args": {},
                                "input": [
                                  "targetId"
                                ],
                                "children": []
                              },
                              {
                                "id": 38,
                                "name": "GhostBuffer",
                                "args": {
                                  "spdRate": 1.2
                                }
                              }
                            ]
                          },
                          {
                            "id": 39,
                            "name": "Sequence",
                            "desc": "1",
                            "args": {},
                            "children": [
                              {
                                "id": 40,
                                "name": "Not",
                                "args": {},
                                "children": [
                                  {
                                    "id": 41,
                                    "name": "GhostIsMoving",
                                    "args": {}
                                  }
                                ]
                              },
                              {
                                "id": 42,
                                "name": "Not",
                                "args": {},
                                "children": [
                                  {
                                    "id": 43,
                                    "name": "GhostCheckStat",
                                    "args": {
                                      "stat": "patrolStat"
                                    }
                                  }
                                ]
                              },
                              {
                                "id": 44,
                                "name": "Selector",
                                "args": {},
                                "children": [
                                  {
                                    "id": 45,
                                    "name": "Sequence",
                                    "args": {},
                                    "children": [
                                      {
                                        "id": 46,
                                        "name": "GhostCheckStat",
                                        "args": {
                                          "stat": "patrolFinish"
                                        }
                                      },
                                      {
                                        "id": 47,
                                        "name": "RandomPasser",
                                        "args": {
                                          "passRate": 0.1
                                        }
                                      },
                                      {
                                        "id": 48,
                                        "name": "GhostPlayPatrolAni",
                                        "args": {
                                          "keepTime": 4
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "id": 49,
                                    "name": "Sequence",
                                    "children": [
                                      {
                                        "id": 50,
                                        "name": "RandomPasser",
                                        "args": {
                                          "passRate": 0
                                        }
                                      },
                                      {
                                        "id": 51,
                                        "name": "GhostRandomFindPlayer",
                                        "args": {
                                          "keepTime": 4
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "id": 52,
                                    "name": "GhostRandomPartol",
                                    "args": {}
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": 53,
            "name": "Sequence",
            "desc": "普通状态",
            "args": {},
            "children": [
              {
                "id": 54,
                "name": "Selector",
                "desc": "进攻版本",
                "args": {},
                "children": [
                  {
                    "id": 55,
                    "name": "Sequence",
                    "children": [
                      {
                        "id": 56,
                        "name": "Cmp",
                        "args": {
                          "eq": 1,
                          "cmpType": ">="
                        },
                        "input": [
                          "Stat"
                        ]
                      },
                      {
                        "id": 57,
                        "name": "SetInt",
                        "args": {
                          "num": 2
                        },
                        "output": [
                          "Stat"
                        ]
                      },
                      {
                        "id": 58,
                        "name": "GhostPlayMusic",
                        "args": {
                          "music": "0",
                          "radius": 2000,
                          "keepTime": -1
                        }
                      }
                    ]
                  },
                  {
                    "id": 59,
                    "name": "Sequence",
                    "args": {},
                    "children": [
                      {
                        "id": 60,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "Chasing"
                        },
                        "children": []
                      },
                      {
                        "id": 61,
                        "name": "GhostTargetId",
                        "args": {},
                        "output": [
                          "targetId"
                        ]
                      },
                      {
                        "id": 62,
                        "name": "Selector",
                        "children": [
                          {
                            "id": 63,
                            "name": "Selector",
                            "args": {},
                            "children": [
                              {
                                "id": 64,
                                "name": "Sequence",
                                "children": [
                                  {
                                    "id": 65,
                                    "name": "Not",
                                    "children": [
                                      {
                                        "id": 66,
                                        "name": "GhostCheckTargetSafe",
                                        "args": {},
                                        "input": [
                                          "targetId"
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    "id": 67,
                                    "name": "GhostLockAttackTarget",
                                    "args": {
                                      "checkDis": 100
                                    },
                                    "input": [
                                      "targetId"
                                    ]
                                  }
                                ]
                              },
                              {
                                "id": 68,
                                "name": "Sequence",
                                "children": [
                                  {
                                    "id": 69,
                                    "name": "GhostCheckTarget",
                                    "args": {
                                      "isCheckPos": 0
                                    },
                                    "input": [
                                      "targetId"
                                    ]
                                  },
                                  {
                                    "id": 70,
                                    "name": "GhostClearTarget"
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "id": 71,
                            "name": "GhostChaseTarget",
                            "args": {},
                            "input": [
                              "targetId"
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": 72,
                    "name": "Selector",
                    "desc": "休闲分支",
                    "args": {},
                    "children": [
                      {
                        "id": 73,
                        "name": "Sequence",
                        "args": {},
                        "children": [
                          {
                            "id": 74,
                            "name": "FallBack",
                            "args": {},
                            "children": [
                              {
                                "id": 75,
                                "name": "GhostSightCheckNode",
                                "args": {
                                  "isCheckPos": 0
                                },
                                "output": [
                                  "targetId"
                                ]
                              }
                            ]
                          },
                          {
                            "id": 76,
                            "name": "GhostStartChaseTarget",
                            "args": {},
                            "input": [
                              "targetId"
                            ],
                            "children": []
                          }
                        ]
                      },
                      {
                        "id": 77,
                        "name": "Sequence",
                        "desc": "1",
                        "args": {},
                        "children": [
                          {
                            "id": 78,
                            "name": "Not",
                            "args": {},
                            "children": [
                              {
                                "id": 79,
                                "name": "GhostIsMoving",
                                "args": {}
                              }
                            ]
                          },
                          {
                            "id": 80,
                            "name": "Not",
                            "args": {},
                            "children": [
                              {
                                "id": 81,
                                "name": "GhostCheckStat",
                                "args": {
                                  "stat": "patrolStat"
                                }
                              }
                            ]
                          },
                          {
                            "id": 82,
                            "name": "Selector",
                            "args": {},
                            "children": [
                              {
                                "id": 83,
                                "name": "Sequence",
                                "args": {},
                                "children": [
                                  {
                                    "id": 84,
                                    "name": "GhostCheckStat",
                                    "args": {
                                      "stat": "patrolFinish"
                                    }
                                  },
                                  {
                                    "id": 85,
                                    "name": "RandomPasser",
                                    "args": {
                                      "passRate": 0.1
                                    }
                                  },
                                  {
                                    "id": 86,
                                    "name": "GhostPlayPatrolAni",
                                    "args": {
                                      "keepTime": 4
                                    }
                                  }
                                ]
                              },
                              {
                                "id": 87,
                                "name": "Sequence",
                                "children": [
                                  {
                                    "id": 88,
                                    "name": "RandomPasser",
                                    "args": {
                                      "passRate": 0
                                    }
                                  },
                                  {
                                    "id": 89,
                                    "name": "GhostRandomFindPlayer",
                                    "args": {
                                      "keepTime": 4
                                    }
                                  }
                                ]
                              },
                              {
                                "id": 90,
                                "name": "GhostRandomPartol",
                                "args": {}
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "desc": "跳跳兔"
}
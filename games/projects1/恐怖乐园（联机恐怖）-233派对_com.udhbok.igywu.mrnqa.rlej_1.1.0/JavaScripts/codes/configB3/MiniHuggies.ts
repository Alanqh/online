export const Behavior3_MiniHuggies = {
  "name": "MiniHuggies",
  "root": {
    "id": 1,
    "name": "Selector",
    "desc": "迷你好奇",
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
            "name": "AlwaysFail",
            "children": [
              {
                "id": 8,
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
            "id": 9,
            "name": "Sequence",
            "desc": "buff状态",
            "args": {},
            "children": [
              {
                "id": 10,
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
                "id": 11,
                "name": "AlwaysSuccess",
                "children": [
                  {
                    "id": 12,
                    "name": "Selector",
                    "desc": "新行为树",
                    "args": {},
                    "children": [
                      {
                        "id": 13,
                        "name": "Sequence",
                        "args": {},
                        "children": [
                          {
                            "id": 14,
                            "name": "GhostCheckStat",
                            "args": {
                              "stat": "Chasing"
                            },
                            "children": []
                          },
                          {
                            "id": 15,
                            "name": "GhostTargetId",
                            "args": {},
                            "output": [
                              "targetId"
                            ]
                          },
                          {
                            "id": 16,
                            "name": "Selector",
                            "children": [
                              {
                                "id": 17,
                                "name": "Selector",
                                "args": {},
                                "children": [
                                  {
                                    "id": 18,
                                    "name": "Sequence",
                                    "children": [
                                      {
                                        "id": 19,
                                        "name": "Not",
                                        "children": [
                                          {
                                            "id": 20,
                                            "name": "GhostCheckTargetSafe",
                                            "args": {},
                                            "input": [
                                              "targetId"
                                            ]
                                          }
                                        ]
                                      },
                                      {
                                        "id": 21,
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
                                    "id": 22,
                                    "name": "Sequence",
                                    "children": [
                                      {
                                        "id": 23,
                                        "name": "GhostCheckTarget",
                                        "args": {
                                          "isCheckPos": 0
                                        },
                                        "input": [
                                          "targetId"
                                        ]
                                      },
                                      {
                                        "id": 24,
                                        "name": "GhostClearTarget"
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "id": 25,
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
                        "id": 26,
                        "name": "Selector",
                        "desc": "休闲分支",
                        "args": {},
                        "children": [
                          {
                            "id": 27,
                            "name": "Sequence",
                            "args": {},
                            "children": [
                              {
                                "id": 28,
                                "name": "FallBack",
                                "args": {},
                                "children": [
                                  {
                                    "id": 29,
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
                                "id": 30,
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
                            "id": 31,
                            "name": "Sequence",
                            "desc": "1",
                            "args": {},
                            "children": [
                              {
                                "id": 32,
                                "name": "Not",
                                "args": {},
                                "children": [
                                  {
                                    "id": 33,
                                    "name": "GhostIsMoving",
                                    "args": {}
                                  }
                                ]
                              },
                              {
                                "id": 34,
                                "name": "Not",
                                "args": {},
                                "children": [
                                  {
                                    "id": 35,
                                    "name": "GhostCheckStat",
                                    "args": {
                                      "stat": "patrolStat"
                                    }
                                  }
                                ]
                              },
                              {
                                "id": 36,
                                "name": "Selector",
                                "args": {},
                                "children": [
                                  {
                                    "id": 37,
                                    "name": "Sequence",
                                    "args": {},
                                    "children": [
                                      {
                                        "id": 38,
                                        "name": "GhostCheckStat",
                                        "args": {
                                          "stat": "patrolFinish"
                                        }
                                      },
                                      {
                                        "id": 39,
                                        "name": "RandomPasser",
                                        "args": {
                                          "passRate": 0.1
                                        }
                                      },
                                      {
                                        "id": 40,
                                        "name": "GhostPlayPatrolAni",
                                        "args": {
                                          "keepTime": 4
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "id": 41,
                                    "name": "Sequence",
                                    "children": [
                                      {
                                        "id": 42,
                                        "name": "RandomPasser",
                                        "args": {
                                          "passRate": 0
                                        }
                                      },
                                      {
                                        "id": 43,
                                        "name": "GhostRandomFindPlayer",
                                        "args": {
                                          "keepTime": 4
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "id": 44,
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
            "id": 45,
            "name": "Sequence",
            "desc": "普通状态",
            "args": {},
            "children": [
              {
                "id": 46,
                "name": "Selector",
                "desc": "新行为树1",
                "args": {},
                "children": [
                  {
                    "id": 47,
                    "name": "Sequence",
                    "args": {},
                    "children": [
                      {
                        "id": 48,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "Chasing"
                        },
                        "children": []
                      },
                      {
                        "id": 49,
                        "name": "GhostTargetId",
                        "args": {},
                        "output": [
                          "targetId"
                        ]
                      },
                      {
                        "id": 50,
                        "name": "Selector",
                        "children": [
                          {
                            "id": 51,
                            "name": "Selector",
                            "children": [
                              {
                                "id": 52,
                                "name": "Sequence",
                                "children": [
                                  {
                                    "id": 53,
                                    "name": "Not",
                                    "children": [
                                      {
                                        "id": 54,
                                        "name": "GhostCheckTargetSafe",
                                        "args": {},
                                        "input": [
                                          "targetId"
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    "id": 55,
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
                                "id": 56,
                                "name": "Sequence",
                                "children": [
                                  {
                                    "id": 57,
                                    "name": "GhostCheckTarget",
                                    "args": {},
                                    "input": [
                                      "targetId"
                                    ]
                                  },
                                  {
                                    "id": 58,
                                    "name": "GhostClearTarget"
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "id": 59,
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
                    "id": 60,
                    "name": "Selector",
                    "desc": "休闲分支",
                    "args": {},
                    "children": [
                      {
                        "id": 61,
                        "name": "Sequence",
                        "desc": "1",
                        "args": {},
                        "children": [
                          {
                            "id": 62,
                            "name": "Not",
                            "args": {},
                            "children": [
                              {
                                "id": 63,
                                "name": "GhostIsMoving",
                                "args": {}
                              }
                            ]
                          },
                          {
                            "id": 64,
                            "name": "Not",
                            "args": {},
                            "children": [
                              {
                                "id": 65,
                                "name": "GhostCheckStat",
                                "args": {
                                  "stat": "patrolStat"
                                }
                              }
                            ]
                          },
                          {
                            "id": 66,
                            "name": "Selector",
                            "args": {},
                            "children": [
                              {
                                "id": 67,
                                "name": "Sequence",
                                "args": {},
                                "children": [
                                  {
                                    "id": 68,
                                    "name": "GhostCheckStat",
                                    "args": {
                                      "stat": "patrolFinish"
                                    }
                                  },
                                  {
                                    "id": 69,
                                    "name": "RandomPasser",
                                    "args": {
                                      "passRate": 0.1
                                    }
                                  },
                                  {
                                    "id": 70,
                                    "name": "GhostPlayPatrolAni",
                                    "args": {
                                      "keepTime": 4
                                    }
                                  }
                                ]
                              },
                              {
                                "id": 71,
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
  "desc": "迷你好奇"
}
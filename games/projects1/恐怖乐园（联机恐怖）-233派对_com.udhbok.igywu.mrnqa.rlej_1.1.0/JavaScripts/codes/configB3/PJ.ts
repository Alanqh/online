export const Behavior3_PJ = {
  "name": "PJ",
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
                        "name": "Sequence",
                        "children": [
                          {
                            "id": 27,
                            "name": "Not",
                            "children": [
                              {
                                "id": 28,
                                "name": "CheckTimer",
                                "args": {},
                                "input": [
                                  "followTimer"
                                ]
                              }
                            ]
                          },
                          {
                            "id": 29,
                            "name": "GhostChaseTarget",
                            "args": {
                              "stopDis": 300
                            },
                            "input": [
                              "followId"
                            ]
                          }
                        ]
                      },
                      {
                        "id": 30,
                        "name": "Selector",
                        "desc": "休闲分支",
                        "args": {},
                        "children": [
                          {
                            "id": 31,
                            "name": "Sequence",
                            "args": {},
                            "debug": true,
                            "children": [
                              {
                                "id": 32,
                                "name": "FallBack",
                                "args": {},
                                "debug": true,
                                "children": [
                                  {
                                    "id": 33,
                                    "name": "GhostSightCheckNode",
                                    "args": {
                                      "isCheckPos": 0
                                    },
                                    "output": [
                                      "followId"
                                    ],
                                    "debug": true
                                  }
                                ]
                              },
                              {
                                "id": 34,
                                "name": "SetTimer2",
                                "args": {
                                  "time": 10
                                },
                                "output": [
                                  "followTimer"
                                ]
                              }
                            ]
                          },
                          {
                            "id": 35,
                            "name": "Sequence",
                            "desc": "1",
                            "args": {},
                            "debug": true,
                            "children": [
                              {
                                "id": 36,
                                "name": "Not",
                                "args": {},
                                "children": [
                                  {
                                    "id": 37,
                                    "name": "GhostIsMoving",
                                    "args": {}
                                  }
                                ]
                              },
                              {
                                "id": 38,
                                "name": "Not",
                                "args": {},
                                "children": [
                                  {
                                    "id": 39,
                                    "name": "GhostCheckStat",
                                    "args": {
                                      "stat": "patrolStat"
                                    }
                                  }
                                ]
                              },
                              {
                                "id": 40,
                                "name": "Selector",
                                "args": {},
                                "debug": true,
                                "children": [
                                  {
                                    "id": 41,
                                    "name": "Sequence",
                                    "args": {},
                                    "children": [
                                      {
                                        "id": 42,
                                        "name": "GhostCheckStat",
                                        "args": {
                                          "stat": "patrolFinish"
                                        }
                                      },
                                      {
                                        "id": 43,
                                        "name": "RandomPasser",
                                        "args": {
                                          "passRate": 0.1
                                        }
                                      },
                                      {
                                        "id": 44,
                                        "name": "GhostPlayPatrolAni",
                                        "args": {
                                          "keepTime": 4
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "id": 45,
                                    "name": "Sequence",
                                    "children": [
                                      {
                                        "id": 46,
                                        "name": "RandomPasser",
                                        "args": {
                                          "passRate": 0
                                        }
                                      },
                                      {
                                        "id": 47,
                                        "name": "GhostRandomFindPlayer",
                                        "args": {
                                          "keepTime": 4
                                        },
                                        "debug": true
                                      }
                                    ]
                                  },
                                  {
                                    "id": 48,
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
            "id": 49,
            "name": "Sequence",
            "desc": "普通状态",
            "args": {},
            "children": [
              {
                "id": 50,
                "name": "Selector",
                "desc": "恐惧",
                "args": {},
                "children": [
                  {
                    "id": 51,
                    "name": "Sequence",
                    "desc": "1",
                    "args": {},
                    "children": [
                      {
                        "id": 52,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "Chasing"
                        },
                        "children": []
                      },
                      {
                        "id": 53,
                        "name": "GhostTargetId",
                        "args": {},
                        "output": [
                          "targetId"
                        ]
                      },
                      {
                        "id": 54,
                        "name": "Selector",
                        "children": [
                          {
                            "id": 55,
                            "name": "Sequence",
                            "children": [
                              {
                                "id": 56,
                                "name": "GhostCheckTarget",
                                "args": {},
                                "input": [
                                  "targetId"
                                ]
                              },
                              {
                                "id": 57,
                                "name": "GhostClearTarget"
                              }
                            ]
                          },
                          {
                            "id": 58,
                            "name": "GhostFarTarget",
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
                    "id": 59,
                    "name": "Selector",
                    "desc": "休闲分支",
                    "args": {},
                    "children": [
                      {
                        "id": 60,
                        "name": "Sequence",
                        "args": {},
                        "children": [
                          {
                            "id": 61,
                            "name": "FallBack",
                            "args": {},
                            "children": [
                              {
                                "id": 62,
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
                            "id": 63,
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
                        "id": 64,
                        "name": "Sequence",
                        "desc": "1",
                        "args": {},
                        "children": [
                          {
                            "id": 65,
                            "name": "Not",
                            "args": {},
                            "children": [
                              {
                                "id": 66,
                                "name": "GhostIsMoving",
                                "args": {}
                              }
                            ]
                          },
                          {
                            "id": 67,
                            "name": "Not",
                            "args": {},
                            "children": [
                              {
                                "id": 68,
                                "name": "GhostCheckStat",
                                "args": {
                                  "stat": "patrolStat"
                                }
                              }
                            ]
                          },
                          {
                            "id": 69,
                            "name": "Selector",
                            "args": {},
                            "children": [
                              {
                                "id": 70,
                                "name": "Sequence",
                                "args": {},
                                "children": [
                                  {
                                    "id": 71,
                                    "name": "GhostCheckStat",
                                    "args": {
                                      "stat": "patrolFinish"
                                    }
                                  },
                                  {
                                    "id": 72,
                                    "name": "RandomPasser",
                                    "args": {
                                      "passRate": 0.1
                                    }
                                  },
                                  {
                                    "id": 73,
                                    "name": "GhostPlayPatrolAni",
                                    "args": {
                                      "keepTime": 4
                                    }
                                  }
                                ]
                              },
                              {
                                "id": 74,
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
  "desc": "PJ"
}
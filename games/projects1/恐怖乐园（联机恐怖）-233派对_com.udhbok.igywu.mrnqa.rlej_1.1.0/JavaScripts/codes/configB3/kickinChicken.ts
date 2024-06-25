export const Behavior3_kickinChicken = {
  "name": "kickinChicken",
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
                    "desc": "新行为树1",
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
                                        "args": {},
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
                            "desc": "1",
                            "args": {},
                            "children": [
                              {
                                "id": 28,
                                "name": "Not",
                                "args": {},
                                "children": [
                                  {
                                    "id": 29,
                                    "name": "GhostIsMoving",
                                    "args": {}
                                  }
                                ]
                              },
                              {
                                "id": 30,
                                "name": "Not",
                                "args": {},
                                "children": [
                                  {
                                    "id": 31,
                                    "name": "GhostCheckStat",
                                    "args": {
                                      "stat": "patrolStat"
                                    }
                                  }
                                ]
                              },
                              {
                                "id": 32,
                                "name": "Selector",
                                "args": {},
                                "children": [
                                  {
                                    "id": 33,
                                    "name": "Sequence",
                                    "args": {},
                                    "children": [
                                      {
                                        "id": 34,
                                        "name": "GhostCheckStat",
                                        "args": {
                                          "stat": "patrolFinish"
                                        }
                                      },
                                      {
                                        "id": 35,
                                        "name": "RandomPasser",
                                        "args": {
                                          "passRate": 0.1
                                        }
                                      },
                                      {
                                        "id": 36,
                                        "name": "GhostPlayPatrolAni",
                                        "args": {
                                          "keepTime": 4
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "id": 37,
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
            "id": 38,
            "name": "Sequence",
            "desc": "普通状态",
            "args": {},
            "children": [
              {
                "id": 39,
                "name": "Selector",
                "desc": "恐惧",
                "args": {},
                "children": [
                  {
                    "id": 40,
                    "name": "Sequence",
                    "desc": "1",
                    "args": {},
                    "children": [
                      {
                        "id": 41,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "Chasing"
                        },
                        "children": []
                      },
                      {
                        "id": 42,
                        "name": "GhostTargetId",
                        "args": {},
                        "output": [
                          "targetId"
                        ]
                      },
                      {
                        "id": 43,
                        "name": "Selector",
                        "children": [
                          {
                            "id": 44,
                            "name": "Sequence",
                            "children": [
                              {
                                "id": 45,
                                "name": "GhostCheckTarget",
                                "args": {},
                                "input": [
                                  "targetId"
                                ]
                              },
                              {
                                "id": 46,
                                "name": "GhostClearTarget"
                              }
                            ]
                          },
                          {
                            "id": 47,
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
                    "id": 48,
                    "name": "Selector",
                    "desc": "休闲分支",
                    "args": {},
                    "children": [
                      {
                        "id": 49,
                        "name": "Sequence",
                        "args": {},
                        "children": [
                          {
                            "id": 50,
                            "name": "FallBack",
                            "args": {},
                            "children": [
                              {
                                "id": 51,
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
                            "id": 52,
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
                        "id": 53,
                        "name": "Sequence",
                        "desc": "1",
                        "args": {},
                        "children": [
                          {
                            "id": 54,
                            "name": "Not",
                            "args": {},
                            "children": [
                              {
                                "id": 55,
                                "name": "GhostIsMoving",
                                "args": {}
                              }
                            ]
                          },
                          {
                            "id": 56,
                            "name": "Not",
                            "args": {},
                            "children": [
                              {
                                "id": 57,
                                "name": "GhostCheckStat",
                                "args": {
                                  "stat": "patrolStat"
                                }
                              }
                            ]
                          },
                          {
                            "id": 58,
                            "name": "Selector",
                            "args": {},
                            "children": [
                              {
                                "id": 59,
                                "name": "Sequence",
                                "args": {},
                                "children": [
                                  {
                                    "id": 60,
                                    "name": "GhostCheckStat",
                                    "args": {
                                      "stat": "patrolFinish"
                                    }
                                  },
                                  {
                                    "id": 61,
                                    "name": "RandomPasser",
                                    "args": {
                                      "passRate": 0.1
                                    }
                                  },
                                  {
                                    "id": 62,
                                    "name": "GhostPlayPatrolAni",
                                    "args": {
                                      "keepTime": 4
                                    }
                                  }
                                ]
                              },
                              {
                                "id": 63,
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
  "desc": "胆小鸡"
}
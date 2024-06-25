export const Behavior3_KissyMissy = {
  "name": "KissyMissy",
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
                "debug": false,
                "children": []
              },
              {
                "id": 11,
                "name": "AlwaysSuccess",
                "children": [
                  {
                    "id": 12,
                    "name": "Selector",
                    "desc": "恐惧",
                    "args": {},
                    "children": [
                      {
                        "id": 13,
                        "name": "Sequence",
                        "desc": "1",
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
                                "name": "Sequence",
                                "children": [
                                  {
                                    "id": 18,
                                    "name": "GhostCheckTarget",
                                    "args": {},
                                    "input": [
                                      "targetId"
                                    ]
                                  },
                                  {
                                    "id": 19,
                                    "name": "GhostClearTarget"
                                  }
                                ]
                              },
                              {
                                "id": 20,
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
                        "id": 21,
                        "name": "Selector",
                        "desc": "休闲分支",
                        "args": {},
                        "children": [
                          {
                            "id": 22,
                            "name": "Sequence",
                            "args": {},
                            "children": [
                              {
                                "id": 23,
                                "name": "FallBack",
                                "args": {},
                                "children": [
                                  {
                                    "id": 24,
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
                                "id": 25,
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
                            "id": 26,
                            "name": "Sequence",
                            "desc": "1",
                            "args": {},
                            "children": [
                              {
                                "id": 27,
                                "name": "Not",
                                "args": {},
                                "children": [
                                  {
                                    "id": 28,
                                    "name": "GhostIsMoving",
                                    "args": {}
                                  }
                                ]
                              },
                              {
                                "id": 29,
                                "name": "Not",
                                "args": {},
                                "children": [
                                  {
                                    "id": 30,
                                    "name": "GhostCheckStat",
                                    "args": {
                                      "stat": "patrolStat"
                                    }
                                  }
                                ]
                              },
                              {
                                "id": 31,
                                "name": "Selector",
                                "args": {},
                                "children": [
                                  {
                                    "id": 32,
                                    "name": "Sequence",
                                    "args": {},
                                    "children": [
                                      {
                                        "id": 33,
                                        "name": "GhostCheckStat",
                                        "args": {
                                          "stat": "patrolFinish"
                                        }
                                      },
                                      {
                                        "id": 34,
                                        "name": "RandomPasser",
                                        "args": {
                                          "passRate": 0.1
                                        }
                                      },
                                      {
                                        "id": 35,
                                        "name": "GhostPlayPatrolAni",
                                        "args": {
                                          "keepTime": 4
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "id": 36,
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
            "id": 37,
            "name": "Sequence",
            "desc": "普通状态",
            "args": {},
            "children": [
              {
                "id": 38,
                "name": "Selector",
                "desc": "友善",
                "args": {},
                "children": [
                  {
                    "id": 39,
                    "name": "Sequence",
                    "desc": "1",
                    "args": {},
                    "children": [
                      {
                        "id": 40,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "Chasing"
                        },
                        "children": []
                      },
                      {
                        "id": 41,
                        "name": "GhostTargetId",
                        "args": {},
                        "output": [
                          "targetId"
                        ]
                      },
                      {
                        "id": 42,
                        "name": "Selector",
                        "args": {},
                        "children": [
                          {
                            "id": 43,
                            "name": "Not",
                            "children": [
                              {
                                "id": 44,
                                "name": "CheckTimer",
                                "args": {},
                                "input": [
                                  "endTime"
                                ]
                              }
                            ]
                          },
                          {
                            "id": 45,
                            "name": "Sequence",
                            "children": [
                              {
                                "id": 46,
                                "name": "GhostCheckTarget",
                                "args": {},
                                "input": [
                                  "targetId"
                                ]
                              },
                              {
                                "id": 47,
                                "name": "GhostClearTarget"
                              }
                            ]
                          },
                          {
                            "id": 48,
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
                    "id": 49,
                    "name": "Selector",
                    "desc": "休闲分支",
                    "args": {},
                    "children": [
                      {
                        "id": 50,
                        "name": "Sequence",
                        "args": {},
                        "children": [
                          {
                            "id": 51,
                            "name": "FallBack",
                            "args": {},
                            "children": [
                              {
                                "id": 52,
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
                            "id": 53,
                            "name": "GhostStartChaseTarget",
                            "args": {},
                            "input": [
                              "targetId"
                            ],
                            "children": []
                          },
                          {
                            "id": 54,
                            "name": "SetTimer2",
                            "args": {
                              "time": 5
                            },
                            "output": [
                              "endTime"
                            ]
                          },
                          {
                            "id": 55,
                            "name": "GhostStopMove"
                          },
                          {
                            "id": 56,
                            "name": "GhostPlayAni",
                            "args": {
                              "ani": "danceAni",
                              "isLoop": 0
                            }
                          }
                        ]
                      },
                      {
                        "id": 57,
                        "name": "Sequence",
                        "desc": "1",
                        "args": {},
                        "children": [
                          {
                            "id": 58,
                            "name": "Not",
                            "args": {},
                            "children": [
                              {
                                "id": 59,
                                "name": "GhostIsMoving",
                                "args": {}
                              }
                            ]
                          },
                          {
                            "id": 60,
                            "name": "Not",
                            "args": {},
                            "children": [
                              {
                                "id": 61,
                                "name": "GhostCheckStat",
                                "args": {
                                  "stat": "patrolStat"
                                }
                              }
                            ]
                          },
                          {
                            "id": 62,
                            "name": "Selector",
                            "args": {},
                            "children": [
                              {
                                "id": 63,
                                "name": "Sequence",
                                "args": {},
                                "children": [
                                  {
                                    "id": 64,
                                    "name": "GhostCheckStat",
                                    "args": {
                                      "stat": "patrolFinish"
                                    }
                                  },
                                  {
                                    "id": 65,
                                    "name": "RandomPasser",
                                    "args": {
                                      "passRate": 0.1
                                    }
                                  },
                                  {
                                    "id": 66,
                                    "name": "GhostPlayPatrolAni",
                                    "args": {
                                      "keepTime": 4
                                    }
                                  }
                                ]
                              },
                              {
                                "id": 67,
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
  "desc": "亲吻凯西"
}
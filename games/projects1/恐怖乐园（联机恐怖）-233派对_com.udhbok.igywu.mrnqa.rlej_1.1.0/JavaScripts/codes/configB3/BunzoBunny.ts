export const Behavior3_BunzoBunny = {
  "name": "BunzoBunny",
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
                    "name": "Sequence",
                    "children": [
                      {
                        "id": 16,
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
                        "id": 17,
                        "name": "GhostStopMove"
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
                          "music": "0",
                          "radius": 500,
                          "keepTime": -1
                        }
                      },
                      {
                        "id": 20,
                        "name": "GhostClearTarget"
                      },
                      {
                        "id": 21,
                        "name": "GhostPlayAni",
                        "args": {
                          "ani": "danceAni",
                          "isLoop": 1
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": 22,
            "name": "Sequence",
            "desc": "普通状态",
            "args": {},
            "children": [
              {
                "id": 23,
                "name": "AlwaysSuccess",
                "children": [
                  {
                    "id": 24,
                    "name": "Sequence",
                    "children": [
                      {
                        "id": 25,
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
                        "id": 26,
                        "name": "GhostStopAni"
                      },
                      {
                        "id": 27,
                        "name": "SetInt",
                        "args": {
                          "num": 2
                        },
                        "output": [
                          "Stat"
                        ]
                      },
                      {
                        "id": 28,
                        "name": "GhostClearTarget"
                      },
                      {
                        "id": 29,
                        "name": "GhostPlayMusic",
                        "args": {
                          "music": "234422",
                          "radius": 500,
                          "keepTime": -1
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "id": 30,
                "name": "Selector",
                "desc": "新行为树1",
                "args": {},
                "children": [
                  {
                    "id": 31,
                    "name": "Sequence",
                    "args": {},
                    "children": [
                      {
                        "id": 32,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "Chasing"
                        },
                        "children": []
                      },
                      {
                        "id": 33,
                        "name": "GhostTargetId",
                        "args": {},
                        "output": [
                          "targetId"
                        ]
                      },
                      {
                        "id": 34,
                        "name": "Selector",
                        "children": [
                          {
                            "id": 35,
                            "name": "Sequence",
                            "children": [
                              {
                                "id": 36,
                                "name": "GhostCheckTarget",
                                "args": {},
                                "input": [
                                  "targetId"
                                ]
                              },
                              {
                                "id": 37,
                                "name": "GhostClearTarget"
                              }
                            ]
                          },
                          {
                            "id": 38,
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
                    "id": 39,
                    "name": "Selector",
                    "desc": "休闲分支",
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
                            "name": "Not",
                            "args": {},
                            "children": [
                              {
                                "id": 42,
                                "name": "GhostIsMoving",
                                "args": {}
                              }
                            ]
                          },
                          {
                            "id": 43,
                            "name": "Not",
                            "args": {},
                            "children": [
                              {
                                "id": 44,
                                "name": "GhostCheckStat",
                                "args": {
                                  "stat": "patrolStat"
                                }
                              }
                            ]
                          },
                          {
                            "id": 45,
                            "name": "Selector",
                            "args": {},
                            "children": [
                              {
                                "id": 46,
                                "name": "Sequence",
                                "args": {},
                                "children": [
                                  {
                                    "id": 47,
                                    "name": "GhostCheckStat",
                                    "args": {
                                      "stat": "patrolFinish"
                                    }
                                  },
                                  {
                                    "id": 48,
                                    "name": "RandomPasser",
                                    "args": {
                                      "passRate": 0.1
                                    }
                                  },
                                  {
                                    "id": 49,
                                    "name": "GhostPlayPatrolAni",
                                    "args": {
                                      "keepTime": 4
                                    }
                                  }
                                ]
                              },
                              {
                                "id": 50,
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
  "desc": "邦作兔"
}
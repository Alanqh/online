export const Behavior3_wolf = {
  "name": "wolf",
  "root": {
    "id": 1,
    "name": "Selector",
    "desc": "新行为树",
    "args": {},
    "children": [
      {
        "id": 2,
        "name": "Sequence",
        "children": [
          {
            "id": 3,
            "name": "GhostCheckStat",
            "args": {
              "stat": "PlayMelee"
            }
          }
        ]
      },
      {
        "id": 4,
        "name": "Sequence",
        "args": {},
        "children": [
          {
            "id": 5,
            "name": "GhostCheckStat",
            "args": {
              "stat": "Chasing"
            },
            "children": []
          },
          {
            "id": 6,
            "name": "GhostTargetId",
            "args": {},
            "output": [
              "targetId"
            ]
          },
          {
            "id": 7,
            "name": "Selector",
            "children": [
              {
                "id": 8,
                "name": "Sequence",
                "desc": "观察模式",
                "args": {},
                "children": [
                  {
                    "id": 9,
                    "name": "Not",
                    "children": [
                      {
                        "id": 10,
                        "name": "CheckTimer",
                        "args": {},
                        "input": [
                          "watchTime"
                        ]
                      }
                    ]
                  },
                  {
                    "id": 11,
                    "name": "Selector",
                    "children": [
                      {
                        "id": 12,
                        "name": "Sequence",
                        "children": [
                          {
                            "id": 13,
                            "name": "GhostCheckStat",
                            "args": {
                              "stat": "onHit"
                            },
                            "children": []
                          },
                          {
                            "id": 14,
                            "name": "GhostSetStat",
                            "args": {
                              "stat": "onHit",
                              "val": 0
                            }
                          },
                          {
                            "id": 15,
                            "name": "SetInt",
                            "args": {
                              "num": 0
                            },
                            "output": [
                              "watchTime"
                            ]
                          },
                          {
                            "id": 16,
                            "name": "GhostChangeChaseSpd",
                            "args": {
                              "spdRate": 1
                            }
                          }
                        ]
                      },
                      {
                        "id": 17,
                        "name": "Sequence",
                        "children": [
                          {
                            "id": 18,
                            "name": "GhostCircleTarget",
                            "args": {
                              "radius": 300
                            },
                            "input": [
                              "targetId"
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "id": 19,
                "name": "Sequence",
                "children": [
                  {
                    "id": 20,
                    "name": "GhostCheckTarget",
                    "args": {
                      "isCheckPos": 0
                    },
                    "input": [
                      "targetId"
                    ]
                  },
                  {
                    "id": 21,
                    "name": "GhostClearTarget"
                  }
                ]
              },
              {
                "id": 22,
                "name": "Sequence",
                "children": [
                  {
                    "id": 23,
                    "name": "GhostCheckAttackNode",
                    "args": {},
                    "input": [
                      "targetId"
                    ],
                    "output": [
                      "validSkill"
                    ]
                  },
                  {
                    "id": 24,
                    "name": "GhostAttackTarget",
                    "args": {},
                    "input": [
                      "validSkill",
                      "targetId"
                    ]
                  },
                  {
                    "id": 25,
                    "name": "SetTimer2",
                    "args": {
                      "time": 10
                    },
                    "output": [
                      "watchTime"
                    ]
                  },
                  {
                    "id": 26,
                    "name": "GhostChangeChaseSpd",
                    "args": {
                      "spdRate": 0.8
                    }
                  },
                  {
                    "id": 27,
                    "name": "GhostSetStat",
                    "args": {
                      "stat": "onHit",
                      "val": 0
                    }
                  }
                ]
              },
              {
                "id": 28,
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
        "id": 29,
        "name": "Selector",
        "desc": "休闲分支",
        "args": {},
        "children": [
          {
            "id": 30,
            "name": "Sequence",
            "args": {},
            "children": [
              {
                "id": 31,
                "name": "FallBack",
                "args": {},
                "children": [
                  {
                    "id": 32,
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
                "id": 33,
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
            "id": 34,
            "name": "Sequence",
            "desc": "1",
            "args": {},
            "children": [
              {
                "id": 35,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 36,
                    "name": "GhostIsMoving",
                    "args": {}
                  }
                ]
              },
              {
                "id": 37,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 38,
                    "name": "GhostCheckStat",
                    "args": {
                      "stat": "patrolStat"
                    }
                  }
                ]
              },
              {
                "id": 39,
                "name": "Selector",
                "args": {},
                "children": [
                  {
                    "id": 40,
                    "name": "Sequence",
                    "args": {},
                    "children": [
                      {
                        "id": 41,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "patrolFinish"
                        }
                      },
                      {
                        "id": 42,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0.1
                        }
                      },
                      {
                        "id": 43,
                        "name": "GhostPlayPatrolAni",
                        "args": {
                          "keepTime": 4
                        }
                      },
                      {
                        "id": 44,
                        "name": "GhostPlayMusic",
                        "args": {
                          "music": "162715",
                          "radius": 2000,
                          "keepTime": 3
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
                        }
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
  },
  "desc": "狼"
}
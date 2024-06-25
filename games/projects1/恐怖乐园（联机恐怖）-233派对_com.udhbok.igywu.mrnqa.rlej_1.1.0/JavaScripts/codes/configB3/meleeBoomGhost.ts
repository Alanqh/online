export const Behavior3_meleeBoomGhost = {
  "name": "meleeBoomGhost",
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
                "children": [
                  {
                    "id": 9,
                    "name": "Selector",
                    "children": [
                      {
                        "id": 10,
                        "name": "Sequence",
                        "children": [
                          {
                            "id": 11,
                            "name": "CheckGhostHp",
                            "args": {},
                            "output": [
                              "curHp"
                            ]
                          },
                          {
                            "id": 12,
                            "name": "Cmp",
                            "args": {
                              "eq": 30,
                              "cmpType": ">"
                            },
                            "input": [
                              "curHp"
                            ]
                          }
                        ]
                      },
                      {
                        "id": 13,
                        "name": "Sequence",
                        "children": [
                          {
                            "id": 14,
                            "name": "CheckTimer",
                            "args": {},
                            "input": [
                              "endTimer"
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": 15,
                    "name": "GetSkill",
                    "args": {},
                    "output": [
                      "validSkill"
                    ]
                  },
                  {
                    "id": 16,
                    "name": "GhostAttackTarget",
                    "args": {},
                    "input": [
                      "validSkill",
                      "null"
                    ]
                  }
                ]
              },
              {
                "id": 17,
                "name": "Sequence",
                "children": [
                  {
                    "id": 18,
                    "name": "GhostCheckTarget",
                    "args": {
                      "isCheckPos": 0
                    },
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
                "name": "Sequence",
                "children": [
                  {
                    "id": 21,
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
                    "id": 22,
                    "name": "GhostAttackTarget",
                    "args": {},
                    "input": [
                      "validSkill",
                      "targetId"
                    ]
                  }
                ]
              },
              {
                "id": 23,
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
        "id": 24,
        "name": "Selector",
        "desc": "休闲分支",
        "args": {},
        "children": [
          {
            "id": 25,
            "name": "Sequence",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 26,
                "name": "FallBack",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 27,
                    "name": "GhostSightCheckNode",
                    "args": {
                      "isCheckPos": 0
                    },
                    "output": [
                      "targetId"
                    ],
                    "debug": true
                  }
                ]
              },
              {
                "id": 28,
                "name": "GhostStartChaseTarget",
                "args": {},
                "input": [
                  "targetId"
                ],
                "debug": true,
                "children": []
              },
              {
                "id": 29,
                "name": "SetTimer",
                "args": {
                  "time": "fval"
                },
                "output": [
                  "endTimer"
                ]
              }
            ]
          },
          {
            "id": 30,
            "name": "Sequence",
            "desc": "1",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 31,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 32,
                    "name": "GhostIsMoving",
                    "args": {}
                  }
                ]
              },
              {
                "id": 33,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 34,
                    "name": "GhostCheckStat",
                    "args": {
                      "stat": "patrolStat"
                    }
                  }
                ]
              },
              {
                "id": 35,
                "name": "Selector",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 36,
                    "name": "Sequence",
                    "args": {},
                    "children": [
                      {
                        "id": 37,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "patrolFinish"
                        }
                      },
                      {
                        "id": 38,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0.1
                        }
                      },
                      {
                        "id": 39,
                        "name": "GhostPlayPatrolAni",
                        "args": {
                          "keepTime": 4
                        }
                      }
                    ]
                  },
                  {
                    "id": 40,
                    "name": "Sequence",
                    "children": [
                      {
                        "id": 41,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0
                        }
                      },
                      {
                        "id": 42,
                        "name": "GhostRandomFindPlayer",
                        "args": {
                          "keepTime": 4
                        },
                        "debug": true
                      }
                    ]
                  },
                  {
                    "id": 43,
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
  "desc": "爆炸鬼"
}
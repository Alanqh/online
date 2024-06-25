export const Behavior3_ghostBoss2 = {
  "name": "ghostBoss2",
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
            "name": "CheckGhostHpPercent",
            "args": {},
            "output": [
              "curHp"
            ]
          },
          {
            "id": 8,
            "name": "Selector",
            "children": [
              {
                "id": 9,
                "name": "AlwaysFail",
                "children": [
                  {
                    "id": 10,
                    "name": "Selector",
                    "desc": "根据血量决定技能轴",
                    "args": {},
                    "children": [
                      {
                        "id": 11,
                        "name": "Sequence",
                        "desc": "70%以上",
                        "args": {},
                        "children": [
                          {
                            "id": 12,
                            "name": "Cmp",
                            "args": {
                              "eq": 0.7,
                              "cmpType": "<"
                            },
                            "input": [
                              "curHp"
                            ]
                          },
                          {
                            "id": 13,
                            "name": "GhostSkillSequnce",
                            "args": {
                              "param": "25|6||24|6"
                            },
                            "output": [
                              "skillid"
                            ]
                          }
                        ]
                      },
                      {
                        "id": 14,
                        "name": "Sequence",
                        "desc": "20%以上",
                        "args": {},
                        "children": [
                          {
                            "id": 15,
                            "name": "Cmp",
                            "args": {
                              "eq": 0.2,
                              "cmpType": "<"
                            },
                            "input": [
                              "curHp"
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
                                    "name": "Cmp",
                                    "args": {
                                      "eq": 1,
                                      "cmpType": "not"
                                    },
                                    "input": [
                                      "stage"
                                    ]
                                  },
                                  {
                                    "id": 19,
                                    "name": "SetInt",
                                    "args": {
                                      "num": 1
                                    },
                                    "output": [
                                      "stage"
                                    ]
                                  },
                                  {
                                    "id": 20,
                                    "name": "SetInt",
                                    "args": {
                                      "num": 22
                                    },
                                    "output": [
                                      "skillid"
                                    ]
                                  }
                                ]
                              },
                              {
                                "id": 21,
                                "name": "GhostSkillSequnce",
                                "args": {
                                  "param": "23|6||25|6||24|6||25|6"
                                },
                                "output": [
                                  "skillid"
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": 22,
                        "name": "Sequence",
                        "desc": "0%以上",
                        "args": {},
                        "children": [
                          {
                            "id": 23,
                            "name": "Selector",
                            "children": [
                              {
                                "id": 24,
                                "name": "Sequence",
                                "children": [
                                  {
                                    "id": 25,
                                    "name": "Cmp",
                                    "args": {
                                      "eq": 2,
                                      "cmpType": "not"
                                    },
                                    "input": [
                                      "stage"
                                    ]
                                  },
                                  {
                                    "id": 26,
                                    "name": "SetInt",
                                    "args": {
                                      "num": 2
                                    },
                                    "output": [
                                      "stage"
                                    ]
                                  },
                                  {
                                    "id": 27,
                                    "name": "SetInt",
                                    "args": {
                                      "num": 26
                                    },
                                    "output": [
                                      "skillid"
                                    ]
                                  }
                                ]
                              },
                              {
                                "id": 28,
                                "name": "GhostSkillSequnce",
                                "args": {
                                  "param": "23|6||25|6||24|6||25|6"
                                },
                                "output": [
                                  "skillid"
                                ],
                                "children": []
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
                "id": 29,
                "name": "Sequence",
                "children": [
                  {
                    "id": 30,
                    "name": "GhostCheckSkill",
                    "args": {
                      "cd": 1,
                      "dis": 1
                    },
                    "input": [
                      "targetId",
                      "skillid"
                    ]
                  },
                  {
                    "id": 31,
                    "name": "GhostAttackTarget",
                    "args": {},
                    "input": [
                      "skillid",
                      "targetId"
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
  },
  "desc": "Boss鬼2"
}
export const Behavior3_MommyLongLegs = {
  "name": "MommyLongLegs",
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
            "name": "GhostInit"
          },
          {
            "id": 4,
            "name": "GetCurGameTheme",
            "args": {
              "themes": "2|3"
            }
          },
          {
            "id": 5,
            "name": "GhostChangeSpd",
            "args": {
              "spdRate": 0.6
            }
          }
        ]
      },
      {
        "id": 6,
        "name": "Sequence",
        "children": [
          {
            "id": 7,
            "name": "GhostInit"
          },
          {
            "id": 8,
            "name": "SetInt",
            "args": {
              "num": 1
            },
            "output": [
              "Die"
            ]
          },
          {
            "id": 9,
            "name": "GhostPlayMusic",
            "args": {
              "music": "200525",
              "radius": 700,
              "keepTime": -1
            }
          }
        ]
      },
      {
        "id": 10,
        "name": "Sequence",
        "desc": "死亡播放动画",
        "args": {},
        "children": [
          {
            "id": 11,
            "name": "Cmp",
            "args": {
              "eq": 1,
              "cmpType": "="
            },
            "input": [
              "Die"
            ]
          },
          {
            "id": 12,
            "name": "CheckGhostHp",
            "args": {},
            "output": [
              "curHp"
            ]
          },
          {
            "id": 13,
            "name": "Cmp",
            "args": {
              "eq": 1,
              "cmpType": ">="
            },
            "input": [
              "curHp"
            ]
          },
          {
            "id": 14,
            "name": "GhostClearTarget"
          },
          {
            "id": 15,
            "name": "GhostPlayAni",
            "args": {
              "ani": "danceAni",
              "isLoop": 0
            }
          },
          {
            "id": 16,
            "name": "SetTimer2",
            "args": {
              "time": 2
            },
            "output": [
              "endTimer"
            ]
          },
          {
            "id": 17,
            "name": "SetInt",
            "args": {
              "num": 2
            },
            "output": [
              "Die"
            ]
          }
        ]
      },
      {
        "id": 18,
        "name": "Sequence",
        "desc": "动画播放完就死",
        "args": {},
        "children": [
          {
            "id": 19,
            "name": "Cmp",
            "args": {
              "eq": 2,
              "cmpType": "="
            },
            "input": [
              "Die"
            ]
          },
          {
            "id": 20,
            "name": "CheckTimer",
            "args": {},
            "input": [
              "endTimer"
            ]
          },
          {
            "id": 21,
            "name": "SetTimer2",
            "args": {
              "time": 10
            },
            "output": [
              "relifeTimer"
            ]
          },
          {
            "id": 22,
            "name": "SetInt",
            "args": {
              "num": 3
            },
            "output": [
              "Die"
            ]
          },
          {
            "id": 23,
            "name": "GhostSetiVisiable",
            "args": {
              "isShow": 0
            }
          }
        ]
      },
      {
        "id": 24,
        "name": "Sequence",
        "desc": "如果复活了就复活",
        "args": {},
        "children": [
          {
            "id": 25,
            "name": "Cmp",
            "args": {
              "eq": 3,
              "cmpType": "="
            },
            "input": [
              "Die"
            ]
          },
          {
            "id": 26,
            "name": "AlwaysSuccess",
            "children": [
              {
                "id": 27,
                "name": "Sequence",
                "children": [
                  {
                    "id": 28,
                    "name": "CheckTimer",
                    "args": {},
                    "input": [
                      "relifeTimer"
                    ]
                  },
                  {
                    "id": 29,
                    "name": "GhostGetFarPos",
                    "args": {},
                    "output": [
                      "farPos"
                    ]
                  },
                  {
                    "id": 30,
                    "name": "GhostSetPos",
                    "args": {},
                    "input": [
                      "farPos"
                    ]
                  },
                  {
                    "id": 31,
                    "name": "GhostStopAni"
                  },
                  {
                    "id": 32,
                    "name": "SetGhostHp",
                    "args": {
                      "hp": 2
                    }
                  },
                  {
                    "id": 33,
                    "name": "SetInt",
                    "args": {
                      "num": 1
                    },
                    "output": [
                      "Die"
                    ]
                  },
                  {
                    "id": 34,
                    "name": "GhostSetiVisiable",
                    "args": {
                      "isShow": 1
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": 35,
        "name": "Sequence",
        "children": [
          {
            "id": 36,
            "name": "Not",
            "children": [
              {
                "id": 37,
                "name": "Cmp",
                "args": {
                  "eq": 1,
                  "cmpType": "="
                },
                "input": [
                  "Die"
                ]
              }
            ]
          }
        ]
      },
      {
        "id": 38,
        "name": "Sequence",
        "desc": "攻击",
        "args": {},
        "children": [
          {
            "id": 39,
            "name": "GhostCheckStat",
            "args": {
              "stat": "Chasing"
            },
            "children": []
          },
          {
            "id": 40,
            "name": "GhostTargetId",
            "args": {},
            "output": [
              "targetId"
            ]
          },
          {
            "id": 41,
            "name": "Selector",
            "children": [
              {
                "id": 42,
                "name": "Selector",
                "children": [
                  {
                    "id": 43,
                    "name": "Selector",
                    "args": {},
                    "children": [
                      {
                        "id": 44,
                        "name": "Sequence",
                        "children": [
                          {
                            "id": 45,
                            "name": "Not",
                            "children": [
                              {
                                "id": 46,
                                "name": "GhostCheckTargetSafe",
                                "args": {},
                                "input": [
                                  "targetId"
                                ]
                              }
                            ]
                          },
                          {
                            "id": 47,
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
                        "id": 48,
                        "name": "Sequence",
                        "children": [
                          {
                            "id": 49,
                            "name": "GhostCheckTarget",
                            "args": {
                              "isCheckPos": 0
                            },
                            "input": [
                              "targetId"
                            ]
                          },
                          {
                            "id": 50,
                            "name": "GhostClearTarget"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": 51,
                    "name": "GhostChaseTarget",
                    "args": {},
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
        "id": 52,
        "name": "Selector",
        "desc": "休闲分支",
        "args": {},
        "children": [
          {
            "id": 53,
            "name": "Sequence",
            "args": {},
            "children": [
              {
                "id": 54,
                "name": "FallBack",
                "args": {},
                "children": [
                  {
                    "id": 55,
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
                "id": 56,
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
  },
  "desc": "长腿妈妈"
}
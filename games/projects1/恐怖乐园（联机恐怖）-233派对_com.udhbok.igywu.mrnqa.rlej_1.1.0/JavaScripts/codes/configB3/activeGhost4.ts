export const Behavior3_activeGhost4 = {
  "name": "activeGhost4",
  "root": {
    "id": 1,
    "name": "Selector",
    "desc": "进攻版本",
    "args": {},
    "children": [
      {
        "id": 2,
        "name": "Sequence",
        "args": {},
        "children": [
          {
            "id": 3,
            "name": "GhostCheckStat",
            "args": {
              "stat": "Chasing"
            },
            "children": []
          },
          {
            "id": 4,
            "name": "GhostTargetId",
            "args": {},
            "output": [
              "targetId"
            ]
          },
          {
            "id": 5,
            "name": "Selector",
            "children": [
              {
                "id": 6,
                "name": "Selector",
                "args": {},
                "children": [
                  {
                    "id": 7,
                    "name": "Sequence",
                    "children": [
                      {
                        "id": 8,
                        "name": "Not",
                        "children": [
                          {
                            "id": 9,
                            "name": "GhostCheckTargetSafe",
                            "args": {},
                            "input": [
                              "targetId"
                            ]
                          }
                        ]
                      },
                      {
                        "id": 10,
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
                    "id": 11,
                    "name": "Sequence",
                    "children": [
                      {
                        "id": 12,
                        "name": "GhostCheckTarget",
                        "args": {
                          "isCheckPos": 0
                        },
                        "input": [
                          "targetId"
                        ]
                      },
                      {
                        "id": 13,
                        "name": "GhostClearTarget"
                      }
                    ]
                  }
                ]
              },
              {
                "id": 14,
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
        "id": 15,
        "name": "Selector",
        "desc": "休闲分支",
        "args": {},
        "children": [
          {
            "id": 16,
            "name": "Sequence",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 17,
                "name": "FallBack",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 18,
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
                "id": 19,
                "name": "GhostStartChaseTarget",
                "args": {},
                "input": [
                  "targetId"
                ],
                "debug": true,
                "children": []
              }
            ]
          },
          {
            "id": 20,
            "name": "Sequence",
            "desc": "1",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 21,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 22,
                    "name": "GhostIsMoving",
                    "args": {}
                  }
                ]
              },
              {
                "id": 23,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 24,
                    "name": "GhostCheckStat",
                    "args": {
                      "stat": "patrolStat"
                    }
                  }
                ]
              },
              {
                "id": 25,
                "name": "Selector",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 26,
                    "name": "Sequence",
                    "args": {},
                    "children": [
                      {
                        "id": 27,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "patrolFinish"
                        }
                      },
                      {
                        "id": 28,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0.1
                        }
                      },
                      {
                        "id": 29,
                        "name": "GhostPlayPatrolAni",
                        "args": {
                          "keepTime": 4
                        }
                      }
                    ]
                  },
                  {
                    "id": 30,
                    "name": "Sequence",
                    "children": [
                      {
                        "id": 31,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0
                        }
                      },
                      {
                        "id": 32,
                        "name": "GhostRandomFindPlayer",
                        "args": {
                          "keepTime": 4
                        },
                        "debug": true
                      }
                    ]
                  },
                  {
                    "id": 33,
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
  "desc": "进攻版本"
}
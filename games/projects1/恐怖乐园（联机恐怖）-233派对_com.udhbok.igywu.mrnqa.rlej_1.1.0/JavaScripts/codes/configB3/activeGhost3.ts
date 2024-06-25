export const Behavior3_activeGhost3 = {
  "name": "activeGhost3",
  "root": {
    "id": 1,
    "name": "Selector",
    "desc": "新行为树1",
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
                        "args": {},
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
            "desc": "1",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 17,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 18,
                    "name": "GhostIsMoving",
                    "args": {}
                  }
                ]
              },
              {
                "id": 19,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 20,
                    "name": "GhostCheckStat",
                    "args": {
                      "stat": "patrolStat"
                    }
                  }
                ]
              },
              {
                "id": 21,
                "name": "Selector",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 22,
                    "name": "Sequence",
                    "args": {},
                    "children": [
                      {
                        "id": 23,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "patrolFinish"
                        }
                      },
                      {
                        "id": 24,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0.1
                        }
                      },
                      {
                        "id": 25,
                        "name": "GhostPlayPatrolAni",
                        "args": {
                          "keepTime": 4
                        }
                      }
                    ]
                  },
                  {
                    "id": 26,
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
  "desc": "挨打E人"
}
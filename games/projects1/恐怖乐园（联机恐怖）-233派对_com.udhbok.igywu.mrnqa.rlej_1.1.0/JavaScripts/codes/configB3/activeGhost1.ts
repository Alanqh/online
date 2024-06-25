export const Behavior3_activeGhost1 = {
  "name": "activeGhost1",
  "root": {
    "id": 1,
    "name": "Selector",
    "desc": "新行为树",
    "args": {},
    "children": [
      {
        "id": 2,
        "name": "Sequence",
        "desc": "1",
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
                "name": "Not",
                "children": [
                  {
                    "id": 7,
                    "name": "CheckTimer",
                    "args": {},
                    "input": [
                      "endTime"
                    ]
                  }
                ]
              },
              {
                "id": 8,
                "name": "Sequence",
                "children": [
                  {
                    "id": 9,
                    "name": "GhostCheckTarget",
                    "args": {},
                    "input": [
                      "targetId"
                    ]
                  },
                  {
                    "id": 10,
                    "name": "GhostClearTarget"
                  }
                ]
              },
              {
                "id": 11,
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
        "id": 12,
        "name": "Selector",
        "desc": "休闲分支",
        "args": {},
        "children": [
          {
            "id": 13,
            "name": "Sequence",
            "args": {},
            "children": [
              {
                "id": 14,
                "name": "FallBack",
                "args": {},
                "children": [
                  {
                    "id": 15,
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
                "id": 16,
                "name": "GhostStartChaseTarget",
                "args": {},
                "input": [
                  "targetId"
                ],
                "children": []
              },
              {
                "id": 17,
                "name": "SetTimer2",
                "args": {
                  "time": 10
                },
                "output": [
                  "endTime"
                ]
              },
              {
                "id": 18,
                "name": "GhostPlayAni",
                "args": {
                  "ani": "watchAni"
                }
              }
            ]
          },
          {
            "id": 19,
            "name": "Sequence",
            "desc": "1",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 20,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 21,
                    "name": "GhostIsMoving",
                    "args": {}
                  }
                ]
              },
              {
                "id": 22,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 23,
                    "name": "GhostCheckStat",
                    "args": {
                      "stat": "patrolStat"
                    }
                  }
                ]
              },
              {
                "id": 24,
                "name": "Selector",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 25,
                    "name": "Sequence",
                    "args": {},
                    "children": [
                      {
                        "id": 26,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "patrolFinish"
                        }
                      },
                      {
                        "id": 27,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0.1
                        }
                      },
                      {
                        "id": 28,
                        "name": "GhostPlayPatrolAni",
                        "args": {
                          "keepTime": 4
                        }
                      }
                    ]
                  },
                  {
                    "id": 29,
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
  "desc": "友善胆小鬼"
}
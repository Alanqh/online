export const Behavior3_pig = {
  "name": "pig",
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
                "name": "Sequence",
                "children": [
                  {
                    "id": 7,
                    "name": "GhostCheckTarget",
                    "args": {},
                    "input": [
                      "targetId"
                    ]
                  },
                  {
                    "id": 8,
                    "name": "GhostClearTarget"
                  }
                ]
              },
              {
                "id": 9,
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
        "id": 10,
        "name": "Selector",
        "desc": "休闲分支",
        "args": {},
        "children": [
          {
            "id": 11,
            "name": "Sequence",
            "desc": "1",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 12,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 13,
                    "name": "GhostIsMoving",
                    "args": {}
                  }
                ]
              },
              {
                "id": 14,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 15,
                    "name": "GhostCheckStat",
                    "args": {
                      "stat": "patrolStat"
                    }
                  }
                ]
              },
              {
                "id": 16,
                "name": "Selector",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 17,
                    "name": "Sequence",
                    "args": {},
                    "children": [
                      {
                        "id": 18,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "patrolFinish"
                        }
                      },
                      {
                        "id": 19,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0.1
                        }
                      },
                      {
                        "id": 20,
                        "name": "GhostPlayPatrolAni",
                        "args": {
                          "keepTime": 4
                        }
                      },
                      {
                        "id": 21,
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
                    "id": 22,
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
  "desc": "野猪"
}
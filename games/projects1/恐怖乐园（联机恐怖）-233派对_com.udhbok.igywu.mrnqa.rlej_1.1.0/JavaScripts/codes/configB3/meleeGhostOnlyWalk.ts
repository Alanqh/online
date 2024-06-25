export const Behavior3_meleeGhostOnlyWalk = {
  "name": "meleeGhostOnlyWalk",
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
        "name": "Selector",
        "desc": "休闲分支",
        "args": {},
        "children": [
          {
            "id": 5,
            "name": "Sequence",
            "desc": "1",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 6,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 7,
                    "name": "GhostIsMoving",
                    "args": {}
                  }
                ]
              },
              {
                "id": 8,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 9,
                    "name": "GhostCheckStat",
                    "args": {
                      "stat": "patrolStat"
                    }
                  }
                ]
              },
              {
                "id": 10,
                "name": "Selector",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 11,
                    "name": "Sequence",
                    "args": {},
                    "children": [
                      {
                        "id": 12,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "patrolFinish"
                        }
                      },
                      {
                        "id": 13,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0.1
                        }
                      },
                      {
                        "id": 14,
                        "name": "GhostPlayPatrolAni",
                        "args": {
                          "keepTime": 4
                        }
                      }
                    ]
                  },
                  {
                    "id": 15,
                    "name": "Sequence",
                    "children": [
                      {
                        "id": 16,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0
                        }
                      },
                      {
                        "id": 17,
                        "name": "GhostRandomFindPlayer",
                        "args": {
                          "keepTime": 4
                        },
                        "debug": true
                      }
                    ]
                  },
                  {
                    "id": 18,
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
  "desc": "只会走的冷兵器贵"
}
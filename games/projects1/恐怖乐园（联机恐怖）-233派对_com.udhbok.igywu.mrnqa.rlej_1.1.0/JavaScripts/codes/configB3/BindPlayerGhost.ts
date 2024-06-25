export const Behavior3_BindPlayerGhost = {
  "name": "BindPlayerGhost",
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
                    "id": 10,
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
                "id": 11,
                "name": "GhostChaseTarget",
                "args": {},
                "input": [
                  "targetId"
                ]
              }
            ]
          },
          {
            "id": 12,
            "name": "Sequence",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 13,
                "name": "GhostCheckBuild",
                "args": {
                  "checkMin": 30
                },
                "output": [
                  "buildId"
                ],
                "debug": true
              },
              {
                "id": 14,
                "name": "AlwaysSuccess",
                "children": [
                  {
                    "id": 15,
                    "name": "GhostCheckAttackNode",
                    "args": {},
                    "input": [
                      "buildId"
                    ],
                    "output": [
                      "skillid"
                    ],
                    "debug": true
                  }
                ]
              },
              {
                "id": 16,
                "name": "GhostAttackTarget",
                "args": {},
                "input": [
                  "skillid",
                  "buildId"
                ],
                "debug": true
              }
            ]
          }
        ]
      },
      {
        "id": 17,
        "name": "Selector",
        "desc": "休闲分支",
        "args": {},
        "children": [
          {
            "id": 18,
            "name": "Sequence",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 19,
                "name": "FallBack",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 20,
                    "name": "GhostBindPlayerId",
                    "args": {},
                    "output": [
                      "targetId"
                    ]
                  }
                ]
              },
              {
                "id": 21,
                "name": "GhostStartChaseTarget",
                "args": {},
                "input": [
                  "targetId"
                ],
                "debug": true,
                "children": []
              }
            ]
          }
        ]
      }
    ]
  },
  "desc": "不会飞的建筑鬼"
}
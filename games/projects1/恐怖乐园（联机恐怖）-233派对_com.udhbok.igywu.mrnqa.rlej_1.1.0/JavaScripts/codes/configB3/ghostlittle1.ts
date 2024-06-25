export const Behavior3_ghostlittle1 = {
  "name": "ghostlittle1",
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
                    "name": "GhostCheckTarget",
                    "args": {
                      "isCheckPos": 0
                    },
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
                "name": "Sequence",
                "children": [
                  {
                    "id": 12,
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
                    "id": 13,
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
          }
        ]
      }
    ]
  },
  "desc": "boss召唤的小怪"
}
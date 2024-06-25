export const Behavior3_BaseSonAI = {
  "name": "BaseSonAI",
  "root": {
    "id": 1,
    "name": "Selector",
    "desc": "新行为树",
    "args": {},
    "children": [
      {
        "id": 2,
        "name": "Selector",
        "args": {},
        "children": [
          {
            "id": 3,
            "name": "AlwaysFail",
            "children": [
              {
                "id": 4,
                "name": "GhostGetDistance",
                "args": {
                  "treeName": "MommyLongLegs"
                },
                "output": [
                  "momDis"
                ]
              }
            ]
          },
          {
            "id": 5,
            "name": "Sequence",
            "desc": "buff状态",
            "args": {},
            "children": [
              {
                "id": 6,
                "name": "Cmp",
                "args": {
                  "eq": 800,
                  "cmpType": ">"
                },
                "input": [
                  "momDis"
                ],
                "children": []
              },
              {
                "id": 7,
                "name": "AlwaysSuccess",
                "children": []
              }
            ]
          },
          {
            "id": 8,
            "name": "Sequence",
            "desc": "普通状态",
            "args": {},
            "children": []
          }
        ]
      }
    ]
  },
  "desc": "基本儿子AI"
}
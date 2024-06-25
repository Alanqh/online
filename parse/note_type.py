from enum import Enum

class NoteType:
    Invalid = -1
    Null = 0
    Bool = 1
    Num = 2
    Str = 3
    Arr = 4
    Obj = 5
    Count = Obj + 1
    Arr_List = 41
    Arr_Array = 42

# # 使用枚举值的示例
# note_type = NoteType.Bool
# print(note_type == NoteType.Bool)  # 输出: True
# print(note_type.value)  # 输出: 1

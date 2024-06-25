from note_type import NoteType


class Note:
    def __init__(self, v):
        self.value = v
        self.type = self.determine_type(v)

    @staticmethod
    def determine_type(value):
        if value is None:
            return NoteType.Null
        elif isinstance(value, dict):
            return NoteType.Obj
        elif isinstance(value, list):
            return NoteType.Arr
        elif isinstance(value, str):
            return NoteType.Str
        elif isinstance(value, (int, float, complex)):
            return NoteType.Num
        elif isinstance(value, bool):
            return NoteType.Bool
        else:
            raise RuntimeError(f"Invalid type of {type(value)}")

    def get_object(self):
        if self.type == NoteType.Obj:
            return self.value
        return None

    def get_array(self):
        if self.type == NoteType.Arr:
            return self.value
        return None

# 使用示例
# note = Note({"key": "value"})
# print(note.get_object())  # 输出：{'key': 'value'}

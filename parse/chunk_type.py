class ChunkType:
    Key = 1
    Str = 2
    Note = 21


# 或者，如果你需要一个真正的枚举（需要导入 Enum 模块）:

from enum import Enum


class ChunkType:
    Key = 1
    Str = 2
    Note = 21

# 使用枚举的优点是它提供了额外的类型安全和易用性，例如：
# chunk_type = ChunkType.Key
# if chunk_type == ChunkType.Str:
#     # 做一些处理

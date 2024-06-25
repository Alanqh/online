import struct


class OutOfBytesRange(Exception):
    def __init__(self, tag, bytes_, offset):
        super().__init__(f"[{tag}] bytes size: {len(bytes_)} offset: {offset}")


# ----------------------------------------------------------------------------------------
# bytes to unsigned int
def to_u32(bytes_, offset):
    if len(bytes_) - offset < 4:
        raise OutOfBytesRange("to uint32", bytes_, offset)

    v = (bytes_[offset] & 0xFF) | ((bytes_[offset + 1] & 0xFF) << 8) | ((bytes_[offset + 2] & 0xFF) << 16) | (
            (bytes_[offset + 3] & 0xFF) << 24)
    return v & 0xFFFFFFFF
    # return struct.unpack_from('>I', bytes_, offset)[0]


def to_u16(bytes_, offset):
    if len(bytes_) - offset < 2:
        raise OutOfBytesRange("to uint16", bytes_, offset)
    v = (bytes_[offset] & 0xFF) | ((bytes_[offset + 1] & 0xFF) << 8)
    return int(v & 0xFFFF)
    # return struct.unpack_from('>H', bytes_, offset)[0]


def to_u8(bytes_, offset):
    if len(bytes_) - offset < 1:
        raise OutOfBytesRange("to uint8", bytes_, offset)
    return bytes_[offset] & 0xFF
    # return struct.unpack_from('>B', bytes_, offset)[0]


# ----------------------------------------------------------------------------------------
# bytes to signed int
def to_i64(bytes_, offset):
    if len(bytes_) - offset < 8:
        raise OutOfBytesRange("to int64", bytes_, offset)
    return (bytes_[offset] & 0xFF) | ((bytes_[offset + 1] & 0xFF) << 8) | ((bytes_[offset + 2] & 0xFF) << 16) | (
            (bytes_[offset + 3] & 0xFF) << 24) | ((bytes_[offset + 4] & 0xFF) << 32) | (
            (bytes_[offset + 5] & 0xFF) << 40) | ((bytes_[offset + 6] & 0xFF) << 48) | (
            (bytes_[offset + 7] & 0xFF) << 56)
    # return struct.unpack_from('>q', bytes_, offset)[0]


def to_i64_no_offset(bytes_):
    offset = 0
    return to_i64(bytes_, 0)


def long_bits_to_double(long_bits):
    # 首先将长整型转换为字节序列，假设使用大端字节序
    bytes_ = struct.pack('>Q', long_bits)
    # 然后将字节序列解包为双精度浮点数
    bytes__ = struct.unpack('>d', bytes_)[0]
    # print("解析 bits to double:", long_bits, bytes__)
    return bytes__


def int_bits_to_float(int_bits):
    # 首先将整型转换为字节序列，假设使用大端字节序
    bytes_ = struct.pack('>I', int_bits)
    # 然后将字节序列解包为单精度浮点数
    bytes__ = struct.unpack('>f', bytes_)[0]

    print("解析 bits to float:", int_bits, bytes__)
    return bytes__


def to_i32(bytes_, offset):
    if len(bytes_) - offset < 4:
        raise OutOfBytesRange("to int32", bytes_, offset)
    return (bytes_[offset] & 0xFF) | ((bytes_[offset + 1] & 0xFF) << 8) | ((bytes_[offset + 2] & 0xFF) << 16) | (
            (bytes_[offset + 3] & 0xFF) << 24)
    # return struct.unpack_from('>i', bytes_, offset)[0]


def to_f64(bytes_):
    return long_bits_to_double(to_i64_no_offset(bytes_))
    # return struct.unpack_from('>d', bytes_, 0)[0]


def to_f32(bytes_):
    return int_bits_to_float(to_i32(bytes_, 0))
    # return struct.unpack_from('>d', bytes_, 0)[0]


def to_i16(bytes_, offset):
    if len(bytes_) - offset < 2:
        raise OutOfBytesRange("to int16", bytes_, offset)
    return (bytes_[offset] & 0xFF) | ((bytes_[offset + 1] & 0xFF) << 8)
    # return struct.unpack_from('>h', bytes_, offset)[0]


def to_i8(bytes_, offset):
    if len(bytes_) - offset < 1:
        raise OutOfBytesRange("to int8", bytes_, offset)
    return bytes_[offset]


def to_dynamic(bytes_, offset, size):
    if len(bytes_) - offset < size:
        raise OutOfBytesRange("to dynamic " + str(size), bytes_, offset)

    result = 0
    for i in range(size):
        result |= (bytes_[offset + i] & 0xFF) << (i * 8)
    return result
    # format_str = '>' + {1: 'B', 2: 'H', 4: 'I', 8: 'Q'}.get(size, '')
    # if not format_str:
    #     raise ValueError("Invalid size for dynamic conversion")
    # return struct.unpack_from(format_str, bytes_, offset)[0]


# ----------------------------------------------------------------------------------------
# from data types to bytes
def from_dynamic(value, bytes_, offset, size):
    if len(bytes_) - offset < size:
        raise OutOfBytesRange("from dynamic " + str(size), bytes_, offset)
    for i in range(size):
        # 在Python中，为了避免运算结果超出byte范围，我们应该使用0xFF。
        # bytes是一个bytearray，可以在索引处赋新值。
        bytes_[offset + i] = (value >> (i * 8)) & 0xFF


class OutOfSize(Exception):
    def __init__(self, tag, value):
        super().__init__(f"[{tag}] not expected {hex(value)}")


# unsigned int to bytes
def from_u32(value, bytes_, offset):
    if value & 0xFFFFFFFF != value:
        raise OutOfSize("from uint32", value)
    if len(bytes_) - offset < 4:
        raise OutOfBytesRange("from uint32", bytes_, value)

    # bytes_[offset:offset + 4] = struct.pack('>I', value)
    bytes_[offset] = (value & 0xFF)
    bytes_[offset + 1] = (value >> 8) & 0xFF
    bytes_[offset + 2] = (value >> 16) & 0xFF
    bytes_[offset + 3] = (value >> 24) & 0xFF


def from_u16(value, bytes_, offset):
    if value & 0xFFFF != value:
        raise OutOfSize("from uint16", value)
    if len(bytes_) - offset < 2:
        raise OutOfBytesRange("from uint16", bytes_, value)
    bytes_[offset] = value & 0xFF
    bytes_[offset + 1] = (value >> 8) & 0xFF


def from_u8(value, bytes_, offset):
    if value & 0xFF != value:
        raise OutOfSize("from uint8", value)
    if len(bytes_) - offset < 1:
        raise OutOfBytesRange("from uint8", bytes_, value)
    bytes_[offset] = value & 0xFF


# signed int to bytes
def from_i64(value, bytes_, offset):
    if len(bytes_) - offset < 8:
        raise OutOfBytesRange("from int64", bytes_, offset)
    for i in range(8):
        # 这将确保负数的右移行为与Java中的无符号右移相同
        bytes_[offset + i] = (value >> (8 * i)) & 0xFF


def double_to_long_bits(value):
    # 'd' 表示一个双精度浮点数，'q' 表示一个64位长整数。
    # '<' 是指定小端字节序，'>‘ 则表示大端字节序。IEEE 754 使用的是大端字节序。
    # 这里选择的字节序应该与你希望的或者数据来源的字节序相同。
    return struct.unpack('<q', struct.pack('<d', value))[0]


def from_f64(value, bytes_, offset):
    from_i64(double_to_long_bits(value), bytes_, offset)


def from_i32(value, bytes_, offset):
    if len(bytes_) - offset < 4:
        raise OutOfBytesRange("from int32", bytes_, offset)
    for i in range(4):
        # 这将确保负数的右移行为与Java中的无符号右移相同
        bytes_[offset + i] = (value >> (8 * i)) & 0xFF


def from_i16(value, bytes_, offset):
    if len(bytes_) - offset < 2:
        raise OutOfBytesRange("from int16", bytes_, offset)
    for i in range(2):
        # 这将确保负数的右移行为与Java中的无符号右移相同
        bytes_[offset + i] = (value >> (8 * i)) & 0xFF


def from_i8(value, bytes_, offset):
    if len(bytes_) - offset < 1:
        raise OutOfBytesRange("from int8", bytes_, offset)
    bytes_[offset] = value

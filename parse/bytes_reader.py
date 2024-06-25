import struct

import bytes_covert


class BytesReader:
    def __init__(self, buff):
        self.buff = buff
        self.p = 0

    def check_read_magic(self, magic):
        size = min(len(self.buff), len(magic))
        if self.buff[self.p:self.p + size] == magic:
            self.p += size
            return True
        self.p += size
        return False

    def read_dynamic(self, size):
        result = bytes_covert.to_dynamic(self.buff, self.p, size)
        # 假设 'to_dynamic' 是一个从字节到动态整数的转换函数
        # result, = struct.unpack('>Q', self.buff[self.p:self.p + size] + b'\x00' * (8 - size))
        self.p += size
        return result

    def read_string(self):
        byte_size = self.read_u16()
        s = self.buff[self.p:self.p + byte_size].decode('utf-8')
        self.p += byte_size
        return s

    def read_u32(self):
        result = bytes_covert.to_u32(self.buff, self.p)
        # result, = struct.unpack('>I', self.buff[self.p:self.p + 4])
        self.p += 4
        return result

    def read_u16(self):
        result = bytes_covert.to_u16(self.buff, self.p)
        # result, = struct.unpack('>H', self.buff[self.p:self.p + 2])
        self.p += 2
        return result

    def read_u8(self):
        result = bytes_covert.to_u8(self.buff, self.p)
        # result, = struct.unpack('>B', self.buff[self.p:self.p + 1])
        self.p += 1
        return result

    def read_i64(self):
        result = bytes_covert.to_i64(self.buff, self.p)
        # result, = struct.unpack('>q', self.buff[self.p:self.p + 8])
        self.p += 8
        return result

    @staticmethod
    def long_bits_to_double(long_v):
        # 首先将长整型转换为字节序列，假设使用大端字节序
        bytes_ = struct.pack('>Q', long_v)
        # 然后将字节序列解包为双精度浮点数
        bytes__ = struct.unpack('>d', bytes_)[0]
        # print("解析 double:", long_v, bytes__)
        return bytes__

    def read_double(self):
        return self.long_bits_to_double(self.read_i64())

    def read_i32(self):
        result = bytes_covert.to_i32(self.buff, self.p)
        # result, = struct.unpack('>i', self.buff[self.p:self.p + 4])
        self.p += 4
        return result

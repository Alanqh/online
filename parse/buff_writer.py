import struct

import bytes_covert


class BuffWriter:

    def __init__(self, init_size):
        self.buffer = bytearray(init_size)
        self.p = 0

    def get_bytes(self):
        return self.buffer[:self.p]

    def _grow(self, min_capacity):
        new_capacity = len(self.buffer) * 3 // 2
        if new_capacity < min_capacity:
            new_capacity = min_capacity
        if new_capacity < 0:
            new_capacity = 2 ** 31 - 1  # Assuming 32-bit integer max value
        self.buffer.extend([0] * (new_capacity - len(self.buffer)))

    def _ensure(self, extend_size):
        if self.p + extend_size > len(self.buffer):
            self._grow(self.p + extend_size)

    # ---------------------------------------------------------------------------

    def write_magic(self, magic):
        self.write_bytes(magic)

    def write_bytes(self, bytes_):
        if bytes_ is None:
            raise RuntimeError("write bytes null")
        length = len(bytes_)
        self._ensure(length)
        self.buffer[self.p:self.p + length] = bytes_
        self.p += length

    def write_dynamic(self, value, size):
        self._ensure(size)
        bytes_covert.from_dynamic(value, self.buffer, self.p, size)
        # Simulate 'BytesConvert.fromDynamic'
        # struct.pack_into(f'<{size}s', self.buffer, self.p, value.to_bytes(size, byteorder='little'))
        self.p += size

    def write_i32(self, value):
        self._ensure(4)
        bytes_covert.from_i32(value, self.buffer, self.p)
        # Simulate 'BytesConvert.fromI32'
        # struct.pack_into('<i', self.buffer, self.p, value)
        self.p += 4

    def write_u32(self, value):
        self._ensure(4)
        bytes_covert.from_u32(value, self.buffer, self.p)
        # Simulate 'BytesConvert.fromU32'
        # struct.pack_into('<I', self.buffer, self.p, value)
        self.p += 4

    def write_u16(self, value):
        self._ensure(2)
        bytes_covert.from_u16(value, self.buffer, self.p)
        # Simulate 'BytesConvert.fromU16'
        # struct.pack_into('<H', self.buffer, self.p, value)
        self.p += 2

    def write_u8(self, value):
        self._ensure(1)
        bytes_covert.from_u8(value, self.buffer, self.p)
        # Simulate 'BytesConvert.fromU8'
        # struct.pack_into('<B', self.buffer, self.p, value)
        self.p += 1

    def write_double(self, value):
        self._ensure(8)
        bytes_covert.from_f64(value, self.buffer, self.p)
        # Simulate 'BytesConvert.fromF64'
        # struct.pack_into('<d', self.buffer, self.p, value)
        self.p += 8

    def tell(self):
        return self.p

    def seek(self, pos):
        self.p = pos

import struct
from collections import OrderedDict
from concurrent.futures import ThreadPoolExecutor
import uuid

from buff_writer import BuffWriter
from chunk_type import ChunkType
from note_const import NoteConst
from note_type import NoteType


class ValueChunkWriter:
    def __init__(self):
        self.key_index_size = 4
        self.string_index_size = 4
        self.key_chunk = OrderedDict()
        self.string_chunk = OrderedDict()

    def collect_key(self, key):
        if key not in self.key_chunk:
            self.key_chunk[key] = len(self.key_chunk)

    def collect_string(self, string):
        if string not in self.string_chunk:
            self.string_chunk[string] = len(self.string_chunk)

    def serialize(self, buff_writer):
        NoteGenerator.serialize_chunk(buff_writer, ChunkType.Key, self.key_chunk)
        NoteGenerator.serialize_chunk(buff_writer, ChunkType.Str, self.string_chunk)
        self.key_index_size = NoteGenerator.get_len_size(len(self.key_chunk))
        self.string_index_size = NoteGenerator.get_len_size(len(self.string_chunk))


# 以下是NoteGenerator类的Python实现
class NoteGenerator:
    @staticmethod
    def get_len_size(in_len):
        if in_len <= 0xff:
            return 1
        elif in_len <= 0xffff:
            return 2
        else:
            return 4

    @staticmethod
    def serialize_chunk(buff_writer, chunk_type, chunk_map):
        buff_writer.write_u8(chunk_type)
        buff_writer.write_u32(len(chunk_map))
        max_bytes_size = 0
        max_bytes_size_pos = buff_writer.tell()
        buff_writer.write_u16(max_bytes_size)
        index = 0
        for key in chunk_map.keys():
            chunk_map[key] = index
            index += 1
            str_buf = key.encode('utf-8')
            if len(str_buf) > max_bytes_size:
                max_bytes_size = len(str_buf)
            buff_writer.write_u16(len(str_buf))
            buff_writer.write_bytes(str_buf)
        end_pos = buff_writer.tell()
        buff_writer.seek(max_bytes_size_pos)
        buff_writer.write_u16(max_bytes_size)
        buff_writer.seek(end_pos)

    @staticmethod
    def gen_buffer():
        writer = BuffWriter(1024)
        writer.write_magic(NoteConst.Magic)
        return writer

    def get_note_type(o):
        if o is None:
            return NoteType.Null
        if isinstance(o, bool):
            return NoteType.Bool
        if isinstance(o, (int, float)):
            return NoteType.Num
        if isinstance(o, str):
            return NoteType.Str
        if isinstance(o, dict):
            return NoteType.Obj
        if isinstance(o, list):
            return NoteType.Arr_List
        if isinstance(o, tuple):  # assuming the array in Java may correspond to a tuple in Python
            return NoteType.Arr_Array
        return NoteType.Invalid

    def pre(o, writer):
        t = NoteGenerator.get_note_type(o)
        if t == NoteType.Str:
            writer.collect_string(o)
        elif t == NoteType.Obj:
            for k, v in o.items():
                writer.collect_key(k)
                NoteGenerator.pre(v, writer)
        elif t in (NoteType.Arr_List, NoteType.Arr_Array):
            for item in o:
                NoteGenerator.pre(item, writer)

    def serialize(o, buff_writer, writer):
        t = NoteGenerator.get_note_type(o)
        if t == NoteType.Null:
            buff_writer.write_u8(NoteType.Null)
        elif t == NoteType.Bool:
            buff_writer.write_u8(NoteType.Bool)
            buff_writer.write_u8(1 if o else 0)
        elif t == NoteType.Num:
            buff_writer.write_u8(NoteType.Num)
            buff_writer.write_double(float(o))
        elif t == NoteType.Str:
            str_index = writer.string_chunk.get(o)
            if str_index is None:
                raise RuntimeError(f"writer.string_chunk does not contain the key: {o}")
            buff_writer.write_u8(NoteType.Str)
            buff_writer.write_dynamic(str_index, writer.string_index_size)
        elif t == NoteType.Obj:
            buff_writer.write_u8(NoteType.Obj)
            buff_writer.write_u16(len(o))
            for k, v in o.items():
                key_index = writer.key_chunk.get(k)
                if key_index is None:
                    raise RuntimeError(f"writer.key_chunk does not contain the key: {k}")
                buff_writer.write_dynamic(key_index, writer.key_index_size)
                NoteGenerator.serialize(v, buff_writer, writer)
        elif t in (NoteType.Arr_List, NoteType.Arr_Array):
            buff_writer.write_u8(NoteType.Arr)
            buff_writer.write_i32(len(o))
            for item in o:
                NoteGenerator.serialize(item, buff_writer, writer)

    @staticmethod
    def from0(obj):
        buff_writer = NoteGenerator.gen_buffer()
        writer = ValueChunkWriter()
        NoteGenerator.pre(obj, writer)
        writer.serialize(buff_writer)
        buff_writer.write_u8(ChunkType.Note)
        NoteGenerator.serialize(obj, buff_writer, writer)
        return buff_writer.get_bytes()

    @staticmethod
    def from_map(node):
        return NoteGenerator.from0(node)

    @staticmethod
    def from_array(array):
        return NoteGenerator.from0(array)

    @staticmethod
    def from_list(list_):
        return NoteGenerator.from0(list_)

    @staticmethod
    def from_string(string):
        return NoteGenerator.from0(string)

    @staticmethod
    def from_note(note):
        return NoteGenerator.from0(note.value)

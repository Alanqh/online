import json
from abc import abstractmethod, ABC
from collections import OrderedDict

from bytes_reader import BytesReader
from chunk_type import ChunkType
from note import Note
from note_const import NoteConst
from note_type import NoteType
import os
import time
import shutil

class NoteParser:

    @staticmethod
    def get_len_size(in_len):
        return 1 if in_len <= 0xff else 2 if in_len <= 0xffff else 4

    class Route:

        class Router(ABC):
            @abstractmethod
            def on(self, buff_reader, value_chunk_reader):
                pass

        Routers = [None] * NoteType.Count

        @staticmethod
        def router(buff_reader, value_chunk_reader):

            # NoteParser.Route.Routers[NoteType.Null] = lambda buff_reader, reader: None
            # NoteParser.Route.Routers[NoteType.Bool] = lambda buff_reader, reader: buff_reader.readU8() != 0
            # NoteParser.Route.Routers[NoteType.Num] = lambda buff_reader, reader: buff_reader.readDouble()
            # NoteParser.Route.Routers[NoteType.Str] = NoteParser.Route.parse_for_string
            # NoteParser.Route.Routers[NoteType.Arr] = NoteParser.Route.parse_for_array
            # NoteParser.Route.Routers[NoteType.Obj] = NoteParser.Route.parse_for_map
            type_id = buff_reader.read_u8()
            # print("解析 type_id:", type_id)
            if type_id == NoteType.Obj:
                return NoteParser.Route.parse_for_map(buff_reader, value_chunk_reader)
            elif type_id == NoteType.Str:
                return NoteParser.Route.parse_for_string(buff_reader, value_chunk_reader)
            elif type_id == NoteType.Arr:
                return NoteParser.Route.parse_for_array(buff_reader, value_chunk_reader)
            elif type_id == NoteType.Bool:
                return buff_reader.read_u8() != 0
            elif type_id == NoteType.Num:
                return buff_reader.read_double()
            elif type_id == NoteType.Null:
                return None
            # return NoteParser.Route.Routers[type_id].on(buff_reader, value_chunk_reader)

        @staticmethod
        def parse_for_string(buff_reader, value_chunk_reader):
            index = buff_reader.read_dynamic(value_chunk_reader.string_index_size)
            index_ = value_chunk_reader.string_chunk[int(index)]
            # print("解析 string index:", index, index_)
            return index_

        @staticmethod
        def parse_for_map(buff_reader, value_chunk_reader):
            size = buff_reader.read_u16()
            map_ = OrderedDict()
            # 假设reader.keyChunk.size()这个调用在这里不是必须的，因为在Python中不需要提前调用它进行初始化
            key_index_size = value_chunk_reader.key_index_size
            if key_index_size < 0 or key_index_size > 4:
                raise Exception(f"invalid key index size {key_index_size}")
            for _ in range(size):
                index = buff_reader.read_dynamic(key_index_size)
                key = value_chunk_reader.key_chunk[int(index)]
                map_[key] = NoteParser.Route.router(buff_reader, value_chunk_reader)
            return map_

        @staticmethod
        def parse_for_array(buff_reader, value_chunk_reader):
            size = buff_reader.read_i32()
            list_ = []
            for _ in range(size):
                list_.append(NoteParser.Route.router(buff_reader, value_chunk_reader))
            # print("解析 arr size:", size, list_)
            return list_

    class ValueChunkReader:

        @staticmethod
        def deserialize_chunk(buff_reader, chunk):
            count = buff_reader.read_u32()
            # 为了提高性能，预先分配列表空间是一个好习惯，但在Python中并不是必须的，
            # 因为Python列表会自动调整大小。但如果你想这么做，你可以使用下面的方式：
            # chunk.extend([None] * count)

            # 这行在Python中并没有实际作用，因为没有将结果赋值给变量，
            # 但我假设这是为了读取并丢弃一个16位的无符号整数。
            buff_reader.read_u16()
            # print("chunk length:", len(chunk), " count:", count)
            for i in range(count):
                string = buff_reader.read_string()
                # print("parse string i:", i, "str:", string)
                chunk[i] = string
            # print("parsed chunk", chunk)

        def __init__(self):
            self.key_index_size = 4
            self.string_index_size = 4
            self.key_chunk = {}
            self.string_chunk = {}

        def deserialize(self, buff_reader):
            self.key_chunk.clear()
            self.string_chunk.clear()
            result_chunk_type = None
            while True:
                chunk_type = buff_reader.read_u8()
                # print("read_u8:", chunk_type, ChunkType.Key)
                if chunk_type == ChunkType.Key:
                    # print("while true ChunkType-Key:", chunk_type)
                    self.deserialize_chunk(buff_reader, self.key_chunk)
                elif chunk_type == ChunkType.Str:
                    # print("while true ChunkType-Str:", chunk_type)
                    self.deserialize_chunk(buff_reader, self.string_chunk)
                else:
                    # print("while true ChunkType-Nothing")
                    result_chunk_type = chunk_type
                    break
            self.key_index_size = NoteParser.get_len_size(len(self.key_chunk))
            self.string_index_size = NoteParser.get_len_size(len(self.string_chunk))
            return result_chunk_type

    @staticmethod
    def parse(buff_reader):
        # print("start parse")
        if not buff_reader.check_read_magic(NoteConst.Magic):
            return None
            #raise RuntimeError("magic head incorrect")

        reader = NoteParser.ValueChunkReader()
        # print("buff_reader", buff_reader)
        chunk_type = reader.deserialize(buff_reader)
        # print("chunk_type", chunk_type)
        if chunk_type != ChunkType.Note:
            raise RuntimeError(f"expected chunk type note error {chunk_type}")

        return Note(NoteParser.Route.router(buff_reader, reader))

    @staticmethod
    def parse_from_stream(in_stream):
        buff = in_stream.read()
        if len(buff) != in_stream.tell():
            raise RuntimeError("stream EOF")
        return NoteParser.parse(BytesReader(buff))

    @staticmethod
    def parse_from_bytes(buff):
        buff_reader = BytesReader(buff)
        return NoteParser.parse(buff_reader)


def parse(filename, outputfilename):
    with open(filename, 'rb') as file:
        file_bytes = file.read()
        # file_bytes现在是包含文件内容的bytes数组
        reader = BytesReader(file_bytes)
        note = NoteParser.parse(reader)
        if note is None:
            return file_bytes
        # print("过程数据", note.get_object())
        # 将bytes解码为字符串
        string_data = json.dumps(note.get_object(), ensure_ascii=False)
        # print("最终得到结果:", string_data)
        # 打开文件进行写入
        if outputfilename:
            with open(outputfilename, 'w', encoding='utf-8') as file:
                file.write(string_data)
    return string_data

checkFiles = ["Prefabs","TempPrefabs","Levels","UI"]
fileList=[]
def get_all_file_path(in_path):
    if not os.path.exists(in_path):
        return
    path_list = os.listdir(in_path)
    for p in path_list:
        fullpath = os.path.join(in_path, p)
        if os.path.isdir(fullpath):
            get_all_file_path(fullpath)
            continue
        if fullpath.endswith('.level') or fullpath.endswith('.prefab') or fullpath.endswith('.ui'):
            fileList.append(fullpath)


def init_path():
    project = os.path.abspath(os.path.dirname(os.getcwd()))
    num=1
    dest='projects'+str(num)
    rootPath = os.path.join(project, dest)
    while os.path.exists(rootPath):
        ps = os.listdir(rootPath)
        print('项目列表路径:' + rootPath)
        for p in ps:
            path=os.path.join(rootPath, p)
            if os.path.isfile(path):
                continue
            print('检查项目:' + p)
            files=os.listdir(path)
            for p in files:
                if p in checkFiles:
                    get_all_file_path(os.path.join(path, p))
        shutil.copy('dist/ScanAsset.exe', rootPath+'/ScanAsset.exe')
        shutil.copy('dist/ScanProject.exe', rootPath+'/ScanProject.exe')
        shutil.copy('dist/废弃表.xlsx', rootPath+'/废弃表.xlsx')
        shutil.copy('dist/废弃资源使用统计.xlsx', rootPath+'/废弃资源使用统计.xlsx')
        shutil.copy('dist/项目废弃资源使用统计.xlsx', rootPath+'/项目废弃资源使用统计.xlsx')
        num+=1
        dest='projects'+str(num)
        rootPath = os.path.join(project, dest)


if __name__ == "__main__":
    init_path()
    for f in fileList:
        print("解析文件:",f)
        parse(f, f)
    time.sleep(1)
    os.system('pause')

    # str = parse('NewLevel.level', None)
    # str = parse('NewLevel.level', 'output_file_level.txt')
    # str = parse('温泉区_二进制.prefab', None)
    #str = parse('温泉区_二进制.prefab', '温泉区_解析后.prefab')
    # print(str)


import zipfile
import time
import os

st = time.time()
zipList=[]
def get_all_file_path(in_path):
    if not os.path.exists(in_path):
        return

    path_list = os.listdir(in_path)
    num=0
    for p in path_list:
        fullpath = os.path.join(in_path, p)
        if fullpath.endswith('.zip'):
            # page=1
            print('解压:'+fullpath)
            with zipfile.ZipFile(fullpath, 'r') as zip_ref:
                fn=str(p).replace('.zip','')
                fn=fn.strip()
                zip_ref.extractall(root+'\\projects1'+'\\'+fn)
            zipList.append(fullpath)



root = os.getcwd()+"\\games"
print("-----\n")
print('zip目录:' + root+"\n")
get_all_file_path(root)
print('\n共解压zip:' +str(zipList.__len__())+"个,放入projects目录中")
print("-----\n")
time.sleep(1)
os.system('pause')

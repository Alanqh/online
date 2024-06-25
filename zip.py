
import zipfile
import time
import os

logs=[]
st = time.time()
zipList=[]
def get_all_file_path(in_path):
    if not os.path.exists(in_path):
        return
    path_list = os.listdir(in_path)
    for p in path_list:
        fullpath = os.path.join(in_path, p)
        if fullpath.endswith('.zip'):
            print('解压:'+fullpath)
            try:
                with zipfile.ZipFile(fullpath, 'r') as zip_ref:
                    fn=str(p).replace('.zip','')
                    fn=fn.strip()
                    zip_ref.extractall(root+'\\projects1'+'\\'+fn)
                zipList.append(fullpath)
            except Exception as e:
                print('解压失败:'+fullpath)
                logs.append(fullpath+str(e))



root = os.getcwd()+"\\games"
print("-----\n")
print('zip目录:' + root+"\n")
get_all_file_path(root)
print('\n共解压zip:' +str(zipList.__len__())+"个,放入projects目录中")
print("-----\n")
time.sleep(1)
with open('ziplog.txt', 'w', encoding='utf8') as file:
    for log in logs:
        file.write(log + '\n')
os.system('pause')

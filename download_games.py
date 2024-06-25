import os
import json
import random
from urllib.request import urlretrieve

logPath=[]
fileRoot='games'
# 检查并创建目录
if not os.path.exists(fileRoot):
    os.makedirs(fileRoot)

# 读取游戏信息列表
with open('download_url.txt', 'r', encoding='utf8') as file:
    games_info = [json.loads(line.strip()) for line in file]

# 随机选择10个游戏
games_info = random.sample(games_info, 10)

# 遍历游戏信息并下载zip包
for game in games_info:
    # 确保文件名符合文件系统限制
    game_name = game['gameName'].replace('/', '_').replace('\\', '_')
    game_name=game_name.strip()
    game_pkg= game['packageName']
    game_version = game['gameVersion']
    url = game['zipUrl']
    filename = f"{game_name}_{game_pkg}_{game_version}.zip"
    filepath = os.path.join(fileRoot, filename)

    # 如果文件不存在，则下载
    if not os.path.exists(filepath):
        print(f"Downloading: {filename} from {url}")
        try:
            urlretrieve(url, filepath)
            print(f"Downloaded: {filename}")
        except Exception as e:
            print(f"Failed to download {filename}. Error: {e}")
    else:
        print(f"Already exists: {filename}")
        logPath.append(filename)
# 写入游戏信息到文件
with open('log.txt', 'w', encoding='utf8') as file:
    for game in logPath:
        file.write(game + '\n')
print("Finished downloading all game zips.")
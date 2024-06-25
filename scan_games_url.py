import requests
import json

# 定义可能的API环境
environments = {
    '1': 'https://test1010-api.meta-verse.co',
    '2': 'https://api.meta-verse.co',
    '3': 'https://mw-api.jaxine.xyz',
}

# 用户选择运行环境
print("请选择API运行环境:")
for key, env in environments.items():
    print(f"{key}: {env}")
env_choice = input("输入选项(1-3): ")
base_url = environments.get(env_choice)

if not base_url:
    print("无效的环境选择。退出程序。")
    exit(0)

# 定义API接口
api_endpoint = "/gameServer/athena/getSceneZipUrl"


# API endpoint
api_url = f"{base_url}{api_endpoint}"
headers = {'Content-Type': 'application/json'}

# 控制下载的游戏数量
max_game_count = 10  # 设置要下载的游戏数量上限

# 参数
params = {
    'pageSize': 20,
    'pageNum': 0
}

# 存储游戏信息
games_info = []

# 请求数据并获取总游戏数
response = requests.get(api_url, headers=headers, params=params)
total_games = response.json().get('total', 0)
print('游戏数量:'+str(total_games))
# 计算实际需要下载的游戏数量，不超过total和max_game_count
max_game_count = min(max_game_count, total_games)

# 请求数据并获取游戏信息直到达到max_game_count
while len(games_info) < max_game_count:
    response = requests.get(api_url, headers=headers, params=params)
    data = response.json().get('data', [])
    for game in data:
        # 处理游戏名称可能不存在的情况
        game_name = game.get('gameName', 'Unknown Game')
        games_info.append({
            'developerId': game['developerId'],
            'gameName': game_name,
            'gameVersion': game['gameVersion'],
            'packageName': game['packageName'],
            'zipUrl': game['zipUrl']
        })
        if len(games_info) >= max_game_count:
            break
    # 判断是否已经获得足够的游戏信息或者是否已经是最后一页
    num=len(games_info)
    print('已获得'+str(num)+'个游戏信息')
    if num >= max_game_count or not data:
        break
    params['pageNum'] += 1

# 写入游戏信息到文件
with open('download_url.txt', 'w', encoding='utf8') as file:
    for game in games_info:
        file.write(json.dumps(game, ensure_ascii=False) + '\n')

print(f"Finished writing {len(games_info)} game info to download_url.txt")

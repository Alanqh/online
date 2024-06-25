import { PlayerManagerExtesion, } from './Modified027Editor/ModifiedPlayer';
﻿import data from "./mydata";
import { modS } from "./modS";
import mydata from "./mydata";

/**
 * 模块C（客户端）
 */
export class modC extends ModuleC<modS, data>{
    private guanqiaid = "0854BF23"//空锚点的id-关卡
    private deadid = "25227780"//空锚点的id-死亡碰撞
    private avaAction = false//是否为宠物状态
    private avaActioning = false//是否为宠物状态动画循环中
    onStart(): void {
        this.deadth()
    }
    //宠物动画循环
    avaloop() {
        if (!this.avaActioning) {
            this.avaActioning = true
            let char = Player.localPlayer.character
            AssetUtil.asyncDownloadAsset("181289");//宠物动画
            let ani = PlayerManagerExtesion.loadAnimationExtesion(char, "181289", true)
            ani.loop = 1;
            // 创建并开始这个循环
            let inter = setInterval(() => {
                if (this.avaAction) {
                    // console.log("循环")
                    if (char.isMoving) {//判断是否在移动状态
                        if (!ani.isPlaying) {
                            ani.play();
                            // console.log("移动" + char.isMoving)
                        }
                    }
                } else {
                    // 结束这个循环
                    clearInterval(inter)
                    this.avaActioning = false
                    // console.log("停止循环")
                }
            }, 500)
        }
    }
    //注册死亡碰撞
    deadth() {
        GameObject.asyncFindGameObjectById(this.deadid).then(go => {
            let arr = go.getChildren()
            for (let child of arr) {
                //为触发器绑定 有物体进入时 会触发的监听事件
                let trigger = child as mw.Trigger
                trigger.onEnter.add((other) => {
                    //这里判断一下进入区域的物体是不是一名角色
                    if (PlayerManagerExtesion.isCharacter(other)) {
                        let character = other as mw.Character//是的话，转成角色类型
                        let player = character.player
                        let player2 = Player.localPlayer
                        if (player == player2) {
                            Event.dispatchToServer("客户端", "回城", "")//客户端给服务器发消息
                        }
                    }
                })
            }
        })
    }
    scenedress: Array<string> = [//换装
        "02F7FEC041D94830FEA3338AC5EC5BE6", "E3AF5053412ABC1F4B8682B0AE7CC946", "9984D7834E891FA28CAA19B397F6478F", "F6B9E8BB4A04146BA51B3FA57EF122E9", "239E802B4D040C7FA9FBFE8198D1A99B",
        "5B003C8D49813547F729FBBE1242ECBF", "36CB6E2C4F4D25A7BEA69D9B3F596F57", "D6480C9C48347BDA019BCAACB1477C7C", "5355447A4A6DEB56726FFBB74A88530F", "CC43467746542876F89903A68EA76C98",
        "6C34A17942D610A260C298B7FBDDB96B", "756F1F674E4D6409B37AD491568A1DDF", "4804D10F4793F38E9FACE58E651BAC99", "0D88D36648935DC64E961AB169419C22", "C4E55E504C1BE3D5C6FC539C5FC9B1DD",
        "15B79C8746FC12A8BB474EA6F2A4434D", "80DB150D4384468E229E24A04B5D8A77", "98ADBF4F4D66AEC2534B15B31C3E2713", "9504EEA04E082A41A173EE96B894FCCD", "A6AE3B834ABC0D8C07B964B1AFED6975",
    ];
    DressIcon: Array<string> = [//换装icon
        "123229", "114908", "101659", "170921", "123144",
        "146227", "114907", "169725", "170366", "114938",
        "114899", "114904", "183081", "114889", "183038",
        "183029", "183054", "114906", "165109", "114947",
    ];
    TailIcon: Array<string> = [//拖尾icon
        "148843", "148845", "148831", "148834", "148836",
        "148844", "148835", "148825", "148824", "148826",
        "148829", "148828", "148833", "148839", "148827",
        "148840", "148837", "148830", "148841", "148838",
        "174364", //有图标的
        //没图标的↓
        "159337", "159337", "159337", "159337", "159337",
        "159337", "159337", "159337", "159337", "159337",
        "159337", "159337", "159337", "159337", "159337",
        "159337", "159337", "159337", "159337", "159337",
        "159337", "159337", "159337", "159337", "159337",
        "159337", "159337", "159337", "159337",
    ];
    TailTxt: Array<string> = [//拖尾文字
        "泡泡", "闪电", "雪花", "爆竹", "烟花",
        "礼物", "爱心", "骷髅", "香蕉", "亮闪",
        "钞票", "火焰", "足球", "彩虹", "糖果",
        "烟雾", "奖杯", "皇冠", "彩带", "螺丝",
        "彩烟",  //有图标的
        //没图标的↓
        "坨", "水", "羽毛", "泡光束", "彩光束",
        "彩条", "紫雷", "细彩虹", "黄烟", "绿烟",
        "火雾", "黑烟", "光粒", "紫光束", "红光束",
        "蓝瀑", "蓝光束", "紫星", "黄宝石", "乐曲",
        "星彩", "雪流光", "紫流光", "水流光", "粉流光",
        "光带", "泡流光", "水雾", "雪印",
    ];
    WingIcon: Array<string> = [//翅膀icon
        "112150", "112145", "136692", "112141", "120646",
        "112143", "112138", "110639", "110638", "110679",
        "174376", "174374", "174373", "174330", "174382",
        "174347", "174326", "174380", "174366", "174339",
        "174341", "174342", "145999", "174360", "174375",
        "174353", "174371", "174331", "174327", "174379",
        //没图标的↓
        "120646", "120646", "120646", "120646", "120646",
        "120646", "120646", "120646", "120646", "120646",
        // "", "", "", "", "",
    ];
    WingTxt: Array<string> = [//翅膀文字
        "火之翼", "水之翼", "闪耀之翼", "光之翼", "生命之翼",
        "圣光之翼", "火焰之翼", "蓝翎", "红翎", "黄翎",
        "红芒", "黑龙", "蜻蜓", "浪蝶", "小天使",
        "蓝芒", "诺", "蝙蝠", "大天使", "紫蝶",
        "蓝龙", "千叶蝶", "六翼", "粉天使", "神雀",
        "凤", "花蝶", "蓝天使", "灵蝶", "恶魔",
        //没图标的↓
        "蓝羽", "黄羽", "红羽", "绿羽", "紫羽",
        "黑羽", "紫灵", "墨灵", "蓝灵", "碧灵",
        // "", "", "", "", "",
    ];
    AvaIcon: Array<string> = [//变身icon
        "160436", "160437", "160438", "160439", "193823",
        "76737", "76737", "76737", "76737", "76737",
        "76737", "76737", "76737", "76737", "76737",
        "76737", "76737", "76737", "76737", "76737",
        // "", "", "", "", "",//76737
    ];
    AvaTxt: Array<string> = [//变身文字
        "樱花猫", "虎斑猫", "三花猫", "兔帽猫", "唐装熊猫",
        "粉猪", "小白狗", "小金毛", "斑点狗", "小白兔",
        "垂耳兔", "矮脚马", "变异三头狗", "头套白猫", "水手服猫",
        "无毛猫", "柴犬", "哈士奇", "萨摩耶", "粉衣猫",
        // "", "", "", "", "",
    ];
    AvaScene: Array<string> = [//变身id
        "159611", "160193", "160163", "160214", "174966",
        "159590", "159665", "159842", "159843", "160044",
        "160045", "174968", "174697", "160421", "160405",
        "160382", "160306", "160319", "160333", "160250",
        // "", "", "", "", "",
    ];
    //浮动提示
    fudongact = true
    async fudongui(fudong: mw.Widget, fdimg: mw.Widget, fdtxt: mw.Widget, word: string) {
        if (this.fudongact) {
            this.fudongact = false
            await TimeUtil.delaySecond(0.1)//等待1秒后继续执行
            let len = word.length
            fdimg.size = new mw.Vector2(len * 55, 100)
            fdimg.position = new mw.Vector2((1920 - len * 55) / 2, 0)
            let fdtxt2 = fdtxt as mw.TextBlock
            fdtxt2.text = word
            fudong.visibility = mw.SlateVisibility.HitTestInvisible//显示 可见不可交互
            for (let i = 25; i > 15; i--) {
                fudong.position = new mw.Vector2(0, i * 10)
                await TimeUtil.delaySecond(0.01)//等待1秒后继续执行
            }
            await TimeUtil.delaySecond(1.8)//等待1秒后继续执行
            fudong.visibility = mw.SlateVisibility.Hidden//隐藏
            this.fudongact = true
        }
    }
    //关闭UI
    uiClose(xui: mw.Widget) {
        xui.visibility = mw.SlateVisibility.Collapsed//隐藏
        Player.localPlayer.character.movementEnabled = true;//移动
    }
    //显示UI
    uiShow(xui: mw.Widget) {
        xui.visibility = mw.SlateVisibility.Visible//显示
        Player.localPlayer.character.movementEnabled = false;//移动
    }
    //换装
    changedress(w2: string) {
        let CharGuid = this.scenedress[Number(w2)]
        Player.asyncGetLocalPlayer().then((player: mw.Player) => {
            player.character.setDescription([CharGuid]);
            //将角色装扮同步给其他客户端
            player.character.syncDescription()
            this.avaAction = false
        })
    }
    //变身
    changeava(w2: string) {
        let CharGuid = this.AvaScene[Number(w2)]
        Player.asyncGetLocalPlayer().then(async (player: mw.Player) => {
            player.character.description.base.wholeBody = CharGuid;
            this.avaAction = false
            await TimeUtil.delaySecond(1)//等待1秒后继续执行
            this.avaAction = true
            this.avaloop()//宠物动作判断
            Event.dispatchToServer("客户端", "清除翅膀", "")//客户端给服务器发消息
        })
    }
    //下一关
    nextpro() {
        let Pdata = DataCenterC.getData(mydata)
        let player = Player.localPlayer
        GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
            let arr = go.getChildren()
            for (let child of arr) {
                let nowpro = Number(child.name)
                if ((Pdata.pro + 1) == nowpro) {
                    //改变玩家坐标
                    let pos = child.worldTransform.position.add(new mw.Vector(0, 0, 200))
                    player.character.worldTransform.position = (pos)
                    break
                }
            }
        })
    }
    //重生
    rebornpro() {
        let player = Player.localPlayer
        GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
            let arr = go.getChildren()
            for (let child of arr) {
                let nowpro = Number(child.name)
                if (nowpro == 0) {
                    //改变玩家坐标
                    let pos = child.worldTransform.position.add(new mw.Vector(0, 0, 200))
                    player.character.worldTransform.position = (pos)
                    break
                }
            }
        })
        Event.dispatchToServer("客户端", "重生", "")//客户端给服务器发消息
    }
    // 开始准备广告咯
    AdsForReward(word: string, w2: string) {
        if (word == "直接换装") {
            this.changedress(w2)
            return
        } else if (word == "花钱换装") {
            this.changedress(w2)
            Event.dispatchToServer("客户端", word, w2)//客户端给服务器发消息
            return
        } else if (word == "直接翅膀" || word == "花钱翅膀") {
            if (this.avaAction){
                Event.dispatchToLocal("浮动提示","四足动物不能使用")//客户端给服务器发消息
                return
            }
            Event.dispatchToServer("客户端", word, w2)//客户端给服务器发消息
            return
        } else if (word == "直接拖尾" || word == "花钱拖尾" || word == "花钱飞行") {
            Event.dispatchToServer("客户端", word, w2)//客户端给服务器发消息
            return
        } else if (word == "花钱加跳跃") {
            Player.localPlayer.character.maxJumpHeight += 100
            Event.dispatchToServer("客户端", word, w2)//客户端给服务器发消息
            return
        } else if (word == "花钱加速度") {
            Player.localPlayer.character.maxWalkSpeed += 200;
            Event.dispatchToServer("客户端", word, w2)//客户端给服务器发消息
            return
        } else if (word == "花钱下一关") {
            this.nextpro()
            Event.dispatchToServer("客户端", word, w2)//客户端给服务器发消息
            return
        } else if (word == "重生") {
            this.rebornpro()
            return
        } else if (word == "直接变身") {
            this.changeava(w2)
            return
        } else if (word == "花钱变身") {
            this.changeava(w2)
            Event.dispatchToServer("客户端", word, w2)//客户端给服务器发消息
            return
        }
        // return
        //---------------------------------------------------------
        mw.AdsService.isReady(mw.AdsType.Reward, (isReady: boolean) => {
            if (isReady) {
                if (word == "加跳跃") {
                    Player.localPlayer.character.maxJumpHeight += 100
                } else if (word == "翅膀") {
                    if (this.avaAction){
                        Event.dispatchToLocal("浮动提示","四足动物不能使用")//客户端给服务器发消息
                        return
                    }
                    Event.dispatchToServer("客户端", word, w2)//客户端给服务器发消息
                } else if ( word == "拖尾") {
                    Event.dispatchToServer("客户端", word, w2)//客户端给服务器发消息
                } else if (word == "加速度") {
                    Player.localPlayer.character.maxWalkSpeed += 200;
                } else if (word == "换装") {
                    this.changedress(w2)
                    Event.dispatchToServer("客户端", word, w2)//客户端给服务器发消息
                } else if (word == "变身") {
                    this.changeava(w2)
                    Event.dispatchToServer("客户端", word, w2)//客户端给服务器发消息
                } else if (word == "下一关") {
                    this.nextpro()
                }
                mw.AdsService.showAd(mw.AdsType.Reward, (isSuccess: boolean) => {
                    setTimeout(() => {
                        if (isSuccess) {
                            // 关闭界面看完了广告时的逻辑
                            if (word == "飞行") {
                                Event.dispatchToServer("客户端", word, w2)//客户端给服务器发消息
                            }
                        }
                    }, 500);
                })
            }
        })
    }

    //数字换算↓
    NumCon(num: number) {
        if (num < 1000) { return num.toString() }
        let ss: number = 0
        let dd: string = ""
        if (num >= Math.pow(10, 3) && num < Math.pow(10, 6)) {
            ss = num / Math.pow(10, 3)
            dd = "K"
        } else if (num >= Math.pow(10, 6) && num < Math.pow(10, 9)) {
            ss = num / Math.pow(10, 6)
            dd = "M"
        } else if (num >= Math.pow(10, 9) && num < Math.pow(10, 12)) {
            ss = num / Math.pow(10, 9)
            dd = "G"
        } else if (num >= Math.pow(10, 12) && num < Math.pow(10, 15)) {
            ss = num / Math.pow(10, 12)
            dd = "T"
        } else if (num >= Math.pow(10, 15) && num < Math.pow(10, 18)) {
            ss = num / Math.pow(10, 15)
            dd = "P"
        } else if (num >= Math.pow(10, 18) && num < Math.pow(10, 21)) {
            ss = num / Math.pow(10, 18)
            dd = "E"
        } else if (num >= Math.pow(10, 21) && num < Math.pow(10, 24)) {
            ss = num / Math.pow(10, 21)
            dd = "Z"
        } else if (num >= Math.pow(10, 24) && num < Math.pow(10, 27)) {
            ss = num / Math.pow(10, 24)
            dd = "Y"
        } else if (num >= Math.pow(10, 27) && num < Math.pow(10, 30)) {
            ss = num / Math.pow(10, 27)
            dd = "B"
        } else if (num >= Math.pow(10, 30) && num < Math.pow(10, 33)) {
            ss = num / Math.pow(10, 30)
            dd = "KB"
        } else if (num >= Math.pow(10, 33) && num < Math.pow(10, 36)) {
            ss = num / Math.pow(10, 33)
            dd = "MB"
        } else if (num >= Math.pow(10, 36) && num < Math.pow(10, 39)) {
            ss = num / Math.pow(10, 36)
            dd = "GB"
        } else if (num >= Math.pow(10, 39) && num < Math.pow(10, 42)) {
            ss = num / Math.pow(10, 39)
            dd = "TB"
        } else if (num >= Math.pow(10, 42) && num < Math.pow(10, 45)) {
            ss = num / Math.pow(10, 42)
            dd = "PB"
        } else if (num >= Math.pow(10, 45) && num < Math.pow(10, 48)) {
            ss = num / Math.pow(10, 45)
            dd = "EB"
        } else if (num >= Math.pow(10, 48) && num < Math.pow(10, 51)) {
            ss = num / Math.pow(10, 48)
            dd = "ZB"
        } else if (num >= Math.pow(10, 51) && num < Math.pow(10, 54)) {
            ss = num / Math.pow(10, 51)
            dd = "YB"
        } else if (num >= Math.pow(10, 54) && num < Math.pow(10, 57)) {
            ss = num / Math.pow(10, 54)
            dd = "BB"
        } else if (num >= Math.pow(10, 57) && num < Math.pow(10, 60)) {
            ss = num / Math.pow(10, 57)
            dd = "KBB"
        } else if (num >= Math.pow(10, 60) && num < Math.pow(10, 63)) {
            ss = num / Math.pow(10, 60)
            dd = "MBB"
        } else if (num >= Math.pow(10, 63)) {
            return "∞"
        }
        let res = String(ss)
        let res2 = res.substring(0, 3)
        let res3 = res2.substring(res2.length - 1)//最后一个字符
        if (res3 === ".") {
            return res.substring(0, 2) + dd
        } else {
            return res.substring(0, 3) + dd
        }
    }
    //时间换算
    TimeConversion(timenum: number) {
        let strSec = ""
        let sec = Math.floor(timenum % 60)
        if (sec < 10) {
            strSec = "0" + sec
        } else {
            strSec = String(sec)
        }
        let strMin = ""
        let min = Math.floor(timenum / 60 % 60)
        if (min < 10) {
            strMin = "0" + min
        } else {
            strMin = String(min)
        }
        let uiTxt = strMin + ":" + strSec
        return uiTxt
    }
}

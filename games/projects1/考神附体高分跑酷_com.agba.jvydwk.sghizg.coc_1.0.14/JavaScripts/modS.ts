import { GeneralManager, } from './Modified027Editor/ModifiedStaticAPI';
import { PlayerManagerExtesion, } from './Modified027Editor/ModifiedPlayer';
﻿import mydata from "./mydata";
import { modC } from "./modC";
/**
 * 模块S（服务端）
 */
export class modS extends ModuleS<modC, mydata>{
    guanqiaid = "0854BF23"//空锚点的id-关卡
    dressid = "3E71FEC7"//空锚点的id-换装
    chuansongid = "277BF522"//空锚点的id-传送门
    rebornid = "25AF5166"//空锚点的id-重生
    hidenameid = "26A2FC77"//空锚点的id-角色头顶名字-换装角色
    onStart(): void {
        //玩家进入房间时的事件
        // Player.onPlayerJoin.add((player: mw.Player) => {
        // })
        //玩家离开房间时的事件
        Player.onPlayerLeave.add((player: mw.Player) => {
            let uid = player.userId
            //清空玩家身上的拖尾特效
            if (this.charTails.get(uid)) {
                EffectService.stop(this.charTails.get(uid))
                this.charTails.delete(uid);
            }
            //清空玩家身上的翅膀特效
            if (this.charWings.get(uid)) {
                EffectService.stop(this.charWings.get(uid))
                this.charWings.delete(uid);
            }
        })
        //收到客户端事件
        Event.addClientListener("客户端", (player: mw.Player, word: string, name: string, tnum?: number) => {//服务器收到客户端发来的消息
            this.kehuduan(player, word, name, tnum)
        })
        //收到测试按钮事件
        Event.addClientListener("测试", (player: mw.Player, word: string, tword?: string) => {//服务器收到客户端发来的消息
            this.testbtn(player, word, tword)
        })
        //注册换装触发器
        this.tipstrigger(this.dressid, "换装")
        //注册传送触发器
        this.tipstrigger(this.chuansongid, "下一关")
        //注册重生触发器
        this.tipstrigger(this.rebornid, "重生")
        //注册关卡触发器
        this.proTriggerEnter()
        //注册隐藏npc头顶的名字
        this.hidename()


    }
    //注册关卡触发器
    proTriggerEnter() {
        GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
            let arr = go.getChildren()
            for (let child of arr) {
                //为触发器绑定 有物体进入时 会触发的监听事件
                let trigger = child as mw.Trigger
                trigger.onEnter.add(async (other) => {
                    //这里判断一下进入区域的物体是不是一名角色
                    if (PlayerManagerExtesion.isCharacter(other)) {
                        let character = other as mw.Character//是的话，转成角色类型
                        let player = character.player
                        //获取进度，只有大于当前才保存。
                        let Pdata = DataCenterS.getData(player, mydata)
                        let nowpro = Number(trigger.name)
                        if (Pdata.pro < nowpro) {
                            Pdata.change("pro", nowpro, 0)//替换
                            Pdata.change("cup", 1, 1)
                            Pdata.change("score", Pdata.reborn * 5 + 5, 1)
                            Event.dispatchToClient(player, "刷新关卡")//服务器发送给单个客户端
                        }
                    }
                })
            }
        })
    }
    //注册换装触发器//注册传送触发器
    tipstrigger(sid: string, word: string) {
        GameObject.asyncFindGameObjectById(sid).then(go => {
            let arr = go.getChildren()
            for (let child of arr) {
                //为触发器绑定 有物体进入时 会触发的监听事件
                let trigger = child as mw.Trigger
                trigger.onEnter.add((other) => {
                    //这里判断一下进入区域的物体是不是一名角色
                    if (PlayerManagerExtesion.isCharacter(other)) {
                        let character = other as mw.Character//是的话，转成角色类型
                        let player = character.player
                        if (word == "换装") {
                            const Pdata = this.getPlayerData(player);
                            if (!Pdata.dressunlock) {
                                console.log("空")
                                return
                            }
                            //先判断解锁了没，如果解锁了，提示是否使用
                            let lok = Pdata.dressunlock.indexOf(Number(trigger.name));
                            if (lok == -1) {
                                //如果没解锁，看钱够不够，如果够，提示是否花钱购买
                                if (Pdata.cup < 10) {
                                    //如果钱不够，提示看广告可以获得
                                    Event.dispatchToClient(player, "提示面板", "换装", trigger.name)//服务器发送给单个客户端
                                } else {
                                    //提示是否花钱
                                    Event.dispatchToClient(player, "提示面板", "花钱换装", trigger.name)//服务器发送给单个客户端
                                }
                            } else {
                                Event.dispatchToClient(player, "提示面板", "直接换装", trigger.name)//服务器发送给单个客户端
                            }
                            return
                        } else if (word == "下一关") {
                            const Pdata = this.getPlayerData(player);
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
                            return
                        }
                        Event.dispatchToClient(player, "提示面板", word, trigger.name)//服务器发送给单个客户端
                    }
                })
            }
        })
    }
    //注册隐藏npc头顶的名字
    hidename() {
        GameObject.asyncFindGameObjectById(this.hidenameid).then(go => {
            let arr = go.getChildren()
            for (let child of arr) {
                if (child instanceof mw.Pawn) {
                    let character = child as mw.Character;
                    character.displayName = "";
                }
            }
        })
    }
    //飞行
    async flying(player: mw.Player) {
        player.character.switchToFlying();
        for (let i = 10; i > -1; i--) {
            Event.dispatchToClient(player, "飞行倒计时", i)//服务器发送给单个客户端
            await TimeUtil.delaySecond(1)//等待1秒后继续执行
        }
        player.character.switchToWalking();
    }

    //收到客户端事件
    async kehuduan(player: mw.Player, word: string, name: string, tnum?: number) {
        let Pdata = DataCenterS.getData(player, mydata)//获取数据
        if (word == "重生") {
            setTimeout(() => {
                Pdata.change("pro", 0, 0)
                Pdata.change("reborn", 1, 1)
                Event.dispatchToClient(player, "刷新关卡")//服务器发送给单个客户端
            }, 900);
        } else if (word == "回城") {
            this.backhome(player)
        } else if (word == "换装c") {
            if (!Pdata.dressunlock) {
                console.log("空")
                return
            }
            //先判断解锁了没，如果解锁了，提示是否使用
            let lok = Pdata.dressunlock.indexOf(Number(name));
            if (lok == -1) {
                //如果没解锁，看钱够不够，如果够，提示是否花钱购买
                if (Pdata.cup < 10) {
                    //如果钱不够，提示看广告可以获得
                    Event.dispatchToClient(player, "提示面板", "换装", name)//服务器发送给单个客户端
                } else {
                    //提示是否花钱
                    Event.dispatchToClient(player, "提示面板", "花钱换装", name)//服务器发送给单个客户端
                }
            } else {
                Event.dispatchToClient(player, "提示面板", "直接换装", name)//服务器发送给单个客户端
            }
        } else if (word === "拖尾c") {
            if (!Pdata.tailunlock) {
                console.log("空")
                return
            }
            //先判断解锁了没，如果解锁了，提示是否使用
            let lok = Pdata.tailunlock.indexOf(Number(name));
            if (lok == -1) {
                //如果没解锁，看钱够不够，如果够，提示是否花钱购买
                if (Pdata.cup < 10) {
                    //如果钱不够，提示看广告可以获得
                    Event.dispatchToClient(player, "提示面板", "拖尾", name)//服务器发送给单个客户端
                } else {
                    //提示是否花钱
                    Event.dispatchToClient(player, "提示面板", "花钱拖尾", name)//服务器发送给单个客户端
                }
            } else {
                Event.dispatchToClient(player, "提示面板", "直接拖尾", name)//服务器发送给单个客户端
            }
        } else if (word === "翅膀c") {
            if (!Pdata.wingunlock) {
                console.log("空")
                return
            }
            //先判断解锁了没，如果解锁了，提示是否使用
            let lok = Pdata.wingunlock.indexOf(Number(name));
            if (lok == -1) {
                //如果没解锁，看钱够不够，如果够，提示是否花钱购买
                if (Pdata.cup < 10) {
                    //如果钱不够，提示看广告可以获得
                    Event.dispatchToClient(player, "提示面板", "翅膀", name)//服务器发送给单个客户端
                } else {
                    //提示是否花钱
                    Event.dispatchToClient(player, "提示面板", "花钱翅膀", name)//服务器发送给单个客户端
                }
            } else {
                Event.dispatchToClient(player, "提示面板", "直接翅膀", name)//服务器发送给单个客户端
            }
        } else if (word === "变身c") {
            if (!Pdata.avaunlock) {
                console.log("空")
                return
            }
            //先判断解锁了没，如果解锁了，提示是否使用
            let lok = Pdata.avaunlock.indexOf(Number(name));
            if (lok == -1) {
                //如果没解锁，看钱够不够，如果够，提示是否花钱购买
                if (Pdata.cup < 10) {
                    //如果钱不够，提示看广告可以获得
                    Event.dispatchToClient(player, "提示面板", "变身", name)//服务器发送给单个客户端
                } else {
                    //提示是否花钱
                    Event.dispatchToClient(player, "提示面板", "花钱变身", name)//服务器发送给单个客户端
                }
            } else {
                Event.dispatchToClient(player, "提示面板", "直接变身", name)//服务器发送给单个客户端
            }
        } else if (word == "花钱换装") {
            Pdata.change("cup", -10, 1)//扣钱
            Pdata.changelock("换装", Number(name), 1)//存解锁
            Event.dispatchToClient(player, "刷新商店标签", "换装", Number(name))//服务器发送给单个客户端
        } else if (word == "换装") {
            Pdata.changelock(word, Number(name), 1)//存解锁
            Event.dispatchToClient(player, "刷新商店标签", "换装", Number(name))//服务器发送给单个客户端
        } else if (word === "直接拖尾") {
            this.tuoweiS(player, name)
        } else if (word === "花钱拖尾") {
            Pdata.change("cup", -10, 1)//扣钱
            this.tuoweiS(player, name)//给拖尾
            Pdata.changelock("拖尾", Number(name), 1)//存解锁
            Event.dispatchToClient(player, "刷新商店标签", "拖尾", Number(name))//服务器发送给单个客户端
        } else if (word === "拖尾") {
            this.tuoweiS(player, name)
            Pdata.changelock(word, Number(name), 1)//存解锁
            Event.dispatchToClient(player, "刷新商店标签", "拖尾", Number(name))//服务器发送给单个客户端
        } else if (word === "直接翅膀") {
            this.chibangS(player, name)
        } else if (word === "花钱翅膀") {
            Pdata.change("cup", -10, 1)//扣钱
            this.chibangS(player, name)//给
            Pdata.changelock("翅膀", Number(name), 1)//存解锁
            Event.dispatchToClient(player, "刷新商店标签", "翅膀", Number(name))//服务器发送给单个客户端
        } else if (word === "翅膀") {
            this.chibangS(player, name)
            Pdata.changelock(word, Number(name), 1)//存解锁
            Event.dispatchToClient(player, "刷新商店标签", "翅膀", Number(name))//服务器发送给单个客户端
        } else if (word === "花钱变身") {
            Pdata.change("cup", -10, 1)//扣钱
            Pdata.changelock("变身", Number(name), 1)//存解锁
            Event.dispatchToClient(player, "刷新商店标签", "变身", Number(name))//服务器发送给单个客户端
        } else if (word === "变身") {
            Pdata.changelock(word, Number(name), 1)//存解锁
            Event.dispatchToClient(player, "刷新商店标签", "变身", Number(name))//服务器发送给单个客户端
        } else if (word === "加跳跃c") {
            //看钱够不够，如果够，提示是否花钱购买
            if (Pdata.cup < 10) {
                //如果钱不够，提示看广告可以获得
                Event.dispatchToClient(player, "提示面板", "加跳跃", name)//服务器发送给单个客户端
                // Event.dispatchToClient(player, "浮动提示", '需要 10 奖杯')//服务器发送给单个客户端
            } else {
                //提示是否花钱
                Event.dispatchToClient(player, "提示面板", "花钱加跳跃", name)//服务器发送给单个客户端
            }
        } else if (word === "飞行c") {
            //看钱够不够，如果够，提示是否花钱购买
            if (Pdata.cup < 10) {
                //如果钱不够，提示看广告可以获得
                Event.dispatchToClient(player, "提示面板", "飞行", name)//服务器发送给单个客户端
                // Event.dispatchToClient(player, "浮动提示", '需要 10 奖杯')//服务器发送给单个客户端
            } else {
                //提示是否花钱
                Event.dispatchToClient(player, "提示面板", "花钱飞行", name)//服务器发送给单个客户端
            }
        } else if (word === "加速度c") {
            //看钱够不够，如果够，提示是否花钱购买
            if (Pdata.cup < 10) {
                //如果钱不够，提示看广告可以获得
                Event.dispatchToClient(player, "提示面板", "加速度", name)//服务器发送给单个客户端
                // Event.dispatchToClient(player, "浮动提示", '需要 10 奖杯')//服务器发送给单个客户端
            } else {
                //提示是否花钱
                Event.dispatchToClient(player, "提示面板", "花钱加速度", name)//服务器发送给单个客户端
            }
        } else if (word == "下一关") {
            if (Pdata.pro < 165) {
                //看钱够不够，如果够，提示是否花钱购买
                if (Pdata.cup < 10) {
                    //如果钱不够，提示看广告可以获得
                    Event.dispatchToClient(player, "提示面板", "下一关", name)//服务器发送给单个客户端
                    // Event.dispatchToClient(player, "浮动提示", '需要 10 奖杯')//服务器发送给单个客户端
                } else {
                    //提示是否花钱
                    Event.dispatchToClient(player, "提示面板", "花钱下一关", name)//服务器发送给单个客户端
                }
            }
        } else if (word === "花钱加跳跃" || word === "花钱加速度" || word === "花钱下一关") {
            Pdata.change("cup", -10, 1)//扣钱
        } else if (word == "飞行") {
            this.flying(player)
        } else if (word == "花钱飞行") {
            Pdata.change("cup", -10, 1)//扣钱
            this.flying(player)
        } else if (word == "在线奖励") {
            let num = 1
            Pdata.change("cup", num, 1)//扣钱
            Event.dispatchToClient(player, "浮动提示", '奖杯 + ' + num)//服务器发送给单个客户端
        } else if (word === "清除翅膀") {
            this.chibangClear(player)
        }
        Event.dispatchToClient(player, "刷新关卡")//服务器发送给单个客户端

    }
    //回城
    backhome(player: mw.Player) {
        let Pdata = DataCenterS.getData(player, mydata)
        GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
            let arr = go.getChildren()
            for (let child of arr) {
                let nowpro = Number(child.name)
                if (Pdata.pro == nowpro) {
                    //改变玩家坐标
                    let pos = child.worldTransform.position.add(new mw.Vector(0, 0, 200))
                    player.character.worldTransform.position = (pos)
                    player.character.movementEnabled = true;//移动
                    player.character.jumpEnabled = true;//跳跃
                    break
                }
            }
        })
    }

    //收到测试按钮事件
    testact = true
    testbtn(player: mw.Player, word: string, tword?: string) {
        if (this.testact) {
            this.testact = false
            let Pdata = DataCenterS.getData(player, mydata)//获取数据
            if (word === "新手") {
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
                setTimeout(() => {
                    Pdata.change("pro", 0, 0)
                    Pdata.change("reborn", 0, 0)
                    Pdata.change("cup", 0, 0)
                    Pdata.change("score", 0, 0)
                    Pdata.changelock("换装", 0, 0)
                    Pdata.changelock("拖尾", 0, 0)
                    Pdata.changelock("翅膀", 0, 0)
                    player.character.gravityScale = 1
                    player.character.maxWalkSpeed = 450;
                    player.character.maxJumpHeight = 150
                    Event.dispatchToClient(player, "刷新关卡")//服务器发送给单个客户端
                }, 900);
            } else if (word === "下一关") {
                Pdata.change("pro", Pdata.pro + 1, 0)
                this.backhome(player)
            } else if (word === "上一关") {
                GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
                    let arr = go.getChildren()
                    for (let child of arr) {
                        let nowpro = Number(child.name)
                        if ((Pdata.pro - 1) == nowpro) {
                            //改变玩家坐标
                            let pos = child.worldTransform.position.add(new mw.Vector(0, 0, 200))
                            player.character.worldTransform.position = (pos)
                            break
                        }
                    }
                })
                setTimeout(() => {
                    if ((Pdata.pro - 1) >= 0) {
                        Pdata.change("pro", Pdata.pro - 1, 0)
                        Event.dispatchToClient(player, "刷新关卡")//服务器发送给单个客户端
                    }
                }, 900);
            } else if (word === "跳关") {
                let nn = Number(tword)
                GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
                    let arr = go.getChildren()
                    for (let child of arr) {
                        let nowpro = Number(child.name)
                        if (nn == nowpro) {
                            //改变玩家坐标
                            let pos = child.worldTransform.position.add(new mw.Vector(0, 0, 200))
                            player.character.worldTransform.position = (pos)
                            break
                        }
                    }
                })
                setTimeout(() => {
                    if (nn >= 0) {
                        Pdata.change("pro", nn, 0)
                        Event.dispatchToClient(player, "刷新关卡")//服务器发送给单个客户端
                    }
                }, 900);
            } else if (word === "加成") {
                player.character.switchToFlying();
                // player.character.maxWalkSpeed = 1200;
                // player.character.gravityScale = 0.8
                // player.character.maxJumpHeight = 250
            } else if (word === "B") {
                player.character.switchToWalking();
                Pdata.change("cup", 100, 0)
            }
            Event.dispatchToClient(player, "刷新关卡")//服务器发送给单个客户端
            this.testact = true
        }


    }
    //拖尾
    public charTails: Map<string, number> = new Map();
    scenetail: Array<string> = [//拖尾
        "145512", "145503", "145504", "145507", "145508",
        "145509", "145499", "145500", "145502", "145506",
        "145510", "145511", "145493", "145494", "145495",
        "145496", "145497", "145498", "145513", "145492",
        "151527",  //有图标的
        //没图标的↓
        "186344", "192273", "193220", "153603", "153613",
        "88824", "4399", "27392", "14317", "142959",
        "14318", "14319", "27447", "88441", "88442",
        "88443", "88444", "88021", "81694", "128512",
        "128513", "128514", "128515", "128516", "128517",
        "128518", "128521", "142933", "142957",
    ];
    tuoweiS(player: mw.Player, name: string) {
        let uid = player.userId
        //清空玩家身上的拖尾特效
        if (this.charTails.get(uid)) {
            EffectService.stop(this.charTails.get(uid))
            this.charTails.delete(uid);
        }
        let TailGuid = this.scenetail[Number(name)]//拖尾的id
        //在玩家身上创建一个拖尾
        let effid = GeneralManager.rpcPlayEffectOnPlayer(TailGuid, player, 12, 0)//12背部
        this.charTails.set(uid, effid);//加入map
    }
    //翅膀
    public charWings: Map<string, number> = new Map();
    scenewing: Array<string> = [//翅膀
        "42804", "42818", "42816", "42821", "42805",
        "42812", "42830", "42814", "42815", "42826",
        "136957", "136958", "136959", "136960", "136962",
        "136963", "136964", "136966", "145902", "145903",
        "145904", "145907", "145909", "145910", "145911",
        "145913", "177589", "145906", "145908", "145912",
        //没图标的↓
        "42803", "42806", "42808", "42810", "42819",
        "42820", "42807", "42809", "42811", "42813",
        // "", "", "", "", "",
        // "", "", "", "", "",
    ];
    Wingoffset: Array<mw.Vector> = [//翅膀偏移
        new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0),
        new mw.Vector(0, 0, -20), new mw.Vector(0, 0, -20), new mw.Vector(0, 0, 50), new mw.Vector(0, 0, 50), new mw.Vector(0, 0, 50),
        new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0),
        new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 15), new mw.Vector(0, 0, 10),
        new mw.Vector(0, 0, 5), new mw.Vector(0, 0, 5), new mw.Vector(0, 0, 5), new mw.Vector(0, 0, 10), new mw.Vector(0, 0, 0),
        new mw.Vector(0, 0, -5), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, -20), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 15),
        //没图标的↓
        new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0),
        new mw.Vector(0, 0, 0), new mw.Vector(0, 0, -20), new mw.Vector(0, 0, -20), new mw.Vector(0, 0, -20), new mw.Vector(0, 0, -20),
    ];
    Wingrotation: Array<mw.Rotation> = [//翅膀旋转
        new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90),
        new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90),

        new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180),
        new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180),
        new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 90),
        new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90),
        //没图标的↓
        new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90),
        new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90),
    ];
    Wingscale: Array<mw.Vector> = [//翅膀缩放
        new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1),
        new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(2, 2, 2), new mw.Vector(2, 2, 2), new mw.Vector(2, 2, 2),
        new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1),
        new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(2, 2, 2), new mw.Vector(1, 1, 1),
        new mw.Vector(2, 2, 2), new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(2, 2, 2), new mw.Vector(1.5, 1.5, 1.5),
        new mw.Vector(2, 2, 2), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1),
        //没图标的↓
        new mw.Vector(2, 2, 2), new mw.Vector(2, 2, 2), new mw.Vector(2, 2, 2), new mw.Vector(2, 2, 2), new mw.Vector(2, 2, 2),
        new mw.Vector(2, 2, 2), new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(1.5, 1.5, 1.5),
    ];
    chibangS(player: mw.Player, name: string) {
        let uid = player.userId
        //清空玩家身上的翅膀特效
        if (this.charWings.get(uid)) {
            EffectService.stop(this.charWings.get(uid))
            this.charWings.delete(uid);
        }
        let wingGuid = this.scenewing[Number(name)]//翅膀的id
        //在玩家身上创建一个翅膀
        let effid = GeneralManager.rpcPlayEffectOnPlayer(wingGuid, player, 12, 0, this.Wingoffset[Number(name)], this.Wingrotation[Number(name)], this.Wingscale[Number(name)])//12背部
        this.charWings.set(uid, effid);//加入map
    }
    chibangClear(player: mw.Player) {
        let uid = player.userId
        //清空玩家身上的翅膀特效
        if (this.charWings.get(uid)) {
            EffectService.stop(this.charWings.get(uid))
            this.charWings.delete(uid);
        }
    }

}
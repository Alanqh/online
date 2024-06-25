import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
﻿import { RankData } from "./RankData";
import { RankUI } from "./RankUI";

enum Order {
    /**
     * 升序
     */
    Ascending,
    /**
     * 降序
     */
    Descending
}
export namespace WorldRankService {
    /**
     * 排行实体，不可更改
     */
    export const _ranks: WorldRank[] = [];
    /**
     * 更新某个排行数据
     * @timelife 双端都可调用
     * @param key 排行通讯Key
     * @param player 玩家
     * @param data 数据
     */
    export function rank(key: string, player: mw.Player, data: number) {
        const rank = getRank(key);
        if (rank) {
            rank.updateData(player, data);
        }
    }
    function getRank(key: string) {
        return _ranks.find(r => r.channel == key);
    }
    if (SystemUtil.isServer()) {
        DataStorage.setTemporaryStorage(SystemUtil.isPIE);
    }
}
@Component
export default class WorldRank extends mw.Script {

    @mw.Property({ displayName: "排行字段名", group: "扩展属性" })
    private rankTitle: string = "排名";
    @mw.Property({ displayName: "玩家字段名", group: "扩展属性" })
    private nameTitle: string = "玩家";
    @mw.Property({ displayName: "数据字段名", group: "扩展属性" })
    private dataTitle: string = "积分";

    @mw.Property({ displayName: "世界UI(不可更改)", capture: true, group: "不可编辑" })
    private worldUIGuid: string = "";

    @mw.Property({ displayName: "排行规则", group: "扩展属性", enumType: Order })
    private order: Order = Order.Descending;
    @mw.Property({ displayName: "排行关键字,WorldRankService.rank中的key属性", group: "扩展属性" })
    public channel: string = "Score";
    @mw.Property({ displayName: "长数字模式", group: "扩展属性" })
    private isLongNum: boolean = false;

    private rankUI: RankUI;
    private data: RankData[] = [];
    private userId: string = "";
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        WorldRankService._ranks.push(this);
        if (this.isRunningClient()) {
            Player.asyncGetLocalPlayer().then(player => {
                // 获取玩家ID,这里需要等待
                this.userId = player.userId;
                this.requestRank(player);
            });
        }
    }


    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }
    /**
     * -------------------------------client-----------------
     */
    @RemoteFunction(mw.Client)
    private onRequestData(player: mw.Player, data: RankData[]) {
        GameObject.asyncFindGameObjectById(this.worldUIGuid).then((widget: mw.UIWidget) => {
            this.rankUI = new RankUI(widget.getTargetUIWidget());
            this.rankUI.updateRankTitle(this.rankTitle, this.nameTitle, this.dataTitle);
            this.boardcastData(data);
        });
    }

    /**
     * 广播数据
     * @param data 
     */
    @RemoteFunction(mw.Client, mw.Multicast)
    private boardcastData(data: RankData[]) {
        this.data.length = 0;
        data && this.data.push(...data);
        const inter = setInterval(() => {
            if (this.rankUI) {
                clearInterval(inter);
                this.rankUI.updateData(this.rankUI.canvas, this.data, this.isLongNum, this.userId);
            }
        }, 100);
    }
    /**
     * -------------------------------server-----------------
     *  */
    /**
     * 更新数据
     * @param player 
     * @param data 
     */
    @RemoteFunction(mw.Server)
    public updateData(player: mw.Player, data: number) {
        //获取最新数据防止覆盖
        this.sortData(player, data) && this.updateRemoteData(player, data, (isSuccess: boolean) => {
            this.boardcastData(this.data);
        });
    }

    /**
     * 监听数据是否改变
     */
    private sortData(player: mw.Player, data: number) {
        const userId = player.userId;
        let isChanged = this.data.length < 10;
        const playerData = this.data.find(d => d.userId == userId);
        if (playerData) {
            if (this.order == Order.Ascending) {
                if (playerData.data > data) {
                    playerData.data = data;
                    isChanged = true;
                }
            } else {
                if (playerData.data < data) {
                    playerData.data = data;
                    isChanged = true;
                }
            }
        } else if (isChanged) {
            //如果数据不足10条，直接添加
            this.data.push({ userId: userId, name: player.character.displayName, data: data });
        } else {
            //判断是否需要替换
            const lastData = this.data[this.data.length - 1];
            if (this.order == Order.Ascending) {
                if (lastData.data > data) {
                    isChanged = true;
                }
            } else {
                if (lastData.data < data) {
                    isChanged = true;
                }
            }
            if (isChanged) {
                lastData.userId = userId;
                lastData.name = player.character.displayName;
                lastData.data = data;
            }
        }
        if (isChanged) {
            //排序
            this.data.sort((a, b) => {
                if (this.order == Order.Ascending) {
                    return a.data - b.data;
                } else {
                    return b.data - a.data;
                }
            });
        }
        return isChanged;
    }
    /**
     * 更新远端数据
     * @param player 
     * @param data 
     */
    private updateRemoteData(player: mw.Player, data: number, callback: (success: boolean) => void) {
        GeneralManager.asyncRpcGetData(`WorldRank.${this.channel}`).then(remoteData => {
            remoteData && (this.data = remoteData);
            const isChanged = this.sortData(player, data);
            if (isChanged) {
                //更新数据
                DataStorage.asyncSetData(`WorldRank.${this.channel}`, this.data).then((code) => {
                    callback(code == mw.DataStorageResultCode.Success);
                }).catch(() => {
                    callback(false);
                });
            }
        }).catch(() => {
            callback(false);
        });

    }

    /**
     * 请求排行
     */
    @RemoteFunction(mw.Server)
    private requestRank(player: mw.Player) {
        if (this.data.length > 0) {
            this.onRequestData(player, this.data);
        } else {
            GeneralManager.asyncRpcGetData(`WorldRank.${this.channel}`).then(data => {
                if (data) {
                    this.data.length = 0;
                    this.data.push(...data);
                }
                this.onRequestData(player, data);
            });
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}
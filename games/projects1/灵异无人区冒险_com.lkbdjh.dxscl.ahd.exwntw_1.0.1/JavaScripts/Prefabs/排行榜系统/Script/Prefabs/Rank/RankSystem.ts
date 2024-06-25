/*

 * @Date: 2023-03-15 16:40:42

 * @LastEditTime: 2023-07-19 10:28:38
 * @Description: file content
 * @FilePath: \commonprefab\JavaScripts\Prefabs\排行榜系统\Script\Prefabs\Rank\RankSystem.ts
 */
import { PrefabEvent } from "../../../../../prefabEvent/PrefabEvent"; import { PrefabReport } from "../../../../../prefabEvent/PrefabReport";
;
import { MapEx } from "../Tools/MapEx";
import RankUI from "./RankUI";

/*
 * @Description: Description
 */
export abstract class RankSystemPreDef extends mw.Script {

    protected abstract initRankData(playerId: number);

}

export class RankPlayerInfo {

    constructor(public senderGuid: string, public name: string, public score: number) {

    }

}

export abstract class RankSystemClient extends RankSystemPreDef {

    @mw.Property({ displayName: "默认打开UI", group: "排行榜配置" })
    public showUI: boolean = true;

    protected _allInfos: MapEx.MapExClass<RankPlayerInfo[]> = {};

    private _playerNames: Map<string, string> = new Map();

    protected async onStart() {

        super.onStart();

        if (mw.SystemUtil.isClient()) {

            let ui = mw.UIService.getUI(RankUI);

            if (this.showUI) {
                mw.UIService.showUI(ui);
                console.log("显示UI");
            }

            let player = await Player.asyncGetLocalPlayer();
            this.initRankData(player.playerId);

            PrefabEvent.PrefabEvtRank.onOpenRank(() => {
                var rankUI = mw.UIService.getUI(RankUI);
                if (rankUI.visible) {
                    mw.UIService.hide(RankUI);
                }
                else {
                    mw.UIService.show(RankUI);
                }
            })

            PrefabEvent.PrefabEvtRank.onSetRankData(async (senderGuid: string, name: string, score: number, typeName: string) => {

                if (!MapEx.has(this._allInfos, typeName)) {
                    MapEx.set(this._allInfos, typeName, []);
                }

                let infos = MapEx.get(this._allInfos, typeName);

                let info = infos.find(e => {
                    return e.senderGuid == senderGuid;
                });

                if (info == null) {
                    let nikeName = name;
                    if (this._playerNames.has(senderGuid)) {
                        nikeName = this._playerNames.get(senderGuid);
                    } else {
                        let go = await GameObject.asyncFindGameObjectById(senderGuid) as mw.Character;
                        nikeName = (go.displayName != nikeName) ? go.displayName : nikeName;
                    }
                    info = new RankPlayerInfo(
                        senderGuid, nikeName, score
                    );
                    infos.push(info);
                }
                info.score = score;

                infos = infos.sort((a, b) => {
                    return b.score - a.score;
                })

                MapEx.set(this._allInfos, typeName, infos);

                mw.UIService.getUI(RankUI).UpdateData(this._allInfos);

            })

            PrefabEvent.PrefabEvtRank.onDelRankData((senderGuid: string) => {

                MapEx.forEach(this._allInfos, (k, e) => {

                    let res = [];
                    e.forEach((e, i, arrs) => {
                        if (e.senderGuid == senderGuid) return;
                        res.push(e);
                    })
                    MapEx.set(this._allInfos, k, res);

                })

                mw.UIService.getUI(RankUI).UpdateData(this._allInfos);

            })

            PrefabEvent.PrefabEvtPlayerInfo.onSetPlayerInfo((senderGuid: string, targetGuid: string, name: string, type: PrefabEvent.PlayerInfoType) => {
                if (type == PrefabEvent.PlayerInfoType.Name) {
                    if (!this._playerNames.has(senderGuid)) {
                        this._playerNames.set(senderGuid, name);
                    }
                    if (!MapEx.isNull(this._allInfos)) {
                        MapEx.forEach(this._allInfos, (key, element) => {
                            element.forEach((e) => {
                                if (e.senderGuid == senderGuid) {
                                    e.name = name;
                                }
                            });
                        });
                        mw.UIService.getUI(RankUI).UpdateData(this._allInfos);
                    }
                }
            });
        }
    }

    @RemoteFunction(mw.Client)
    protected syncRankPlayerInfo(player: mw.Player, keys: string[], lengthes: number[], senderGuid: string[], name: string[], score: number[]) {//infos: MapEx.MapExClass<RankPlayerInfo[]>) {

        let infos = {};
        for (let index = 0; index < keys.length; index++) {
            let res = [];
            MapEx.set(infos, keys[index], res);
            for (let j = 0; j < lengthes[index]; j++) {
                let info = new RankPlayerInfo(
                    senderGuid[j], name[j], score[j]
                );
                res.push(info);
            }
        }
        this._allInfos = infos;

        mw.UIService.getUI(RankUI).UpdateData(this._allInfos);

    }

    onUpdate(dt: number) {

        super.onUpdate(dt);

        if (mw.SystemUtil.isClient()) {

        }

    }

}

@Component
export default class RankSystemServer extends RankSystemClient {

    @RemoteFunction(mw.Server)
    protected initRankData(playerId: number) {
        let keys = [];
        let lengthes = [];
        let senderGuid = [];
        let name = [];
        let score = [];
        MapEx.forEach(this._allInfos, (k, v) => {
            keys.push(k);
            lengthes.push(v.length);
            for (let index = 0; index < v.length; index++) {
                const element = v[index];
                senderGuid.push(element.senderGuid);
                score.push(element.score);
                name.push(element.name);
            }
        })
        this.syncRankPlayerInfo(Player.getPlayer(playerId), keys, lengthes, senderGuid, name, score);
    }

    @PrefabReport(14)
    protected async onStart() {

        super.onStart();

        if (mw.SystemUtil.isServer()) {

            Player.onPlayerLeave.add((player: mw.Player) => {
                PrefabEvent.PrefabEvtRank.delRankData(player.character.gameObjectId);
            })

            PrefabEvent.PrefabEvtRank.onDelRankData((senderGuid: string) => {

                MapEx.forEach(this._allInfos, (k, e) => {

                    let res = [];
                    e.forEach((e, i, arrs) => {
                        if (e.senderGuid == senderGuid) return;
                        res.push(e);
                    })
                    MapEx.set(this._allInfos, k, res);

                })

            })

            PrefabEvent.PrefabEvtRank.onSetRankData((senderGuid: string, name: string, score: number, typeName: string) => {

                if (!MapEx.has(this._allInfos, typeName)) {
                    MapEx.set(this._allInfos, typeName, []);
                }

                let infos = MapEx.get(this._allInfos, typeName);

                let info = infos.find(e => {
                    return e.senderGuid == senderGuid;
                });

                if (info == null) {
                    info = new RankPlayerInfo(
                        senderGuid, name, score
                    );
                    infos.push(info);
                }
                info.score = score;

                infos = infos.sort((a, b) => {
                    return b.score - a.score;
                })

                MapEx.set(this._allInfos, typeName, infos);

            })

            PrefabEvent.PrefabEvtPlayerInfo.onSetPlayerInfo((senderGuid: string, targetGuid: string, name: string, type: PrefabEvent.PlayerInfoType) => {
                if (type == PrefabEvent.PlayerInfoType.Name) {
                    if (!MapEx.isNull(this._allInfos)) {
                        MapEx.forEach(this._allInfos, (key, element) => {
                            element.forEach((e) => {
                                if (e.senderGuid == senderGuid) {
                                    e.name = name;
                                }
                            });
                        });
                    }
                }
            });
        }
    }

    onUpdate(dt: number) {

        super.onUpdate(dt);

        if (mw.SystemUtil.isServer()) {

        }

    }

}
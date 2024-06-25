import { AddGMCommand, GM, GMBasePanel } from 'module_gm';
import { GameConfig } from '../../config/GameConfig';
import { InGameStatus } from '../../const/Enum';
import { GMEventS2S } from '../../const/GameCommonEvent';
import { GlobalData } from '../../const/GlobalData';
import GMHUD_Generate from '../../ui-generate/gmModule/GMHUD_generate';
import GMItem_Generate from '../../ui-generate/gmModule/GMItem_generate';
import GameEnvCfgUtils from '../../utils/GameEnvCfgUtils';
import { default as P_Tips, default as Tips } from '../../utils/P_Tips';
import GamingModuleC from '../gamingModule/GamingModuleC';
import GamingModuleS from '../gamingModule/GamingModuleS';
import { GameToHallDataManager, JumpGameHelper } from '../jumpGame/JumpGameHelper';
import { PetModuleC } from '../petModule/PetModuleC';
import { SuitInfo } from '../petModule/PetModuleData';


export class P_GM extends GMBasePanel<GMHUD_Generate, GMItem_Generate> {

    constructor() {
        super(GMHUD_Generate, GMItem_Generate);

    }
    show(): void {
        mw.UIService.showUI(this["_view"], mw.UILayerTop)
    }

}
export class GmModuleC extends ModuleC<GmModuleS, null> {

    onStart(): void {

        GM.checkAuthority((showGM) => {
            if (showGM || GlobalData.isShowGM) {
                GM.start(P_GM)
            }
        })
    }

}

export class GmModuleS extends ModuleS<GmModuleC, null> {
    onStart(): void { }
}

AddGMCommand("单纯四足换装", async (player: mw.Player, value: string) => {
    console.error('str=单纯四足换装');

    await player.character.asyncReady();
    player.character.clearDescription();//
    player.character.description.base.wholeBody = '159752';
    player.character.syncDescription(true);
}, (player: mw.Player, value: string) => {

});

AddGMCommand("单纯变回人", async (player: mw.Player, value: string) => {
    console.error('str=单纯平台换装');

    await player.character.asyncReady();
    player.character.clearDescription();//
    let loc = Player.localPlayer.character.worldTransform.position;
    AccountService.downloadData(player.character);
    player.character.worldTransform.position = new Vector(loc.x, loc.y, loc.z + 100);

}, (player: mw.Player, value: string) => {

});


AddGMCommand("开启四足", (player: mw.Player, value: string) => {
    let info = new SuitInfo();
    info.petId = 10001;
    info.suit = [10004, null, 30001, null, null];
    ModuleService.getModule(PetModuleC).fourPlayerFsm(true, info);
}, (player: mw.Player, value: string) => {

});


AddGMCommand("变回人", (player: mw.Player, value: string) => {
    let loc = Player.localPlayer.character.worldTransform.position;
    ModuleService.getModule(PetModuleC).fourPlayerFsm(false);
    AccountService.downloadData(player.character);
    player.character.worldTransform.position = new Vector(loc.x, loc.y, loc.z + 100);
}, (player: mw.Player, value: string) => {
});

AddGMCommand("清除当前玩家数据！", (player: mw.Player, value: string) => {

}, (player: mw.Player, value: string) => {
    console.log("清除当前玩家数据！")
    DataStorage.asyncRemoveData(player.userId).then((result) => {
        let str = "删除数据：";
        switch (result) {
            case mw.DataStorageResultCode.Success:
                str += "操作成功";
                break;
            case mw.DataStorageResultCode.Failure:
                str += "未知错误失败";
                break;
            // case mw.DataStorageResultCode.ExceededSizeLimit:
            //     str += "数据保存失败：文件大小过大";
            //     break;
            case mw.DataStorageResultCode.OnlyServerCall:
                str += "非法调用 只可服务器端调用";
                break;
            case mw.DataStorageResultCode.RequestIntervalTooClose:
                str += "请求间隔错误";
                break;
            case mw.DataStorageResultCode.RequestTooFrequent:
                str += "请求频率过高";
            case mw.DataStorageResultCode.KeyValueError:
                str += "key或者Value格式错误";
                break;
        }
        P_Tips.showToClient(player, str);
        console.log(str);
    })
});
AddGMCommand("设置画质等级1-9", (player: mw.Player, value: string) => {
    let level = Number(value);
    GraphicsSettings.setGraphicsCPULevel(level)
    GraphicsSettings.setGraphicsGPULevel(level)
}, null)

AddGMCommand("当前房间玩家跳游戏test", null, (player: Player, value: string) => {
    let players = Player.getAllPlayers();
    let needData: Record<string, unknown> = {};
    let playerList: string[] = [];
    let gameId: string = null;
    players.forEach(p => {
        let userId = p.userId;
        console.error(" ===============>>>>>>> check userID", userId)
        playerList.push(p.playerId.toString());
        let data: string = null;
        let m = new GameToHallDataManager(InGameStatus.Winner);
        gameId = "P_e455654a525acefc6a4ec6ee7093e2e7ef3ffa48"
        data = m.encode();
        needData[userId] = data;
    })
    JumpGameHelper.enterNewGameByTeam(gameId, playerList, needData)
}, null)

AddGMCommand("自己跳游戏test", (player: Player, value: string) => {
    let gameId: string = null;
    let data: string = null;
    let m = new GameToHallDataManager(InGameStatus.Winner);
    gameId = GameConfig.Global.getElement(10002).string_Value;
    data = m.encode();
    JumpGameHelper.enterGameClient(gameId, data)
}, null)

AddGMCommand("创建关卡", (player: mw.Player, value: string) => {

}, (player: mw.Player, value: string) => {
    if (!value) {
        return
    }
    GlobalData.gmMapID = Number(value);
    Event.dispatchToLocal(GMEventS2S.GM_BEGINGAME);
});
AddGMCommand("结算关卡", (player: mw.Player, value: string) => {

}, (player: mw.Player, value: string) => {
    Event.dispatchToLocal(GMEventS2S.GM_ENDGAME);
});
AddGMCommand("创建测试关卡", (player: mw.Player, value: string) => {

}, (player: mw.Player, value: string) => {
    GlobalData.gmPrefabGuid = "BF3C416B45DDBDBD2D9FDDA3120E27E0";
    GlobalData.gmMapID = 10001;
    Event.dispatchToLocal(GMEventS2S.GM_BEGINGAME);
});
AddGMCommand("修改玩家位置", (player: mw.Player, value: string) => {
    if (!value) {
        return;
    }
    let arr = value.split(",");// 100,100,100
    let x = Number(arr[0]);
    let y = Number(arr[1]);
    let z = Number(arr[2]);
    Player.localPlayer.character.worldTransform.position = new Vector(x, y, z);
}, (player: mw.Player, value: string) => {

});



AddGMCommand("修改光照天空球", (player: mw.Player, value: string) => {
    if (!value) {
        return;
    }
    Tips.show("开始修改光照天空球");
    GameEnvCfgUtils.changeSkyBox(Number(value));

}, (player: mw.Player, value: string) => {
});


AddGMCommand("直接夺冠_S", () => { },
    (player: mw.Player, value: string) => {
        ModuleService.getModule(GamingModuleS).gm_jumpAll();
    })

AddGMCommand("直接夺冠——C", () => {
    ModuleService.getModule(GamingModuleC).gm_backToHall();
}, () => {

})
AddGMCommand("起飞", () => {
    Player.localPlayer.character.switchToFlying();

    Player.localPlayer.character.addImpulse(new Vector(0, 0, 10000), true);
}, () => {

})

AddGMCommand("设置强化等级", (player: mw.Player, value: string) => {
    const arr = value.split("|");
    if (arr.length != 6) {
        console.error(`rkc--------------设置失败`);
        return;
    }
    const petModule = ModuleService.getModule(PetModuleC);
    petModule.setPetLevelAttr(arr.map(v => Number(v)));
}, (player: mw.Player, value: string) => {

})
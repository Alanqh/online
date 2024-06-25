import { GlobalData } from "../../const/GlobalData";
import GameComUtils from "../../utils/GameComUtils";
import P_Tips from "../../utils/P_Tips";
import MGSModuleC from "../mgsModule/MGSModuleC";
import LoginModuleS from "./LoginModuleS";

/**
 * 玩家登录，数据初始化
 */
export default class LoginModuleC extends ModuleC<LoginModuleS, null> {

    protected onStart(): void {
    }

    protected onEnterScene(sceneType: number): void {
        P_Tips.instance;

        let text = RouteService.getGameVersion();
        if (StringUtil.isEmpty(text)) {
            text = SystemUtil.getVersion();
        }
        if (StringUtil.isEmpty(text)) {
            text = "version null"
        }

        text += `_${RoomService.getRoomId()}`
        text += `_uid${AccountService.getUserId()}`

        GlobalData.infoStr = text;

        GameComUtils.playBGMByCfg(30001);//匹配场景BGM

        // 不需要等换装了，会直接换四足
        this.readyLogin();
    }

    // 换装完毕，再登录
    public async readyLogin() {
        let playerName = mw.AccountService.getNickName();
        if (!playerName || playerName == "") {
            playerName = this.localPlayer.character.displayName;
        }

        if (SystemUtil.isPIE && playerName == "defaultName") {
            playerName = this.localPlayerId.toString();
        }
        ModuleService.getModule(MGSModuleC).playerEnterGame();
        this.server.net_PlayerClientLogin(playerName);
    }
}
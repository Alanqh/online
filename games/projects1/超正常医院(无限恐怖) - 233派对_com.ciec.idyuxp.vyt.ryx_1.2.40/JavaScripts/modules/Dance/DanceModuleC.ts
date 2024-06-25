
import { GlobalData } from "../../const/GlobalData";
import DanceModuleS from "./DanceModuleS";
import P_Dance from "./UI/P_Dance";

export class WorldUIInfo {
    public worldUI: UIWidget;
    public img: Image;
    public timeOut: number;
}

export default class DanceModuleC extends ModuleC<DanceModuleS, null> {

    private saveAllPlayerWorldUI: Map<number, WorldUIInfo> = new Map();
    private danceUI: P_Dance;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        GlobalData.Dance.onPlayAnim.add(this.onPlayAnim.bind(this));
        GlobalData.Dance.onPlayExpression.add(this.onPlayExpression.bind(this));
        this.danceUI = UIService.create(P_Dance);
        this.danceUI.init();
        this.createWorldUI(Player.localPlayer.playerId);
    }

    public showDance() {
        this.danceUI?.showPanel();
    }

    private async createWorldUI(Id: number) {
        let player = Player.getPlayer(Id);
        let info = new WorldUIInfo();
        info.worldUI = (await GameObject.asyncSpawn("UIWidget")) as UIWidget;
        player.character.attachToSlot(info.worldUI, HumanoidSlotType.Head);
        info.worldUI.localTransform.position = GlobalData.Dance.ExpressionOffset;
        info.worldUI.worldTransform.scale = GlobalData.Dance.ExpressionScale;
        info.worldUI.setUIbyID("9DD296D64BF4D6AB4EF7ADBB1299E0CF");
        info.worldUI.widgetSpace = WidgetSpaceMode.OverheadUI;
        let ui = info.worldUI.getTargetUIWidget();
        info.img = ui.rootContent.getChildByName("mImage") as Image;
        info.worldUI.setVisibility(PropertyStatus.Off);
        this.saveAllPlayerWorldUI.set(Id, info);
    }

    private async onPlayAnim(assetGuid: string) {
        this.server.net_PlayAnim(assetGuid);
    }

    private async onPlayExpression(assetGuid: string) {
        this.server.net_PlayExpression(assetGuid);
    }

    public net_CreateWorldUI(Id: number) {
        this.createWorldUI(Id);
    }

    public async net_PlayExpression(pId: number, assetGuid: string) {
        if (!this.saveAllPlayerWorldUI.has(pId)) {
            await this.createWorldUI(pId)
        }
        let info = this.saveAllPlayerWorldUI.get(pId);
        if (info.timeOut) {
            clearTimeout(info.timeOut);
            info.timeOut = null;
        }
        info.worldUI.setVisibility(PropertyStatus.On);
        info.img.imageGuid = assetGuid;
        info.timeOut = setTimeout(() => {
            info.timeOut = null;
            info.worldUI.setVisibility(PropertyStatus.Off);
        }, GlobalData.Dance.ExpressionTime * 1000);
    }
}
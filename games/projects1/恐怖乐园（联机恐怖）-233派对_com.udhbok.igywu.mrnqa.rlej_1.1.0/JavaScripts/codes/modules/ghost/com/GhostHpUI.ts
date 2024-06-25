import MonsterBlood_UI_Generate from "../../../../ui-generate/ShareUI/MonsterBlood_UI_generate";
import { LanUtil } from "../../../utils/LanUtil";


export class GhostHpUI {
    public ui: MonsterBlood_UI_Generate;
    public uiwidget: UIWidget;
    public visiable: boolean = true;

    public constructor(char: Character) {
        /**
         * 初始化UI组件。
         * 创建并配置用于显示怪物血量的UI，将其附加到角色的头顶UI上。
         * 这样做是为了让玩家能够方便地看到怪物的血量变化，增强游戏的可玩性和实时反馈。
         */
        this.ui = UIService.create(MonsterBlood_UI_Generate);
        this.uiwidget = GameObject.spawn("UIWidget") as mw.UIWidget;
        this.uiwidget.parent = char.overheadUI;
        this.uiwidget.widgetSpace = WidgetSpaceMode.OverheadUI;
        this.uiwidget.localTransform.position = Vector.zero;
        this.uiwidget.setTargetUIWidget(this.ui.uiWidgetBase);
    }

    /**
     * 更新角色的当前生命值和最大生命值的比例，用于界面进度条的显示。
     * 
     * 此方法通过计算当前生命值与最大生命值的比率，来更新用户界面中的生命值进度条。
     * 这对于实时显示角色的健康状态非常重要，尤其是在游戏中。
     * 
     * @param curhp 当前生命值，表示角色当前的健康状况。
     * @param maxhp 最大生命值，用于确定角色的健康范围。
     */
    public updateHp(curhp: number, maxhp: number) {
        if (curhp <= 0 && this.visiable) {
            this.uiwidget.setVisibility(PropertyStatus.Off);
            this.visiable = false;
        }
        if (curhp > 0 && !this.visiable) {
            this.uiwidget.setVisibility(PropertyStatus.On);
            this.visiable = true;
        }
        this.ui.progressBar.percent = curhp / maxhp;
    }

    /**
     * 更新怪物名称显示。
     * 
     * 此方法用于修改用户界面中怪物名称文本框的显示内容。
     * 它是公共方法，可以通过类的任何实例调用。
     * 
     * @param name {string} 新的怪物名称。
     */
    public updateName(name: string) {
        this.ui.txt_monsterName.text = LanUtil.getText(name);
    }
}
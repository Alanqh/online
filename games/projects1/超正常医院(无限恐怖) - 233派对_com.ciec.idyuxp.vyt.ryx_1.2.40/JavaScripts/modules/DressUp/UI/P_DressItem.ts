import { DressConfig, IDressElement } from "../../../config/Dress";
import EffectIcon_Generate from "../../../ui-generate/Dress/EffectIcon_generate";
import DressTab2UINode from "./DressTab2UINode";


export default class P_DressItem extends EffectIcon_Generate {

    /**装饰配置 */
    public conf: IDressElement;
    /**父节点 */
    public node2: DressTab2UINode;

    /**选中(试穿)事件 */
    public onSelect: Action1<P_DressItem> = new Action();
    /**取消选中(试穿)事件 */
    public onUnselect: Action1<P_DressItem> = new Action();
    /**装备装扮事件 */
    public onEquip: Action1<P_DressItem> = new Action();
    /**取消装备装扮事件 */
    public onUnequip: Action1<P_DressItem> = new Action();

    /**是否选中 */
    private _isSelect: boolean = false;
    public get isSelected(): boolean {
        return this._isSelect;
    }
    public set isSelected(value: boolean) {
        if (this._isSelect == value) return;
        // 发送选中改变事件
        this.onSelectChange(value);

        this._isSelect = value;
    }

    /**是否锁定 */
    private _isLock: boolean = true;
    public get isLock(): boolean {
        return this._isLock;
    }
    public set isLock(value: boolean) {
        if (this._isLock == value) return;
        this.onLockChange(value);

        this._isLock = value;
    }

    /**是否装备 */
    private _isEquip: boolean = false;
    public get isEquip(): boolean {
        return this._isEquip;
    }
    public set isEquip(value: boolean) {
        if (this._isEquip == value) return;
        this.onEquipChange(value);
        this._isEquip = value;
    }


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.mbtn.touchMethod = ButtonTouchMethod.PreciseTap;
    }

    public init(conf: IDressElement, node2: DressTab2UINode) {
        this.conf = conf;
        this.node2 = node2;
        // this.mbtn.onClicked.add(this.onClickItem.bind(this));
        // 设置图片和文字 TODO
        this.mImage_EffectPic.imageGuid = conf.Icon;
        this.mText_EffectName.text = conf.Name;
    }

    /**当点击装扮item */
    public onClickItem() {

        // if()
    }

    /**当选择状态改变 */
    private onSelectChange(isSelect: boolean) {
        this.mImage_Select.visibility = isSelect ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        if (isSelect) {
            this.onSelect.call(this);
        } else {
            this.onUnselect.call(this);
        }
    }

    /**当前装备状态改变 */
    private onEquipChange(isEquip: boolean) {
        this.mImage_Equip.visibility = isEquip ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        if (isEquip) {
            this.onEquip.call(this);
        } else {
            this.onUnequip.call(this);
        }
    }

    /**当解锁状态改变 */
    private onLockChange(isLock: boolean) {
        this.mImage_Black.visibility = isLock ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }


    private test() {
        this.onEquip.add((ui) => console.error("装备装扮", ui.conf.Name))
        this.onUnequip.add((ui) => console.error("取消装备装扮", ui.conf.Name))
        this.onSelect.add((ui) => console.error("选中装扮", ui.conf.Name))
        this.onUnselect.add((ui) => console.error("取消选中装扮", ui.conf.Name))
    }
}
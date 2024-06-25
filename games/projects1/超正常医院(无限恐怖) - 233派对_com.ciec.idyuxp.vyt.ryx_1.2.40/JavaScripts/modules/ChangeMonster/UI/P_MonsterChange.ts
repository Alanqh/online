import { GameConfig } from "../../../config/GameConfig";
import { IMonstersElement } from "../../../config/Monsters";
import MonsterChange_Generate from "../../../ui-generate/Shop/MonsterChange_generate";
import Monster_Generate from "../../../ui-generate/Shop/Monster_generate";


/**怪物选择 */
export class P_MonsterChange extends MonsterChange_Generate {

    private monsterMap: Map<number, MonsterItem> = new Map();

    public onChooseMonsterAC: Action1<number> = new Action1();

    onStart() {

        this.init();

        this.mButton_Close.onClicked.add(() => {
            this.hide();
        });
    }

    private init() {
        GameConfig.Monsters.getAllElement().forEach((cfg) => {
            let item = UIService.create(MonsterItem);
            item.uiObject.size = item.rootCanvas.size;
            item.init(cfg);
            item.setSelect(false);
            this.mCanvas_Monster.addChild(item.uiObject);
            this.monsterMap.set(cfg.ID, item);
            item.mButton_Change.onClicked.add(this.chooseMonster.bind(this, cfg.ID));
        });
    }

    /**怪物被选 */
    public onMonsterChange(Id: number) {
        this.monsterMap.get(Id)?.setSelect(true);
    }

    /**重置 */
    public monsterReset() {
        this.monsterMap.forEach((v) => {
            v.setSelect(false);
        });
    }

    /**刷新页面 */
    public refresh(hasSelect: number[]) {
        hasSelect.forEach((v) => {
            this.monsterMap.get(v)?.setSelect(true);
        });
    }

    /**ui点击选择怪 */
    private chooseMonster(id: number) {
        this.onChooseMonsterAC.call(id);
    }

}


class MonsterItem extends Monster_Generate {

    onStart() {
        this.mButton_Change.onClicked.add(() => {

        });
    }

    public init(cfg: IMonstersElement) {
        this.mImage_MonsterIcon.imageGuid = cfg.Icon;
        this.mText_Name.text = cfg.Name;
    }

    public setSelect(isSelect: boolean) {
        this.mText_Select.visibility = isSelect ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        this.mCanvas_Select.visibility = isSelect ? SlateVisibility.Collapsed : SlateVisibility.SelfHitTestInvisible;
    }


}
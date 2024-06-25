import { DanceTabType } from "../../../../const/enum";
import DanceTab__Generate from "../../../../ui-generate/Dress/DanceTab__generate";


export default class P_TabItem extends DanceTab__Generate {

    private curType: DanceTabType;
    private clickAc: Action1<DanceTabType> = new Action1();

    public init(type: DanceTabType, onClickAc: (type: DanceTabType) => void) {
        this.curType = type;
        this.mText_TagName.text = getNameByType(type);
        this.mBtn_Tab.onClicked.add(() => {
            onClickAc(this.curType)
        });
    }

    public changeTab(type: DanceTabType) {
        this.mImage_Select_1_1.visibility = type === this.curType ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }
}

export function getNameByType(type: DanceTabType) {
    let msg: string = "";
    switch (type) {
        case DanceTabType.Dance:
            msg = "动作";
            break;
        case DanceTabType.Expression:
            msg = "表情";
            break;
        default:
            break;
    }
    return msg;
}
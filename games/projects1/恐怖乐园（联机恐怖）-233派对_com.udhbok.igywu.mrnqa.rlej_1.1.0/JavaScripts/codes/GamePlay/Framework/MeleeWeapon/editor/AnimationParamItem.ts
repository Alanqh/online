
import AnimationParamItem_Generate from "../../../../../ui-generate/ShareUI/common/AnimationEditor/AnimationParamItem_generate";
import { NodeParamName } from "../AnmationInfo";


export class NodeParamItem extends AnimationParamItem_Generate {
    keyString: string = "";

    onShow(keyString: string) {
        this.keyString = keyString;
        this.mTextName.text = NodeParamName.get(keyString);
        this.mTextName.visibility = mw.SlateVisibility.SelfHitTestInvisible;

    }
}
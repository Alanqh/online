/** 
 * @Author       : Songyang.Xie
 * @Date         : 2024-01-23 15:07:06
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2024-01-24 14:15:03
 * @FilePath     : \petparty\JavaScripts\EmojiPlate\UI\P_ChatWheelItem.ts
 * @Description  : 修改描述
 */
import ChatWheelItem_Generate from "../../ui-generate/ChatWheelItem_generate";
import EmojiScript, { ChatType } from "../EmojiScript";

export default class P_ChatWheelItem extends ChatWheelItem_Generate {

    wheelIndex:number = -1;
    private chatId:number = 0;
    private unChooseColor: string = "#FFFFFF";
    private chooseColor: string = "#FFD600";
    private chooseScale: Vector2 = new Vector2(1.2, 1.2);
    private tweenTime: number = 0.1;
    private moveTween: mw.Tween<{x: number, y: number}> = null;
    private resetTween: mw.Tween<{x: number, y: number}> = null;
    private tweenVector: Vector2 = Vector2.zero;

    onStart() {
        this.canvas_Item.renderTransformAngle = - this.uiObject.renderTransformAngle;
        let param = EmojiScript.instance.getWheelItemParam();
        this.unChooseColor = param.unChooseColor;
        this.chooseColor = param.chooseColor;
        this.chooseScale = param.chooseScale;
        this.tweenTime = param.tweenTime;
    }

    init(wheelIndex:number){
        this.wheelIndex = wheelIndex;
    }

    setChatId(id: number) {
        this.chatId = id;;
        this.img_Icon.visibility = id == 0 ? SlateVisibility.Collapsed : SlateVisibility.SelfHitTestInvisible;
        this.txt_Name.visibility = SlateVisibility.Collapsed;
        if(id == 0) return;
        const cfg = EmojiScript.instance.getEmojiInfo(id);
        this.txt_Name.visibility = cfg.ChatType == ChatType.Emoji ? SlateVisibility.Collapsed : SlateVisibility.SelfHitTestInvisible;
        this.txt_Name.text = cfg.Name;
        
        if(cfg.IconReadAssetsGuid){
            this.assetsIconInImage(this.img_Icon,cfg.AssetGuid);
			return;
		}
		this.img_Icon.imageGuid = cfg.Icon;
    }
    /**被选中时 */
    onChoose() {
        this.img_Bg.imageColor = mw.LinearColor.colorHexToLinearColor(this.chooseColor);
        this.playChooseTween();
    }

    private playChooseTween(){
        if (!this.moveTween) {
            this.moveTween = new Tween<{x: number, y: number}>({x: 1, y: 1})
            .to({x: this.chooseScale.x, y: this.chooseScale.y}, this.tweenTime* 1000)
            .onUpdate((dt)=>{
                this.tweenVector.x = dt.x;
                this.tweenVector.y = dt.y
                this.uiObject.renderScale = this.tweenVector;
            })
        }
        this.resetTween?.stop();
        this.moveTween.start();
    }

    private playUnChooseTween(){
        if (!this.resetTween) {
            this.resetTween = new Tween<{x: number, y: number}>({x: this.chooseScale.x, y: this.chooseScale.y})
            .to({x: 1, y: 1}, this.tweenTime* 1000)
            .onUpdate((dt)=>{
                this.tweenVector.x = dt.x;
                this.tweenVector.y = dt.y
                this.uiObject.renderScale = this.tweenVector;
            })
        }
        this.moveTween?.stop();
        this.resetTween.start();
    }

    //取消选中
    unChoose() {
        this.img_Bg.imageColor = mw.LinearColor.colorHexToLinearColor(this.unChooseColor)
        this.playUnChooseTween();
        
    }

    private assetsIconInImage(image: mw.Image, assetsId: string) {
        if (mw.getAssetIconDataByAssetID(assetsId)) {
            image.setImageByAssetIconData(mw.getAssetIconDataByAssetID(assetsId));
        } else {
            mw.assetIDChangeIconUrlRequest([assetsId]).then(() => {
                if (mw.getAssetIconDataByAssetID(assetsId)) {
                    image.setImageByAssetIconData(mw.getAssetIconDataByAssetID(assetsId));
                }
            });
        }
    }

}
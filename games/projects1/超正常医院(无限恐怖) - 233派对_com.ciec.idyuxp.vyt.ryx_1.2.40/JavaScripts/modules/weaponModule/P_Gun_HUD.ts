import { GameConfig } from "../../config/GameConfig";
import { ActionCommon } from "../../const/GlobalData";
import Gun_HUD_Generate from "../../ui-generate/GameHUD/Gun_HUD_generate";
import UITools from "../../utils/UI/UITools";
import { P_HUD } from "../GameHud/UI/P_HUD";


const normalSize = Vector2.one;
const bigSize = Vector2.one.multiply(1.5);

export default class P_Gun_HUD extends Gun_HUD_Generate {

    /**当前装备枪id */
    private curGunId: number = -1;
    /**子弹图片列表 */
    private bulletImgList: Image[] = [];
    /**当前选中舞蹈索引 */
    private selectDanceIndex: number = -1;
    /**选中子弹改变事件 */
    public onDanceChange: Action1<number> = new Action();
    /**当前图片动画列表 */
    private imgTweenList: mw.Tween<any>[] = [];
    /**五个元素的轮盘, 正常元素大小 */
    private normalSize_5: Vector2[] = [];
    /**五个元素的轮盘, 正常元素位置 */
    private normalPos_5: Vector2[] = [];
    /**五个元素的轮盘, 选中元素大小 */
    private bigSize_5: Vector2[] = [];
    /**五个元素的轮盘, 选中元素位置 */
    private bigPos_5: Vector2[] = [];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.mCanvas_5.visibility = SlateVisibility.Collapsed;
        this.initEvent();
        this.initParams();
    }

    /**初始化事件 */
    initEvent() {
        // 开始选择子弹
        this.mv_select.onJoyStickDown.add(() => {
            this.mCanvas_5.visibility = SlateVisibility.Visible;
            UIService.getUI(P_HUD).mTouchPadDesigner.enable = false;
            this.mImg_BackGround.visibility = SlateVisibility.HitTestInvisible;
        })

        this.mv_select.onInputDir.add((dir: Vector2) => {
            // 滑动方向与Y轴夹角
            let angle = Vector2.angle(dir, Vector2.unitY);
            if (dir.x < 0) angle = 360 - angle;
            let curIndex = Math.round(angle / (360 / this.bulletImgList.length)) % this.bulletImgList.length;
            this.onCurSelectBulletChange(curIndex);
        })
        this.mv_select.onJoyStickUp.add(() => {
            UIService.getUI(P_HUD).mTouchPadDesigner.enable = true;
            this.confirmSelect(this.selectDanceIndex);
            this.mv_select.resetJoyStick();
        })

        /**舞蹈改变时，修改选择按钮的图片 */
        this.onDanceChange.add((danceId: number) => {
            if (danceId == 0) return;
            let conf = GameConfig.NPCAnimation.getElement(danceId);
            this.mImage_Action.imageGuid = conf.Icon;
        })
    }

    /**初始化参数 */
    initParams() {
        // 五元素轮盘
        let canvas_5 = this.mCanvas_5;
        for (let i = 0; i < 5; i++) {
            let normalImg = canvas_5.getChildByName(`mImg_5_${i + 1}`) as Image;
            this.normalPos_5.push(normalImg.position.clone());
            this.normalSize_5.push(normalImg.size.clone());
            let bigImg = canvas_5.getChildByName(`Img_5_${i + 1}`) as Image;
            this.bigPos_5.push(bigImg.position.clone());
            this.bigSize_5.push(bigImg.size.clone());
        }
    }


    /**当子弹改变 */
    onCurSelectBulletChange(curIndex: number) {
        if (this.selectDanceIndex == curIndex) return;
        this.selectDanceIndex = curIndex;
        this.selectImg(curIndex);
        this.clearOtherSelect(curIndex);
    }


    /**
     * 选中对应索引的图片
     * @param index 当前选中的图片索引
     */
    private selectImg(index: number) {
        let img = this.bulletImgList[index];

        let bigPos = this.bigPos_5[index];
        let bigSize = this.bigSize_5[index];

        this.imgTweenList[index] = new mw.Tween({ size: img.size.clone(), pos: img.position.clone() }).to({ size: bigSize, pos: bigPos }, 300)
            .onUpdate((obj) => {
                img.size = obj.size;
                img.position = obj.pos;
            })
            .onComplete(() => {
                this.imgTweenList[index] = null;
            })
            .start();
    }


    /**
     * 清除其它图片的选中状态
     * @param index 当前选中的图片索引
     */
    private clearOtherSelect(index: number) {
        for (let i = 0; i < this.bulletImgList.length; i++) {
            // 不处理选中的图片
            if (i == index) continue;
            let img = this.bulletImgList[i];
            let normalSize = this.normalSize_5[i];
            let normalPos = this.normalPos_5[i];
            // 无需还原
            if (img.size.x == normalSize.x && img.size.y == normalSize.y) continue;

            if (this.imgTweenList[i]) this.imgTweenList[i].stop();

            this.imgTweenList[i] = new mw.Tween({ size: img.size.clone(), pos: img.position.clone() }).to({ size: normalSize, pos: normalPos }, 300)
                .onUpdate((obj) => {
                    img.position = obj.pos;
                    img.size = obj.size;
                })
                .onComplete(() => {
                    this.imgTweenList[i] = null;
                })
                .start();
        }
    }


    /**
     * 确认选择
     * @param index 选中的索引
     */
    private confirmSelect(index: number) {
        let img = this.bulletImgList[index];
        // 获得对应的舞蹈id
        this.onDanceChange.call(this.getDanceByIndex(index));
        // 直接隐藏其它图片
        this.mImg_BackGround.visibility = SlateVisibility.Collapsed;
        for (let i = 0; i < this.bulletImgList.length; i++) {
            if (i == index) continue;
            let img = this.bulletImgList[i];
            img.visibility = SlateVisibility.Collapsed;
        }
        this.mv_select.enable = false;
        let fadeTween = new mw.Tween({ alpha: 1 }).to({ alpha: 0 }, 700)
            .onUpdate((obj) => {
                img.renderOpacity = obj.alpha;
            })
            .onComplete(() => {
                // 还原UI位置
                this.mCanvas_5.visibility = SlateVisibility.Collapsed;
                img.renderOpacity = 1;
                img.size = this.normalSize_5[index].clone();
                img.position = this.normalPos_5[index].clone();
                for (let i = 0; i < this.bulletImgList.length; i++) {
                    if (i == index) continue;
                    let img = this.bulletImgList[i];
                    img.visibility = SlateVisibility.Visible;
                }
                this.mv_select.enable = true;
            })
            .start();
    }


    private getDanceByIndex(index: number) {
        let gunConf = GameConfig.nWeapon.getElement(this.curGunId);
        let bulletConf = GameConfig.nBullet.getElement(gunConf.bulletID);
        return bulletConf.DanceList[index];
    }


    /**装备枪 */
    onEquipGun(gunId: number) {
        if (this.getDanceList(gunId).length == 0) {
            this.onDanceChange.call(0);
            return;
        }

        this.curGunId = gunId;
        this.initBulletList(gunId);
        this.onDanceChange.call(this.getDanceByIndex(0));
        this.show();
    }

    private initBulletList(gunId: number) {
        this.bulletImgList.length = 0
        let DanceList = this.getDanceList(gunId);
        let imgCount = DanceList.length;

        for (let i = 0; i < imgCount; i++) {
            let canvas = this[`mCanvas_${imgCount}`] as Canvas;
            let img = canvas.getChildByName(`mImg_${imgCount}_${i + 1}`) as Image;
            this.bulletImgList.push(img);
            let imgGuid = GameConfig.NPCAnimation.getElement(DanceList[i]).Icon;
            // (this[`mText_${imgCount}_${i + 1}`] as TextBlock).text = danceName;
            (img.getChildByName("Image") as Image).imageGuid = imgGuid;
        }
    }

    /**获得舞蹈数量 */
    private getDanceList(gunId: number) {
        let gunConf = GameConfig.nWeapon.getElement(gunId);
        let bulletConf = GameConfig.nBullet.getElement(gunConf.bulletID);
        if (bulletConf.DanceList == null) return [];
        return bulletConf.DanceList;
    }


    /**卸载枪 */
    onUnequipGun() {
        this.curGunId = -1;
        this.hide();
    }

}
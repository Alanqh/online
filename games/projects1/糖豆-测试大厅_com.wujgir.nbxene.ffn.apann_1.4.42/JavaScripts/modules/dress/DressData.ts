/** 
 * @Author       : zhenhaung.luo  zhenhuang.luo@appshahe.com
 * @Date         : 2023-03-02 13:25:03
 * @LastEditors  : zhenhuang.luo  zhenhuang.luo@appshahe.com
 * @LastEditTime : 2023-03-02 13:43:37
 * @FilePath     : \stumbleguys\JavaScripts\modules\dress\DressData.ts
 * @Descripttion : 
 */
import { Enums } from "./Enums";

export class DressData extends Subdata {

    /** 身上的装扮 */
    @Decorator.persistence()
    public clothes: number[] = [];
    /** 装备上的表情 */
    @Decorator.persistence()
    public emotes: number[] = [];
    @Decorator.persistence()
    public curSex: number = 1;
    @Decorator.persistence()
    public customFaceData: {} = {};
    @Decorator.persistence()
    public customBodyData: {} = {};
    /**衣柜 */
    @Decorator.persistence()
    public wardrobe: number[] = [];

    constructor() {
        super();
    }

    /** 初始化 */
    protected initDefaultData(): void {
        this.wardrobe = [];
        this.clothes = [3, 5, 7, 0, 11];
        this.emotes = [];
        this.curSex = 1;
        this.save(true);
    }

    /**
     * 获取玩家穿戴的装扮
     * @returns 已经穿戴的装扮
     */
    public getAllCloth(): number[] {
        return this.clothes;
    }

    public getFoot() {
        return this.clothes[3];
    }

    /**
    * 获取玩家装备的表情
     * @returns 已经穿戴的装扮
     */
    public getAllEmotes(): number[] {
        return this.emotes;
    }

    /**
     * 获取自定义数据
     * @returns 自定义的数据
     */
    public getCustomData(type: number): {} {
        switch (type) {
            case 1:
                return this.customFaceData;
            case 2:
                return this.customBodyData;
        }
    }

    /**
     * 穿上一件衣服
     * @param id 服装id
     */
    public putOnDress(id: number, type: Enums.EquipDressType): void {
        if (type == 2) {
            let index = this.emotes.findIndex(i => i == id);
            if (index >= 0) {
                this.emotes.splice(index, 1);
            } else {
                this.emotes.push(id);
            }
        } else {
            let index = this.clothes.findIndex(i => i == id);
            if (index >= 0) {
                this.clothes[type - 1] = -1;
            } else {
                this.clothes[type - 1] = id;
            }
        }
        this.save(true);
    }

    /**金币解锁衣服 */
    public unlockCloth(id: number) {
        if (this.wardrobe.indexOf(id) < 0) {
            this.wardrobe.push(id);
        }
    }

}
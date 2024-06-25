import { IDressElement } from "../../config/Dress";
import { IDressTabElement } from "../../config/DressTab";
import { GameConfig } from "../../config/GameConfig";

export enum DressUpTab1 {
    /**名片 */
    Card = 1001,
    /**挂件 */
    Pendant = 1002,
    /**特效 */
    Effect = 1003,
}

export enum DressUpTab2 {
    /**名片 */
    HeadCard = 1101,
    /**头饰 */
    Headwear = 2001,
    /**背饰 */
    Backwear = 2002,
    /**左手 */
    LeftHand = 2003,
    /**右手 */
    RightHand = 2004,
    /**左腿 */
    LeftLeg = 2005,
    /**右腿 */
    RightLeg = 2006,
    /**死亡特效 */
    Death = 3001,
    /**入场特效 */
    Enter = 3002,
}


/**换装一级页签数据 */
export class DressUpNode1Data {
    /**页签类型 (同页签表id) */
    tab1Type: DressUpTab1;
    /**二级页签节点列表 */
    tab2NodeList: DressUpNode2Data[] = [];

    constructor(tab1Conf: IDressTabElement) {
        this.tab1Type = tab1Conf.id;
        tab1Conf.childTabId.forEach((tab2Id) => {
            let tab2Conf = GameConfig.DressTab.getElement(tab2Id);
            this.tab2NodeList.push(new DressUpNode2Data(tab2Conf));
            console.warn(`初始化二级页签数据: ${tab2Conf.tabName}`);
        });
    }
}


/**换装二级页签数据 */
export class DressUpNode2Data {
    /**页签类型 */
    tab2Type: DressUpTab2;
    /**装饰item列表 */
    dressItemList: DressUpItemData[] = [];

    constructor(tab2Conf: IDressTabElement) {
        this.tab2Type = tab2Conf.id;
    }
}

/**装饰item数据 */
export class DressUpItemData {
    /**装扮id */
    id: number;
    /**类型 */
    type: DressUpTab2;
    /**是否为永久 */
    isForever: boolean;
    /**解锁时间 */
    unlockTime: number;
    /**试用时间 */
    tryTime: number;
    /**是否装备 */
    isEquip: boolean;

    constructor(id: number, type?: DressUpTab2, isForever: boolean = true, tryTime: number = -1) {
        this.id = id;
        if (type == null) type = this.findDressType(id);
        this.isForever = isForever;
        this.tryTime = tryTime;
        this.isEquip = false;
        this.type = type;
        this.unlockTime = TimeUtil.time();
    }

    private findDressType(dressId: number): number {
        let type = 0;
        let cfg = GameConfig.DressTab.getAllElement();
        cfg.forEach((v) => {
            if (!v.SourceId) return;
            if (type != 0) return;
            if (v.SourceId.includes(dressId)) {
                type = v.id;
            }
        })
        return type;
    }
}


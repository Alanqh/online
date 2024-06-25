
import { GameConfig } from "../../../../config/GameConfig";
import { IItemLevelPropertyElement } from "../../../../config/ItemLevelProperty";

export enum PropertyType {
    Dmg = 1,
    Spd,
    Cp,
    ShotHead,
}

/** 武器属性类型列表 */
const weaponProperTypeList = ["empty", "dmg", "spd", "cp", "shotHead"];

export class WeaponProperty {

    /** 威力 */
    dmg: number;

    /** 射速 - 实际上是攻击时间 */
    spd: number;

    /** 弹匣容量 冷兵器没这个 */
    cp: number;

    /** 爆头伤害系数 */
    shotHead: number;

    /** 强化配置 */
    public propertyCfg: IItemLevelPropertyElement;

    private setProperCfgByItemLevelId(itemLevelId) {
        this.propertyCfg = GameConfig.ItemLevelProperty.getElement(GameConfig.ItemLevel.getElement(itemLevelId).propertyId);
    }

    public constructor(public weaponId: number, level: number, public type: number) {
        // 默认爆头伤害1.5
        this.init_shotHead = 1.5;
        switch (type) {
            // 热武器
            case 1:
                let cfg1 = GameConfig.HotWeapon.getElement(weaponId);
                this.init_dmg = cfg1.damage;
                this.init_spd = cfg1.fireInter;
                this.init_cp = cfg1.bulletNum;
                this.setProperCfgByItemLevelId(cfg1["itemLevelId"]);
                break;
            // 冷兵器
            case 2:
                let cfg2 = GameConfig.MeleeWeapon.getElement(weaponId);
                this.init_dmg = cfg2.hurt;
                this.init_spd = cfg2.selfAtkTime[0];
                this.setProperCfgByItemLevelId(cfg2["itemLevelId"]);
                break;
        }
        this.loadCurLevelProperty(level, true);
    }

    /**
     * 加载当前等级的属性 - 从高到低
     * @param level 当前等级
     * @param isFirst 是否第一次
     * @returns 
     */
    private loadCurLevelProperty(level: number, isFirst: boolean = false) {
        if (level === 0) {
            if (!this.dmg) { this.dmg = this.init_dmg; }
            if (!this.spd) { this.spd = this.init_spd; }
            if (!this.cp) { this.cp = this.init_cp; }
            if (!this.shotHead) { this.shotHead = this.init_shotHead; }
            return;
        }
        let arr: number[][] = this.propertyCfg[`level${level}`];
        for (let index = 0; index < arr.length; index++) {
            if (!isFirst && this[weaponProperTypeList[arr[index][0]]]) { continue; }
            this[weaponProperTypeList[arr[index][0]]] = arr[index][1];
            console.log(`DEBUG>>> loadCurLevelProperty weaponId = ${this.weaponId} level = ${level} ${weaponProperTypeList[arr[index][0]]} = ${arr[index][1]}`);
        }
        // 热武器
        if (this.type === 1 && !this.dmg || !this.spd || !this.cp || !this.shotHead) {
            console.log(`DEBUG>>> loadCurLevelProperty hotweapon again level: ${level}`);
            // 递归加载上一等级的
            this.loadCurLevelProperty(level - 1);
        }
        // 冷兵器
        if (this.type === 2 && !this.dmg || !this.shotHead) {
            console.log(`DEBUG>>> loadCurLevelProperty meleeweapon again level: ${level}`);
            // 递归加载上一等级的
            this.loadCurLevelProperty(level - 1);
        }
    }

    /** 初始伤害 */
    private init_dmg: number;

    /** 初始攻速 */
    private init_spd: number;

    /** 初始容量 */
    private init_cp: number;

    /** 初始爆头伤害 */
    private init_shotHead: number;

    /** 获取相较初始能力的百分比 - 保留两位位小数 且 * 100*/
    public getPercentMul100(propertyType: PropertyType): number {
        let curKey = weaponProperTypeList[propertyType];
        let initKey = "init_" + curKey;
        let deltaNum = Math.abs(this[curKey] - this[initKey]);
        return Math.floor((((deltaNum + this[initKey]) / this[initKey]) * 100));
    }

    /** 获取增加的能力百分比 */
    public getNewPercentMul100(propertyType: PropertyType): number {
        let curKey = weaponProperTypeList[propertyType];
        let initKey = "init_" + curKey;
        let deltaNum = Math.abs(this[curKey] - this[initKey]);
        return Math.floor((((deltaNum) / this[initKey]) * 100));
    }

    /** 获取当前数值 */
    public getCurVal(propertyType: PropertyType): number {
        let curKey = weaponProperTypeList[propertyType];
        return this[curKey];
    }

    /** 获取初始值 */
    public getInitVal(propertyType: PropertyType): number {
        let curKey = weaponProperTypeList[propertyType];
        let initKey = "init_" + curKey;
        return this[initKey];
    }
}

export class WeaponPropertyInstance {

    constructor() { }

    /** 武器不同等级对应的属性 - Key是武器”id_level“，value是当前武器的当前等级 */
    private propertyMap: Map<string, WeaponProperty> = new Map();

    /**
     * 根据武器的配置和等级获取它当前属性
     * @param weaponId 武器配置id
     * @param level 武器等级
     * @param type 武器类型 1是热武器 2是冷兵器
     */
    public getProperty(weaponId: number, level: number, type: number) {
        let key = this.getKey(weaponId, level, type);
        let property = this.propertyMap.get(key);
        // 没有当前配置就找一下上一个key，再把当前的属性加上
        if (!property) {
            property = new WeaponProperty(weaponId, level, type);
            this.propertyMap.set(key, property);
        }
        return property;
    }

    private getKey(weaponId: number, level: number, type) {
        return weaponId + "_" + level + "_" + type;
    }
}

export let WeaponPropertyService: WeaponPropertyInstance;

try {
    WeaponPropertyService = new WeaponPropertyInstance();
} catch (error) {
    console.error("DEBUG>>> MyTypeError WeaponPropertyInstance init error!")
}

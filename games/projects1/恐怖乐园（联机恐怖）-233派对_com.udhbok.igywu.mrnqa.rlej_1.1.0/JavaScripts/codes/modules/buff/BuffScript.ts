import { GameConfig } from "../../../config/GameConfig";
import { MainUI } from "../../ui/MainUI";
import { ArchiveDataType } from "../archive/ArchiveHelper";
import ArchiveModuleC from "../archive/ArchiveModuleC";
import { PlayerAttr } from "../player/PlayerAttr";
import { PlayerModuleC } from "../player/PlayerModuleC";
import { ProcedureModuleC } from "../procedure/ProcedureModuleC";
import { Event_GameEnd } from "../procedure/const/Events";
import { ArchiveBuff, Buff, BuffDataHelper } from "./BuffData";
import BuffDefine, { EBuffType } from "./BuffDefine";
import { BuffModuleC } from "./BuffModule";
import ExpBuffTipsHud from "./ui/ExpBuffTipsHud";



@Component
export class BuffScript extends PlayerState {

    public userId: string;

    @Property({ replicated: true })
    public playerAttr: PlayerAttr;

    // 030现在这样搞是有bug的 031是没毛病的
    // 现在主动同步一下了
    // 所有游戏的buff
    // @Property({ replicated: true, onChanged: "onBuffChanged" })
    public buffList: Buff[] = [];

    //TODO: 030现在这样搞是有bug的 031是没毛病的
    /** bff改变时的回调 */
    public onBuffChanged(path: string[], newValue: any, oldVal: any) {
        console.log(`DEBUG>>> onBuffChanged path: ${JSON.stringify(path)} newValue: ${JSON.stringify(newValue)} oldVal: ${JSON.stringify(oldVal)}`);
        if (this.buffList.find(v => { return v.type === EBuffType.DayExp }) != undefined) {
            UIService.show(ExpBuffTipsHud);
        } else {
            UIService.hide(ExpBuffTipsHud);
        }
    }


    /** 100毫秒检测一次buff是否还存在 */
    private readonly checkTime = 0.1;

    private checkTimer = this.checkTime;

    /** 隔多久自动保存一次 */
    private readonly saveTime = 10;

    private saveTimer = this.saveTime;

    protected onUpdate(dt: number): void {
        this.checkTimer -= dt;
        if (this.checkTimer <= 0) {
            this.checkTimer = this.checkTime;
            this.checkArchiveBuffExpire();
            this.server_checkAndRemoveExpiredBuffs(this.buffList);
        }

        if (SystemUtil.isServer()) { return; }
        this.saveTimer -= dt;
        if (this.saveTimer <= 0) {
            this.saveTimer = this.saveTime;
            this.saveArchiveBuff();
        }
    }

    /**
     * 加载存档还存在的buff
     */
    public async server_loadBuff() {
        const buffData = await BuffDataHelper.reqGetData(this.userId);
        this.server_checkAndRemoveExpiredBuffs(buffData.buffList);
        console.log(`DEBUG>>> server_loadBuff: ${JSON.stringify(buffData.buffList)}`);
        this.server_updatePlayerStats();
        this.server_syncBuff();
    }

    /**
     * 添加一个buff
     * @param buffId buff配置Id
     */
    public server_addBuff(buffId: number, addCount: number = 1): void {
        console.log(`DEBUG>>> ServerAddBuff Start buffId: ${buffId} addCount: ${addCount}`);
        const cfg = GameConfig.Buff.getElement(buffId);
        let buff = this.buffList.find(v => { return cfg.type === v.type });
        if (!buff) {
            buff = new Buff();
            buff.type = cfg.type;
            buff.value = cfg.value;
            buff.duration = this.getDurationSec(cfg.type, cfg.duration) * addCount;
            this.buffList.push(buff);
        } else {
            const isSameVal = buff.value === cfg.value;
            buff.value = cfg.value;
            const cfgDuration = this.getDurationSec(cfg.type, cfg.duration) * addCount;
            buff.duration = isSameVal ? buff.duration + cfgDuration : cfgDuration;
            buff.startTimeStamp = isSameVal ? buff.startTimeStamp : Date.now();
        }
        this.server_updatePlayerStats();
        BuffDataHelper.reqSaveData(this.userId, this.buffList);
        this.server_syncBuff();
        console.log(`DEBUG>>> ServerAddBuff End ${JSON.stringify(buff)}`);
    }

    /** 将持续时间转换成秒 */
    private getDurationSec(type: number, duration: number) {
        switch (type) {
            case EBuffType.DayExp:
                return duration * 24 * 60 * 60;
            default:
                return duration;
        }
    }

    /**  
     * 双端玩家的属性以反映当前的buff效果  
     */
    public server_updatePlayerStats(): void {
        this.playerAttr.init();
        this.buffList.forEach(buff => {
            switch (buff.type) {
                case EBuffType.DayExp:
                    this.playerAttr.expIndex *= buff.value;
                    break;
            }
        });
    }

    /**  
     * 检查并移除已经过期的buff  
     */
    private server_checkAndRemoveExpiredBuffs(buffList: Buff[]): void {
        if (SystemUtil.isClient()) { return; }
        const currentTime = Date.now();
        this.buffList = buffList.filter(buff => {
            if (currentTime - buff.startTimeStamp > buff.duration * 1e3) {
                return false;
            }
            return true;
        });
        if (this.buffList.length != buffList.length) {
            BuffDataHelper.reqSaveData(this.userId, this.buffList);
            this.server_updatePlayerStats();
            console.log(`DEBUG>>> server_checkAndRemoveExpiredBuffs: ${JSON.stringify(this.buffList)}`);
            this.server_syncBuff();
        }
    }

    private server_syncBuff() {
        const player = Player.getPlayer(this.userId);
        player && this.client_syncBuff(player, this.buffList);
    }

    /**
     * 检查某个全局buff是否存在并返回这个buff
     * @param type buff类型
     * @returns 
     */
    public checkBuffExistByType(type: EBuffType): boolean {
        return this.buffList.findIndex(v => { return v.type === type }) != -1;
    }

    public getBuffByType(type: EBuffType) {
        return this.buffList.find(v => { return v.type === type });
    }

    /**
     * 移除指定的全局buff
     * @param type 
     */
    public removeBuff(type: EBuffType) {
        if (!this.checkBuffExistByType(type)) {
            console.error(`DEBUG MyTypeError>>> 移除全局buff ${type} 失败，${JSON.stringify(this.buffList)}没找到`);
            return;
        }
        this.buffList.splice(this.buffList.findIndex(v => { return v.type === type }), 1);
        BuffDataHelper.reqSaveData(this.userId, this.buffList);
        this.server_updatePlayerStats();
        console.log(`DEBUG>>> server_checkAndRemoveExpiredBuffs: ${JSON.stringify(this.buffList)}`);
        this.server_syncBuff();
    }

    @RemoteFunction(Client)
    private async client_syncBuff(player, buffList) {
        this.buffList = buffList;
        await ModuleService.getModule(BuffModuleC).myBuffReady();
        const expBuff = this.buffList.find(v => { return v.type === EBuffType.DayExp });
        if (expBuff != undefined) {
            UIService.show(ExpBuffTipsHud);
        } else {
            UIService.hide(ExpBuffTipsHud);
        }
        this.buffList.forEach((buff) => {
            UIService.getUI(MainUI).addBuff(BuffDefine.getCfgByValueAndType(buff.value, buff.type), Math.floor((Date.now() - buff.startTimeStamp) / 1e3), buff.duration);
        });
    }

    // 存档内buff，单独计时和支持手动移除
    // 客户端的东西
    public archiveBuffList: ArchiveBuff[] = [];

    /**
     * 
     * @param archiveBuffList 
     */
    @RemoteFunction(Server)
    public server_netSyncArchiveBuffList(archiveBuffList: ArchiveBuff[]) {
        this.archiveBuffList = archiveBuffList;
    }

    /**
     * 检查某个buff是否存在并返回这个buff
     * @param type 
     * @returns 
     */
    public checkArchiveBuffExistByType(type: EBuffType): ArchiveBuff | undefined {
        return this.archiveBuffList.find(v => { return GameConfig.Buff.getElement(v.cfgId).type === type });
    }

    private saveArchiveBuff() {
        this.server_netSyncArchiveBuffList(this.archiveBuffList);
        ModuleService.getModule(ArchiveModuleC).reqSaveData([ArchiveDataType.BuffList], [this.archiveBuffList]);
    }

    /** 初始化所有buff */
    private async loadArchiveBuff() {
        const archiveId = ModuleService.getModule(ProcedureModuleC).myScript.archiveID;
        const archiveData = await ModuleService.getModule(ArchiveModuleC).reqDataByArchiveId(archiveId);
        this.saveTimer = this.saveTime;
        this.checkTimer = this.checkTime;
        this.useUpdate = true;
        ModuleService.getModule(ArchiveModuleC).reqSaveData([ArchiveDataType.BuffList], [this.archiveBuffList]);
        this.playerAttr.archiveId = archiveId;
        this.playerAttr.curDegree = archiveData.degree;
        this.archiveBuffList = archiveData.buffList ? archiveData.buffList : [];
        this.archiveBuffList.forEach(v => {
            this.updateArchiveBuffStat(v, AddOrRem.add);
            const cfg = GameConfig.Buff.getElement(v.cfgId);
            UIService.getUI(MainUI).addBuff(cfg, v.elapse, cfg.duration);
        });
        this.buffList.forEach(v => {
            UIService.getUI(MainUI).addBuff(BuffDefine.getCfgByType(v.type), Math.floor((Date.now() - v.startTimeStamp) / 1e3), v.duration);
        });
        this.server_netSyncArchiveBuffList(this.archiveBuffList);
    }

    public clearAllArchiveBuff() {
        this.archiveBuffList.forEach((buff) => {
            buff.interval && clearInterval(buff.interval);
            this.updateArchiveBuffStat(buff, AddOrRem.rem);
            UIService.getUI(MainUI).removeBuff(GameConfig.Buff.getElement(buff.cfgId).type);
        });
        this.archiveBuffList.length = 0;
        this.saveArchiveBuff();
    }

    /**
     * 添加buff - 可能会有100毫秒左右的误差
     * @param cfgIds 支持添加多个buff
     */
    public addArchiveBuff(cfgIds: number[]) {
        if (cfgIds.length === 0) { return; }
        cfgIds.forEach(cfgId => {
            let cfg = GameConfig.Buff.getElement(cfgId);
            if (!cfg) {
                console.error(`DEBUG MyTypeError>>> buff配置中没有这个 cfgId: ${cfgId}`);
                return;
            }
            // 如果有这个buff类型就先移除这个buff
            if (this.checkArchiveBuffExistByType(cfg.type)) {
                this.removeArchiveBuff(cfgId);
            }
            let newBuff = new ArchiveBuff();
            newBuff.cfgId = cfgId;
            newBuff.duration = cfg.duration;
            this.archiveBuffList.push(newBuff);
            this.updateArchiveBuffStat(newBuff, AddOrRem.add);
            UIService.getUI(MainUI).addBuff(cfg, newBuff.elapse, cfg.duration);
        });
        this.server_netSyncArchiveBuffList(this.archiveBuffList);
    }

    public removeArchiveBuff(cfgId: number) {
        const buffId = this.archiveBuffList.findIndex(v => { return v.cfgId === cfgId });
        if (buffId === -1) { return; }
        const buff = this.archiveBuffList[buffId];
        buff.interval && clearInterval(buff.interval);
        this.archiveBuffList.splice(buffId, 1);
        this.updateArchiveBuffStat(buff, AddOrRem.rem);
        UIService.getUI(MainUI).removeBuff(GameConfig.Buff.getElement(cfgId).type);
        this.server_netSyncArchiveBuffList(this.archiveBuffList);
    }

    private checkArchiveBuffExpire() {
        if (SystemUtil.isServer()) { return; }

        this.archiveBuffList.forEach(buff => {
            buff.elapse += this.checkTime;
            if (buff.elapse >= buff.duration) {
                this.removeArchiveBuff(buff.cfgId);
            }
        });
    }

    /**
     * 更新某一个buff的对应玩家的属性状态
     * @param buff 
     * @param addOrRem 增加或者是删除
     */
    private updateArchiveBuffStat(buff: ArchiveBuff, addOrRem: AddOrRem = AddOrRem.add) {
        const buffCfg = GameConfig.Buff.getElement(buff.cfgId);
        if (!buffCfg) { console.error(`DEBUG MyType Error>>> 更新玩家属性失败，buffId: ${buff.cfgId} 不存在`); return; }
        // 扩展
        if (buffCfg.isEx) {
            const cfgEx = GameConfig.BuffEx.getElement(buffCfg.value);
            // 是一个定时器吗
            let isInterval: boolean = false;
            if (cfgEx.interval != null && cfgEx.interval != undefined) { isInterval = true; }
            const strList: string[] = [];
            const valueList: number[] = [];
            const degreeIndex = this.playerAttr.curDegree - 1;
            PlayerAttr.exList.forEach(str => {
                if (cfgEx[str] != null && cfgEx[str] != undefined) {
                    if (isInterval) {
                        valueList.push(cfgEx[str][degreeIndex]);
                        strList.push(str);
                    } else {
                        this.playerAttr[str] += addOrRem * cfgEx[str][degreeIndex];
                        console.log(`DEBUG>>> updateArchiveBuffStat success ${str} : ${this.playerAttr[str]}`);
                    }
                }
            });
            if (isInterval && strList.length != 0 && valueList.length === strList.length && AddOrRem.add === addOrRem) { this.createInterval(buff, cfgEx.interval[degreeIndex], strList, valueList); }
        } else {

        }
    }

    /**
     * 创建buff定时器
     * @param buff buff
     * @param valueTime 生效时间 秒
     * @param strList 每次生效产生的效果
     * @param valueList 每次生效产生的效果值
     */
    private createInterval(buff: ArchiveBuff, valueTime: number, strList: string[], valueList: number[]) {
        console.log(`DEBUG>>> createInterval success strList : ${JSON.stringify(strList)}  valueList: ${JSON.stringify(valueList)}`);
        buff.interval = setInterval(() => {
            strList.forEach((str, index) => {
                switch (str) {
                    case "changeHp":
                        ModuleService.getModule(PlayerModuleC).changeHp(valueList[index]);
                        break;
                }
            });
        }, valueTime * 1e3);
    }

    private clearArchiveBuff(data: any) {
        this.useUpdate = false;
        UIService.getUI(MainUI).clearBuff();
        this.archiveBuffList.forEach(buff => {
            buff.interval && clearInterval(buff.interval);
            this.updateArchiveBuffStat(buff, AddOrRem.rem);
        });
        // 没有数据的结束是返回主菜单的操作需要保存数据 - 否则不需要保存数据
        if (!data) ModuleService.getModule(ArchiveModuleC).forceSaveData([ArchiveDataType.BuffList], [[...this.archiveBuffList]], this.playerAttr.archiveId);
        this.playerAttr.archiveId = -1;
        this.archiveBuffList.length = 0;
        this.server_netSyncArchiveBuffList(this.archiveBuffList);
    }

    protected onStart(): void {
        if (SystemUtil.isClient()) {
            this.useUpdate = false;
            ModuleService.ready().then(() => { ModuleService.getModule(BuffModuleC).registerState(this); });
            Event.addLocalListener("PlayerAlready", this.loadArchiveBuff.bind(this));
            Event.addLocalListener(Event_GameEnd, this.clearArchiveBuff.bind(this));
        } else {
            this.useUpdate = true;
            this.playerAttr = new PlayerAttr();
        }
    }
}

enum AddOrRem {
    /** 增加buff */
    add = 1,
    /** 移除buff */
    rem = -1
}

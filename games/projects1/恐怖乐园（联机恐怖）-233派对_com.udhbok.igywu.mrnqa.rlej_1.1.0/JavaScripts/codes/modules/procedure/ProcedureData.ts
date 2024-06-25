/*
 * @Author       : dal
 * @Date         : 2023-11-16 17:34:47
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-23 19:29:11
 * @FilePath     : \1003_hospital\JavaScripts\codes\modules\procedure\ProcedureData.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { EGameTheme, GamesStartDefines } from "../../Defines";
import GameStart from "../../GameStart";
import { MapEx } from "../../utils/MapEx";
import { ArchiveDataType, ArchiveHelper } from "../archive/ArchiveHelper";
import { DegreeType } from "../blackboard/BoardDefine";
import RouteConst from "../route/RouteConst";
import { ProcedureModuleS } from "./ProcedureModuleS";
import GlobalDataHelper from "./ui/GlobalDataHelper";


export default class ProcedureData extends Subdata {

    /**
     * 通过的难度
     * @deprecated 不再维护（2024/5/23），用newPassedDegreesMap
     */
    @Decorator.persistence()
    passedDegrees: number[] = [];

    /** 已通过的关卡 key 是游戏主题 - value是passedDegrees */
    @Decorator.persistence()
    newPassedDegreesMap: MapEx.MapExClass<number[]> = {};

    passedDegreesAction: Action = new Action();

    /**
     * 新解锁的难度
     * @deprecated 不再维护（2024/5/23），用newDegreeListMap
     */
    @Decorator.persistence()
    newDegreeList: DegreeType[] = [];

    /** 已通过的关卡 key 是游戏主题 - value是newDegreeList */
    @Decorator.persistence()
    newDegreeListMap: MapEx.MapExClass<DegreeType[]> = {};

    @Decorator.persistence()
    notebookMap: MapEx.MapExClass<boolean> = {};

    /**
     * 获取通关过的难度
     * @param gameTheme 游戏主题 可以不填，不填就是 本游戏的
     */
    public getPassedDegrees(gameTheme?: EGameTheme) {
        if (!gameTheme) { gameTheme = GamesStartDefines.gameTheme; }
        let arr = MapEx.get(this.newPassedDegreesMap, gameTheme);
        return arr ? arr : [];
    }

    /** 增加新的通关记录 */
    public addNewPassedDegrees(degree: DegreeType) {
        let arr = this.getPassedDegrees();
        arr.push(degree);
        MapEx.set(this.newPassedDegreesMap, GamesStartDefines.gameTheme, arr);
    }

    /**
     * 获取新解锁的难度
     * @param gameTheme 游戏主题 可以不填，不填就是 本游戏的
     */
    public getNewDegreeList(gameTheme?: EGameTheme) {
        if (!gameTheme) { gameTheme = GamesStartDefines.gameTheme; }
        let arr = MapEx.get(this.newDegreeListMap, gameTheme);
        return arr ? arr : [];
    }

    /** 增加新的通关记录 */
    public addNewDegreeList(newDegree: DegreeType) {
        let arr = this.getNewDegreeList();
        arr.push(newDegree);
        MapEx.set(this.newDegreeListMap, GamesStartDefines.gameTheme, arr);
    }

    /** 移除新的难度 */
    public removeNewDegreeList(newDegree: DegreeType) {
        let arr = this.getNewDegreeList();
        arr.splice(arr.indexOf(newDegree), 1);
        MapEx.set(this.newDegreeListMap, GamesStartDefines.gameTheme, arr);
    }

    /** 需要该数据的游戏 */
    private readonly needFixGameThemeArr: EGameTheme[] = [EGameTheme.School, EGameTheme.Hospital, EGameTheme.Graveyard, EGameTheme.Town];

    /**
     * 初始化通关难度map重置迁移一次数据
     * 之前迁移的数据有问题，重新迁移一次
     */
    private reMigrateData() {
        this.needFixGameThemeArr.forEach(v => {
            MapEx.set(this.newPassedDegreesMap, v, this.passedDegrees);
        });
        this.needFixGameThemeArr.forEach(v => {
            MapEx.set(this.newDegreeListMap, v, this.newDegreeList);
        });
    }

    /** 数据迁移 */
    public async migrate(userId: string) {
        const oldKey = `${userId}_SubData_ProcedureData`;
        const dataRes = (await DataStorage.asyncGetOtherGameData(RouteConst.getGameIdByGameTheme(GamesStartDefines.gameTheme), oldKey)).data as ProcedureData;
        // this.passedDegrees = dataRes["passedDegrees"];
        // this.newDegreeList = dataRes["newDegreeList"];
        MapEx.set(this.newPassedDegreesMap, GamesStartDefines.gameTheme, dataRes["passedDegrees"]);
        MapEx.set(this.newDegreeListMap, GamesStartDefines.gameTheme, dataRes["newDegreeList"]);
        this.save(true);
        console.log(`DEBUG>>> 迁移ProcedureData数据成功 this.passedDegrees = ${this.newPassedDegreesMap} this.newDegreeList = ${this.newDegreeListMap}`);
    }

    /** 数据迁移 */
    public async getTargetGameThemePassInfo(userId: string, gameTheme: EGameTheme) {
        const key = `${userId}_SubData_ProcedureData`;
        const dataRes = (await DataStorage.asyncGetData(key)).data as ProcedureData;
        const passInfo: number[] = dataRes[`${gameTheme}_passedDegrees`];
        return passInfo;
    }

    /** 笔记解锁的回调 */
    noteUnlockAction: Action = new Action();

    protected get version(): number {
        return 2;
    }

    /** 是否需要重新迁移数据 */
    private needReMigrate = true;

    protected override initDefaultData(): void {
        this.needReMigrate = false;
    }

    /**
     * 初始化次数据
     */
    protected onDataInit(): void {
        if (!this.notebookMap) { this.notebookMap = {}; }

        while (this.currentVersion != this.version) {
            switch (this.currentVersion) {
                case 1:
                    this.currentVersion = 2;
                    this.needReMigrate && this.reMigrateData();
                    break;
                default:
                    console.error("未处理的数据版本", this.currentVersion);
                    this.currentVersion = this.version;
                    break;
            }
            this.save(false);
        }
    }

    /** 是否通过某种难度 */
    public isDegreePassed(degree: DegreeType) {
        return this.getPassedDegrees().includes(degree);
    }

    /**
     * 通过难度
     * @param degree
     */
    public passDegree(degree: DegreeType) {
        if (this.isDegreePassed(degree)) { return; }
        this.addNewPassedDegrees(degree);
        if (!GameStart.IsAPackage) {
            if (degree >= 2 && degree < 5) { this.unlockNewDegree(degree + 1) };
        }
        this.save(true);
        GlobalDataHelper.addPassNum(degree);
        this.passedDegreesAction.call(degree);
    }

    /** 解锁了一个新的难度 */
    public unlockNewDegree(newDegree: DegreeType) {
        this.addNewDegreeList(newDegree);
        this.save(true);
    }

    /** 从解锁难度列表中移除 */
    public removeNewDegree(degree: DegreeType) {
        this.removeNewDegreeList(degree);
        this.save(true);
    }

    /** 看某一个笔记是否解锁 */
    public getNoteIsUnlockById(cfgId: number) {
        if (!MapEx.has(this.notebookMap, cfgId)) {
            MapEx.set(this.notebookMap, cfgId, false);
        }
        return MapEx.get(this.notebookMap, cfgId);
    }

    /** 根据存档来加载笔记 */
    public async loadNoteByArchive(userId: string) {
        // 加载前，先把存档清空
        MapEx.forEach(this.notebookMap, (k) => { MapEx.set(this.notebookMap, k, false) });
        this.save(true);
        // 加载存档
        const archiveData = await ArchiveHelper.reqGetData(userId, ProcedureModuleS.getScriptByUserID(userId).archiveID);
        archiveData.unlockedNotes.forEach(noteCfgId => {
            this.writeNoteByCfgId(noteCfgId);
        });
    }

    /** 根据配置来写笔记 */
    public writeNoteByCfgId(cfgId: number) {
        MapEx.set(this.notebookMap, cfgId, true);
        this.save(true);
        this.noteUnlockAction.call(cfgId);
    }

    /** 初始化笔记 */
    public initNote(userId: string, archiveId: number) {
        if (!this.notebookMap) {
            this.notebookMap = {};
        }
        MapEx.forEach(this.notebookMap, (k) => { MapEx.set(this.notebookMap, k, false) });
        this.save(true);

        // 解锁初始化默认的
        GameConfig.Global.defaultNoteIdList.array1d && GameConfig.Global.defaultNoteIdList.array1d.forEach(cfgID => this.unlockNote(cfgID, userId, archiveId));
    }

    /** 解锁一个笔记 */
    public async unlockNote(cfgId: number, userId: string, archiveId?: number) {
        if (archiveId === -1 || !archiveId) { archiveId = ProcedureModuleS.getScriptByUserID(userId).archiveID }
        let unlockedNotes: number[] = (await ArchiveHelper.reqGetData(userId, archiveId)).unlockedNotes;
        if (unlockedNotes.includes(cfgId)) { return; }
        unlockedNotes.push(cfgId);
        ArchiveHelper.reqSetData(userId, [ArchiveDataType.UNLOCKEDNOTES], [unlockedNotes]);
        this.writeNoteByCfgId(cfgId);
    }
}

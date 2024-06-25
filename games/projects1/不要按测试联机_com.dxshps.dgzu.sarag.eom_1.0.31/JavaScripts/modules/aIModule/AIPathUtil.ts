import { Level_1_aiLockPath, Level_1_aiPath } from "./LevelPrefabAIPath/Level_1_aipath";
import { Level_2_aiLockPath, Level_2_aiPath } from "./LevelPrefabAIPath/Level_2_aipath";
import { Level_3_aiLockPath, Level_3_aiPath } from "./LevelPrefabAIPath/Level_3_aipath";
import { Level_4_aiLockPath, Level_4_aiPath } from "./LevelPrefabAIPath/Level_4_aipath";
import { Level_5_aiLockPath, Level_5_aiPath } from "./LevelPrefabAIPath/Level_5_aipath";
import { Level_6_aiLockPath, Level_6_aiPath } from "./LevelPrefabAIPath/Level_6_aipath";
import { Level_7_aiLockPath, Level_7_aiPath } from "./LevelPrefabAIPath/Level_7_aipath";
import { Level_8_aiLockPath, Level_8_aiPath } from "./LevelPrefabAIPath/Level_8_aipath";

// 常规寻路点
type aiNormalPathBase = {
    parentName: string;
    guid: string;
    name: string;
    mType: string;
    pos: {
        X: number;
        Y: number;
        Z: number;
    };
}[]

// 固定寻路点
type aiLockPath = {
    name: string;
    mIndex: string;
    posList: {
        guid: string;
        name: string;
        mIndex: number;
        mType: string;
        pos: {
            X: number;
            Y: number;
            Z: number;
        };
    }[];
}[]

/**点位类型 */
export enum AIActType {
    /**出生点 */
    Born = 0,
    /**普通点位 */
    Walk,
    /**冲刺点位 */
    Run,
    /**跳跃点位 */
    Jump,
    /**飞扑滞空点位 */
    Fly,
    /**待机点位 */
    Idle,
    /**检查点 */
    CheckPoint,
    /**等待点位 */
    Wait,
}

export class PathInfo {
    /**
     * 当前点位类型
     * 0-出生点
     * 1-普通点位
     * 2-冲刺点位
     * 3-跳跃点位
     * 4-飞扑滞空点位
     * 5-待机点位
     * 6-检查点
     * 7-等待点位
     */
    public type: AIActType;
    /**
     * 当前点位的位置数组
     */
    public pos: Vector;

}

/**
 * 常规寻路点
 */
export class AINormalPath {
    /**节点下标 */
    public index: number = null;
    /**当前下标中所有的点 */
    public pointList: PathInfo[] = null;
}

/**
 * 固定寻路点
 */
export class AILockPath {
    /**标记 */
    public id: number = null;
    /**本条路线中所有的点 */
    public pointList: PathInfo[] = null;
}
/**
 * 根据工具导出寻路数据，生成寻路点
 */
export default class AIPathUtil {

    /**
     * 通过不同的levelid，获取不同的寻路点，本来想让各个关卡传，但是目前关卡统一用一个脚本，也得写一堆判断，所以放这里
     * @param levelID id
     * @param prefabObjTrans 关卡预制体根节点transform，坐标存的是相对坐标，需要转换
     */
    public static getNormalPath(levelID: number, prefabObjTrans: mw.Transform) {
        let data = this.getNormalPathBase(levelID);
        if (!data) return null;
        // 根据数据解析生成寻路点
        let pointList = new Map<number, AINormalPath>();
        let newV = Vector.zero;
        for (let i = 0; i < data.length; i++) {
            let index = Number(data[i].parentName.split("_")[0]);
            let pathData: AINormalPath = null;
            if (!pointList.has(index)) {
                pathData = new AINormalPath();
                pathData.index = index;
                pathData.pointList = [];
                pointList.set(index, pathData);
            }
            pathData = pointList.get(index);

            newV.x = Number(data[i].pos.X);
            newV.y = Number(data[i].pos.Y);
            newV.z = Number(data[i].pos.Z);
            pathData.pointList.push({
                type: Number(data[i].mType),
                pos: prefabObjTrans.transformPosition(newV)
            })
        }

        return pointList;
    }

    /**
     * 根据关卡id获取固定寻路点
     * @param levelID id
     * @param prefabObjTrans 关卡预制体根节点transform，坐标存的是相对坐标，需要转换
     * @returns 
     */
    public static getLockPath(levelID: number, prefabObjTrans: mw.Transform) {
        let data = this.getLockPathBase(levelID);
        if (!data) return null;
        // 根据数据解析生成寻路点
        let pointList = new Array<AILockPath>();
        let newV = Vector.zero;
        for (let i = 0; i < data.length; i++) {
            // 存的是多条路径
            let onePath = new AILockPath();
            onePath.id = Number(data[i].mIndex);
            onePath.pointList = [];
            let points = data[i].posList;
            for (let j = 0; j < points.length; j++) {
                newV.x = Number(points[j].pos.X);
                newV.y = Number(points[j].pos.Y);
                newV.z = Number(points[j].pos.Z);
                onePath.pointList.push({
                    type: Number(points[j].mType),
                    pos: prefabObjTrans.transformPosition(newV)
                })

            }
            pointList.push(onePath);
        }
        return pointList;
    }

    /**
     * 根据关卡id获取常规寻路点
     * @param levelID id
     * @returns 
     */
    private static getNormalPathBase(levelID: number): aiNormalPathBase {

        if (levelID == 10001) {
            return Level_1_aiPath;
        }
        else if (levelID == 10002) {
            return Level_2_aiPath;
        }
        else if (levelID == 10003) {
            return Level_3_aiPath;
        }
        else if (levelID == 10004) {
            return Level_4_aiPath;
        }
        else if (levelID == 10005) {
            return Level_5_aiPath;
        }
        else if (levelID == 10006) {
            return Level_6_aiPath;
        }
        else if (levelID == 10007) {
            return Level_7_aiPath;
        }
        else if (levelID == 10008) {
            return Level_8_aiPath;
        }
        return null
    }

    /**
     * 根据关卡id获取固定寻路点
     * @param levelID id
     * @returns 
     */
    private static getLockPathBase(levelID: number): aiLockPath {
        if (levelID == 10001) {
            return Level_1_aiLockPath;
        }
        else if (levelID == 10002) {
            return Level_2_aiLockPath;
        }
        else if (levelID == 10003) {
            return Level_3_aiLockPath;
        }
        else if (levelID == 10004) {
            return Level_4_aiLockPath;
        }
        else if (levelID == 10005) {
            return Level_5_aiLockPath;
        }
        else if (levelID == 10006) {
            return Level_6_aiLockPath;
        }
        else if (levelID == 10007) {
            return Level_7_aiLockPath;
        }
        else if (levelID == 10008) {
            return Level_8_aiLockPath;
        }
        return null
    }
}

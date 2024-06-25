
export enum DressType {
    /**宠物 */
    Pet = 5,
    /**背部挂件 */
    Back = 0,
    /**肩部挂件 */
    Shoulder = 1,
    /**拖尾挂件 */
    Tail = 2,
    /**特效挂件 */
    Effect = 3,
    /**头衔挂件 */
    Head = 4,

}

export class SuitInfo {
    /** 宠物配置Id */
    public petId: number = -1
    /** 当前装扮 */
    public suit: number[] = new Array(5);
}

/**
 * 宠物强化类型，和配置表的id一一对应
 */
export enum PetStrengthenType {
    /**冲刺加速度 */
    SprintAccel = 10001,
    /**冲刺持续时间 */
    SprintDuration = 10002,
    /**移动最大速度 */
    MoveMaxSpeed = 10003,
    /**冲刺最大速度 */
    SprintMaxSpeed = 10004,
    /**移动加速度 */
    MoveAccel = 10005,
    /**冲刺cd */
    SprintCd = 10006
}

// export class PetModuleData extends Subdata {

    

// }
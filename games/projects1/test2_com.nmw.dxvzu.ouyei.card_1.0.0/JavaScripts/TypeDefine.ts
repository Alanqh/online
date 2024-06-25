export enum SprintStateType {
    none,
    preSprint,
    sprint,
    emergencyStop,
}

export class AnimAssets {
    sprint: string;
    emergencyStop: string;
    multiJump: string;
}

export class EffectAssets {
    run: string;
	sprint: string;
    multiJump: string;
	landed: string;
    velocityLine: string;
}

export enum SyncStateType {
    startSprint,
    stopSprint,
    emergencyStop,
    multiJump,
    fly,
    run,
}

export class SyncState {
    stateType = SyncStateType.stopSprint;
    private forceRep = false; // 用于强制触发属性同步

    // 网络同步数据编码
    // 强制同步位|    动画类型
    //      1   | 0 0 0 0 0 0 1
    serialize(): number {
        this.forceRep = !this.forceRep;
        let result = 0b00000000;
        let mask = 0b10000000;
        result |= this.stateType;
        result |= this.forceRep ? mask : 0;
        return result;
    }

    unserialize(data: number): void {
        this.stateType = data & 0b01111111;
    }
}
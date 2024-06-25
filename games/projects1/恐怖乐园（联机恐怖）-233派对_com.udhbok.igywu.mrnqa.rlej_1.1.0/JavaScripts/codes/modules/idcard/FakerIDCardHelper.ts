
/** 名片错误信息类型 */
export enum FakerErrorInfoType {

    /**      - 等级错误：-100到-1的随机负的整数（比如-66级这种） */
    Level,
    /**      - 好友ID：数字替换为字数相同的纯字母（大小写混合） */
    Id,
    /**      - 性别/点赞/礼物图标：换成骷髅之类的恐怖icon */
    Icon,
    /**      - 性别、昵称位置颠倒 */
    SexAndNameReplace,
    /**      - 信息空白：除了个性签名保留之外，昵称等其它控件隐藏 */
    InfoEmpty,
    /**      - 没有章（到时候会在正常的名片里给所有玩家名片添加印章） */
    NoBadge,
}

/**
 * 错误数： 15%名片没有错误，75%出现1种错误，10%出现2种错误
 */
// 分别对应 0, 2，1
const ErrorCountArr: number[] = [0.10, 0.15, 0.75];

/** 回收时间， 毫秒 */
export const recycleTime: number = 3e5;

/** 错误信息随机数组 */
const FakerErrorArr: number[] = [FakerErrorInfoType.Level, FakerErrorInfoType.Id, FakerErrorInfoType.Icon,
FakerErrorInfoType.SexAndNameReplace, FakerErrorInfoType.InfoEmpty, FakerErrorInfoType.NoBadge];

export default class FakerIDCardHelper {
    private static _instance: FakerIDCardHelper;

    public static get instance() {
        if (!this._instance) {
            this._instance = new FakerIDCardHelper();
        }
        return this._instance;
    }

    private constructor() { }

    private errorTypeMap: Map<string, FakerErrorInfoType[]> = new Map();

    /** 获取错误类型，将会根据错误类型打开一个名片 */
    public getErrorType(fakerId: string) {
        let errorArr: FakerErrorInfoType[] | undefined = this.errorTypeMap.get(fakerId);
        if (!errorArr) {
            let r = Math.random();
            let errorCount = 1;
            if (ErrorCountArr[0] > r) {
                errorCount = 0;
            } else if (ErrorCountArr[1] > r) {
                errorCount = 2;
            }
            errorArr = [];
            let id = 0;
            let newArr = Array.from(FakerErrorArr);
            while (id++ < errorCount) {
                let arrIndex = MathUtil.randomInt(0, newArr.length);
                errorArr.push(newArr.splice(arrIndex, 1)[0]);
                this.errorTypeMap.set(fakerId, errorArr);
                // 五分钟换一次
                setTimeout(() => {
                    this.errorTypeMap.delete(fakerId);
                }, recycleTime);
            }
        }
        console.log(`DEBUG>>> getErrorType success errorArr = ${JSON.stringify(errorArr)}`);
        return errorArr;
    }
}
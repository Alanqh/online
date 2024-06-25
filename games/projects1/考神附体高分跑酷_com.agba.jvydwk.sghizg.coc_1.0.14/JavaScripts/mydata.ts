export default class mydata extends Subdata {
    /**进度，重生次数， */
    @Decorator.persistence()
    pro: number;
    @Decorator.persistence()
    reborn: number;
    @Decorator.persistence()
    cup: number;//奖杯数量
    @Decorator.persistence()
    score: number;//分数
    @Decorator.persistence()
    dressunlock: number[];//装扮解锁
    @Decorator.persistence()
    tailunlock: number[];//拖尾解锁
    @Decorator.persistence()
    wingunlock: number[];//翅膀解锁
    @Decorator.persistence()
    avaunlock: number[];//变身解锁

    /**初始化数据，当远端数据不存在时，会调用这个方法来初始化数据 */
    public initDefaultData(): void {
        this.pro = 0
        this.reborn = 0
        this.cup = 0
        this.score = 0
        this.dressunlock = []
        this.tailunlock = []
        this.wingunlock = []
        this.avaunlock = []
    }
    /**版本升级开始 */
    protected onDataInit(): void {
        while (this.version != this.currentVersion) {
            switch (this.currentVersion) {
                case 1:
                    //假如数据版本还是1，那么就需要进行升级
                    this.currentVersion = 2
                    //在升级的地方对新字段进行初始化
                    this.avaunlock = []
                    break;

                default:
                    console.log("未处理的数据版本")
                    break;
            }
        }
    }
    //重写获取版本号的接口，通过该接口来指定版本号
    protected get version(): number {
        return 2
    }
    /**版本升级结束 */


    /**增减数据 */
    public change(dat: string, value: number, n: number) {
        //只要是n是1就是增减保存
        if (n === 1) {
            this[dat] += value
        } else if (n === 0) {
            this[dat] = value
        }
        // 修改完自动保存一次数据
        this.save(true)
    }
    public changelock(word: string, value: number, n: number) {
        let unlock: number[]
        if (word == "换装") {
            unlock = this.dressunlock
        } else if (word == "拖尾") {
            unlock = this.tailunlock
        } else if (word == "翅膀") {
            unlock = this.wingunlock
        } else if (word == "变身") {
            unlock = this.avaunlock
        }
        //只要n是1，就是增加数据
        if (n === 1) {
            unlock.push(value);
        } else if (n === 0) {
            unlock.length = 0
        }
        // 修改完自动保存一次数据
        this.save(true)
        // console.log("执行了")
    }

    public savedata() {
        this.save(true)
    }

}
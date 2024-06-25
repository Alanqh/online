
@Component
export default class StatScript extends Script {

    public monitorMgr: MonitorMgr = null

    @Property({ replicated: true })
    public reciveInfo: string = ""

    @Property({ replicated: true })
    public sendInfo: string = ""

    @Property({ replicated: true })
    public cacheInfo: string = ""

    @Property({ replicated: true })
    public statInfo: string = ""

    private statUI: StatUI = null

    protected onStart(): void {
        this.monitorMgr = new MonitorMgr(this)
        if (SystemUtil.isClient()) {
            this.statUI = new StatUI(this)
        }
        this.useUpdate = true

    }


    protected onUpdate(dt: number): void {
        this.monitorMgr.onUpdate(dt)
        if (SystemUtil.isServer()) {
            this.statInfo = this.getStatInfo()
        } else {
            this.statUI.onUpdate(dt)
        }
    }

    public getStatInfo() {
        let usedMemory = "当前使用内存" + DebugUtil.usedMemory
        let frameTime = "帧耗时：" + DebugUtil.frameTime
        let threadTime = "线程耗时：" + DebugUtil.gameThreadTime
        let renderTime = "帧渲染耗时：" + DebugUtil.renderThreadTime


        let send = "一秒内发出的网络包总大小：" + DebugUtil.sentBytes
        let sendRpc = "一秒内发出的RPC数量：" + DebugUtil.sentRPCs.length

        let cached = "当前帧缓存的RPC数量：" + DebugUtil.cachedRPCs.length
        let received = "一秒内收到的网络包总大小：" + DebugUtil.receivedBytes
        let receivedRpc = "当前帧收到的RPC数量：" + DebugUtil.receivedRPCs.length

        return usedMemory + "\n" + frameTime + "\n" + threadTime + "\n" + renderTime + "\n"
            + send + "\n" + sendRpc + "\n" + cached + "\n" + received + "\n" + receivedRpc
    }

}

/**
 * RPC监控管理器
 */
class MonitorMgr {
    private reciveRPC: RPCMonitor = null
    private sendRPC: RPCMonitor = null
    private cacheRPC: RPCMonitor = null

    private statScript: StatScript = null

    constructor(statScript: StatScript) {
        this.statScript = statScript

        this.reciveRPC = new RPCMonitor(RPCType.Recive)
        this.sendRPC = new RPCMonitor(RPCType.Send)
        this.cacheRPC = new RPCMonitor(RPCType.Cache)
    }

    onUpdate(dt: number) {
        this.reciveRPC.freshData()
        this.sendRPC.freshData()
        this.cacheRPC.freshData()
        if (SystemUtil.isServer()) {
            this.statScript.reciveInfo = this.getStr(RPCType.Recive)
            this.statScript.sendInfo = this.getStr(RPCType.Send)
            this.statScript.cacheInfo = this.getStr(RPCType.Cache)
        }
    }

    public getStr(rpcType: RPCType) {
        if (rpcType == RPCType.Recive) {
            return this.reciveRPC.getDataStr()
        } else if (rpcType == RPCType.Send) {
            return this.sendRPC.getDataStr()
        } else if (rpcType == RPCType.Cache) {
            return this.cacheRPC.getDataStr()
        }
    }
}

/**
 * RPC监控类型
 */
enum RPCType {
    Recive,
    Send,
    Cache
}

/**
 * RPC监控
 */
class RPCMonitor {
    private rpcMap: Map<string, number> = new Map()
    private tsRPCMap: Map<string, number> = new Map()

    public rpcType: RPCType

    constructor(rpcType: RPCType) {
        this.rpcType = rpcType
    }

    public freshData() {
        let rpcArray: string[] = []
        switch (this.rpcType) {
            case RPCType.Recive:
                rpcArray = DebugUtil.receivedRPCs
                break;
            case RPCType.Send:
                rpcArray = DebugUtil.sentRPCs
                break;
            case RPCType.Cache:
                rpcArray = DebugUtil.cachedRPCs
                break;
            default:
                break;
        }
        for (const item of rpcArray) {
            const match = item.match(/Type:\s*(TSRPC|RPC),\s*Name:\s*([^,\s]+)/);
            if (match) {
                const type = match[1];
                const name = match[2];
                if (type === 'RPC') {
                    let count = this.rpcMap.get(name)
                    count ? this.rpcMap.set(name, count + 1) : this.rpcMap.set(name, 1)
                } else if (type === 'TSRPC') {
                    let count = this.tsRPCMap.get(name)
                    count ? this.tsRPCMap.set(name, count + 1) : this.tsRPCMap.set(name, 1)
                }
            }
        }
    }

    public getDataStr() {
        let str = "/////////////"
        switch (this.rpcType) {
            case RPCType.Recive:
                str += "<color=#00ff00ff>接收</color>到的RPC\n"
                break;
            case RPCType.Send:
                str += "<color=#ff0000ff>发送</color>的RPC\n"
                break;
            case RPCType.Cache:
                str += "<color=#ffff00ff>缓存</color>的RPC\n"
                break;
            default:
                break;
        }
        const tsRpc = Array.from(this.tsRPCMap.entries());
        tsRpc.sort((a, b) => b[1] - a[1]);

        const rpc = Array.from(this.rpcMap.entries());
        rpc.sort((a, b) => b[1] - a[1]);

        str += "<color=#00ff00ff>TSRPC</color>\n"
        for (let item of tsRpc) {
            str += item + "\n"
        }
        str += "\n"
        str += "<color=#0000ff>RPC</color>\n"
        for (let item of rpc) {
            str += item + "\n"
        }
        return str
    }


}

enum UIState {
    /**客户端实时性能 */
    ClientStat = 1,
    /**客户端收到的RPC信息 */
    ClientRecive = 2,
    /**客户端发送的RPC信息 */
    ClientSend = 3,
    /**客户端缓存的RPC信息 */
    ClientCache = 4,

    /**服务端实时性能 */
    ServerStat = 5,
    /**服务端收到的RPC信息 */
    ServerRecive = 6,
    /**服务端发送的RPC信息 */
    ServerSend = 7,
    /**服务端缓存的RPC信息 */
    ServerCache = 8
}

/**
 * UI
 */
class StatUI {
    public rootCanvas: Canvas = null
    public textBlock: TextBlock = null
    public scrollBox: ScrollBox = null
    public btnS: StaleButton = null
    public btnC: StaleButton = null

    public canvas: Canvas = null

    public openBtn: StaleButton = null
    // 收
    public rpcReciveBtn: StaleButton = null
    // 发
    public rpcSendBtn: StaleButton = null
    // 缓存
    public rpcCacheBtn: StaleButton = null

    public statScript: StatScript = null

    private curState: UIState = null


    constructor(statScript: StatScript) {
        this.statScript = statScript
        this.init()
    }

    private init() {
        // 创建一个UI对象
        let ui = UserWidget.newObject();
        // 将UI添加到屏幕上
        ui.addToViewport(1)
        ui.zOrder = 999999
        // 创建一个画布组件
        this.rootCanvas = Canvas.newObject()
        this.rootCanvas.size = new Vector2(1920, 1080);
        this.rootCanvas.position = Vector2.zero
        // 将Ui的根画布设置为rootCanvas
        ui.rootContent = this.rootCanvas

        // Canvas
        this.canvas = Canvas.newObject()
        this.rootCanvas.addChild(this.canvas)
        this.canvas.size = new Vector2(800, 500)
        this.canvas.position = new Vector2(0, 250)

        // BG
        let bg = Image.newObject()
        bg.size = new Vector2(800, 500)
        this.canvas.addChild(bg)
        bg.imageGuid = "114028"
        bg.imageColor = new LinearColor(0.0625, 0.0625, 0.0625)

        // MS
        this.btnS = StaleButton.newObject()
        this.btnS.size = new Vector2(70, 250)
        this.canvas.addChild(this.btnS)
        this.btnS.position = new Vector2(730, 0)
        this.btnS.normalImageGuid = "114028"
        this.btnS.transitionEnable = true
        this.btnS.pressedImagColor = LinearColor.black
        this.btnS.normalImageColor = new LinearColor(0.13, 0.391, 0.337)
        this.btnS.text = "S"

        // MC
        this.btnC = StaleButton.newObject()
        this.btnC.size = new Vector2(70, 250)
        this.canvas.addChild(this.btnC)
        this.btnC.position = new Vector2(730, 250)
        this.btnC.normalImageGuid = "114028"
        this.btnC.transitionEnable = true
        this.btnC.pressedImagColor = LinearColor.black
        this.btnC.normalImageColor = new LinearColor(0.7835, 0.2102, 0.5077)
        this.btnC.text = "C"

        // OPEN
        this.openBtn = StaleButton.newObject()
        this.openBtn.size = new Vector2(100, 100)
        this.rootCanvas.addChild(this.openBtn)
        this.openBtn.position = new Vector2(0, 150)
        this.openBtn.normalImageGuid = "114028"
        this.openBtn.transitionEnable = true
        this.openBtn.pressedImagColor = LinearColor.black
        this.openBtn.normalImageColor = LinearColor.white
        this.openBtn.text = "性能"

        // rpcReciveBtn
        this.rpcReciveBtn = StaleButton.newObject()
        this.rpcReciveBtn.size = new Vector2(80, 80)
        this.canvas.addChild(this.rpcReciveBtn)
        this.rpcReciveBtn.position = new Vector2(100, -80)
        this.rpcReciveBtn.normalImageGuid = "114028"
        this.rpcReciveBtn.transitionEnable = true
        this.rpcReciveBtn.pressedImagColor = LinearColor.black
        this.rpcReciveBtn.normalImageColor = LinearColor.green
        this.rpcReciveBtn.text = "收"

        // rpcSendBtn
        this.rpcSendBtn = StaleButton.newObject()
        this.rpcSendBtn.size = new Vector2(80, 80)
        this.canvas.addChild(this.rpcSendBtn)
        this.rpcSendBtn.position = new Vector2(180, -80)
        this.rpcSendBtn.normalImageGuid = "114028"
        this.rpcSendBtn.transitionEnable = true
        this.rpcSendBtn.pressedImagColor = LinearColor.black
        this.rpcSendBtn.normalImageColor = LinearColor.red
        this.rpcSendBtn.text = "发"

        // rpcCacheBtn
        this.rpcCacheBtn = StaleButton.newObject()
        this.rpcCacheBtn.size = new Vector2(80, 80)
        this.canvas.addChild(this.rpcCacheBtn)
        this.rpcCacheBtn.position = new Vector2(260, -80)
        this.rpcCacheBtn.normalImageGuid = "114028"
        this.rpcCacheBtn.transitionEnable = true
        this.rpcCacheBtn.pressedImagColor = LinearColor.black
        this.rpcCacheBtn.normalImageColor = LinearColor.yellow
        this.rpcCacheBtn.text = "缓存"

        // ScrollBox
        this.scrollBox = ScrollBox.newObject()
        this.scrollBox.size = new Vector2(730, 500)
        this.canvas.addChild(this.scrollBox)

        // TextBlock
        this.textBlock = TextBlock.newObject()
        this.textBlock.isRichText = true
        this.textBlock.size = new Vector2(730, 3000)
        this.scrollBox.addChild(this.textBlock)
        this.textBlock.fontSize = 24
        this.textBlock.textAlign = TextJustify.Left
        this.textBlock.textVerticalAlign = TextVerticalJustify.Top

        // this.showPanel(false)
        this.bindBtn()
        this.switchState(UIState.ClientStat)
    }

    public onUpdate(dt: number) {
        this.freshInfo()
    }

    public freshInfo() {
        if (this.curState == null) { return }
        switch (this.curState) {
            case UIState.ClientStat:
                this.textBlock.text = "<color=#FF42C3>客户端</color>\n" + this.statScript.getStatInfo()
                break;
            case UIState.ClientRecive:
                this.textBlock.text = "<color=#FF42C3>客户端</color>\n" + this.statScript.monitorMgr.getStr(RPCType.Recive)
                break;
            case UIState.ClientSend:
                this.textBlock.text = "<color=#FF42C3>客户端</color>\n" + this.statScript.monitorMgr.getStr(RPCType.Send)
                break;
            case UIState.ClientCache:
                this.textBlock.text = "<color=#FF42C3>客户端</color>\n" + this.statScript.monitorMgr.getStr(RPCType.Cache)
                break;
            case UIState.ServerStat:
                this.textBlock.text = "<color=#00ffffff>服务端</color>\n" + this.statScript.statInfo
                break;
            case UIState.ServerRecive:
                this.textBlock.text = "<color=#00ffffff>服务端</color>\n" + this.statScript.reciveInfo
                break;
            case UIState.ServerSend:
                this.textBlock.text = "<color=#00ffffff>服务端</color>\n" + this.statScript.sendInfo
                break;
            case UIState.ServerCache:
                this.textBlock.text = "<color=#00ffffff>服务端</color>\n" + this.statScript.cacheInfo
                break;
            default:
                break;
        }
    }

    private switchState(state: UIState) {
        this.curState = state
    }

    private bindBtn() {
        this.openBtn.onClicked.add(() => {
            let cur = this.canvas.visible
            cur = !cur
            this.openBtn.text = cur ? "关闭" : "性能"
            this.showPanel(cur)
        })
        this.btnS.onClicked.add(() => {
            this.switchState(UIState.ServerStat)
        })
        this.btnC.onClicked.add(() => {
            this.switchState(UIState.ClientStat)
        })

        this.rpcReciveBtn.onClicked.add(() => {
            if (this.curState <= 4) {
                this.switchState(UIState.ClientRecive)
            } else {
                this.switchState(UIState.ServerRecive)
            }
        })

        this.rpcSendBtn.onClicked.add(() => {
            if (this.curState <= 4) {
                this.switchState(UIState.ClientSend)
            } else {
                this.switchState(UIState.ServerSend)
            }
        })

        this.rpcCacheBtn.onClicked.add(() => {
            if (this.curState <= 4) {
                this.switchState(UIState.ClientCache)
            } else {
                this.switchState(UIState.ServerCache)
            }
        })
    }

    private showPanel(flag: boolean) {
        this.canvas.visibility = flag ? SlateVisibility.Visible : SlateVisibility.Hidden
    }
}
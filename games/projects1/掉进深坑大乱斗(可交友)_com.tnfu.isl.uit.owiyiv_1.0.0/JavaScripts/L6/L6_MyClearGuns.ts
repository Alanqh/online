/**
 * MyClearGuns 开箱即用的枪械编辑器
 * 反馈帖: https://forum.ark.online/forum.php?mod=viewthread&tid=1687
 * 版本：v0.1.8  2023.12.23
 * 更新日志：
 * 1. 尝试修复连点器情况下超越全自动的射速
 * 2. 修整方法和事件，并给事件添加参数、回调
 * 3. 尝试修复开火听不到枪声的bug
 * 4. 尝试在不大幅增加rpc压力的情况下加入动画广播、枪焰特效
 * 5. 添加设定，在非编辑器PIE运行态下不会打开EditorUI，即使开启了这个选项
 * 6. 修改事件方法为静态，以减少初始化时序问题
 * 7. 新增双端获取玩家手里枪名的方法getPlayerGunName
 * 8. 新增当枪械guid为预制体时，开火时会自动播放含有FireEffect的特效
 * 作者：guangqi.hu
 */
import SettlementManager from "../SettlementManager";
// ---------[非UI类基元]---------- //
/**音效通用基元 */
class SoundUnit {
    /**音效guid */
    public guid: string;
    /**音效音量 */
    public volume: number;
    /**音效无衰内径，1=1个正方体边长=100 */
    public inner: number;
    /**音效外径 */
    public outter: number;
    constructor() {
        this.guid = "7994";
        this.volume = 1;
        this.inner = 3;
        this.outter = 12;
    }
}
/**枪械数据通用基元 */ 
class GunDataUnit {
    //--------[装备名称]--------
    /**枪械模型的名称 */
    public GunName: string;
    //--------[装备枪械]--------
    /**枪械模型GUID */
    public GunGUID: string;
    /**枪械模型的偏移 */
    public GunLoc: string;
    /**枪械模型的旋转 */
    public GunRot: string;
    /**枪械模型的缩放 */
    public GunScal: string;
    /**掏出枪械的动画 */
    public GetGunAnime: string;
    /**掏出枪械的音效 */
    public GetGunSound: string;
    /**掏枪出现枪模的时间，秒 */
    public GetGunShowTime: number;
    //--------[枪械开火]--------
    /** 有效射程 */
    public Range: number;
    /** 单发伤害 */
    public Projectil_Damage: number;
    /** 弹丸数量 */
    public Projectil_Count: number;
    /** 水平后坐力 */
    public Recoil_H: number;
    /** 垂直后坐力 */
    public Recoil_V: number;
    /** 散射程度 */
    public Spread: number;
    /** 是否全自动 */
    public FullAuto: boolean;
    /** 开火间隔 */
    public ShootDelay: number;
    /** 开火动画 */
    public ShootAnime: string;
    /** 开火音效 */
    public ShootSound: string;
    //--------[枪械开火]--------
    /** 当前子弹数 */
    public Ammo_CurNum: number;
    /** 弹匣理论载弹数 */
    public Ammo_MaxInOne: number;
    /** 备弹数 */
    public Ammo_CurPrepare: number;
    /** 最大备弹数 */
    public Ammo_MaxPrepare: number;
    /** 换弹耗时，秒 */
    public ReloadDelay: number;
    /** 换弹动画 */
    public ReloadAnime: string;
    /** 换弹开始音效 */
    public ReloadStartSound: string;
    /** 换弹结束音效 */
    public ReloadOverSound: string;
    constructor() {
        this.GunName = "scar-L"
        this.GunGUID = "43712";
        this.GunLoc = "4|0|0";
        this.GunRot = "0|0|-25";
        this.GunScal = "0.8|0.8|0.8";
        this.GetGunAnime = "97180";
        this.GetGunSound = "20429|1|3|6";
        this.GetGunShowTime = 0.5;
        this.Range = 20;
        this.Projectil_Damage = 30;
        this.Projectil_Count = 1;
        this.Recoil_H = 0.55;
        this.Recoil_V = 0.35;
        this.Spread = 0.2;
        this.FullAuto = true;
        this.ShootDelay = 100;
        this.ShootAnime = "80483";
        this.ShootSound = "12563|1|8|16";
        this.Ammo_CurNum = 30;
        this.Ammo_MaxInOne = 30;
        this.Ammo_CurPrepare = 180;
        this.Ammo_MaxPrepare = 360;
        this.ReloadDelay = 2;
        this.ReloadAnime = "33561";
        this.ReloadStartSound = "12525|1|3|6";
        this.ReloadOverSound = "12546|1|3|6";
    }
}

// ---------[UI类基元]---------- //
/**编辑态主要UI类 */
class MainUI extends UIScript {
    public lable0: TextBlock = undefined;
    public input0: InputBox = undefined;
    public lable1: TextBlock = undefined;
    public input1: InputBox = undefined;
    public lable2: TextBlock = undefined;
    public input2: InputBox = undefined;
    public lable3: TextBlock = undefined;
    public input3: InputBox = undefined;
    public lable4: TextBlock = undefined;
    public input4: InputBox = undefined;
    public lable5: TextBlock = undefined;
    public input5: InputBox = undefined;
    public lable6: TextBlock = undefined;
    public input6: InputBox = undefined;
    public lable7: TextBlock = undefined;
    public input7: InputBox = undefined;
    public lable8: TextBlock = undefined;
    public input8: InputBox = undefined;
    public lable9: TextBlock = undefined;
    public input9: InputBox = undefined;
    public lable10: TextBlock = undefined;
    public input10: InputBox = undefined;
    public lable11: TextBlock = undefined;
    public input11: InputBox = undefined;
    public lable12: TextBlock = undefined;
    public input12: InputBox = undefined;
    public lable13: TextBlock = undefined;
    public input13: InputBox = undefined;
    public lable14: TextBlock = undefined;
    public input14: InputBox = undefined;
    public lable15: TextBlock = undefined;
    public input15: InputBox = undefined;
    public lable16: TextBlock = undefined;
    public input16: InputBox = undefined;
    public lable17: TextBlock = undefined;
    public input17: InputBox = undefined;
    public lable18: TextBlock = undefined;
    public input18: InputBox = undefined;
    public lable19: TextBlock = undefined;
    public input19: InputBox = undefined;
    public lable20: TextBlock = undefined;
    public input20: InputBox = undefined;
    public lable21: TextBlock = undefined;
    public input21: InputBox = undefined;
    public lable22: TextBlock = undefined;
    public input22: InputBox = undefined;
    public lable23: TextBlock = undefined;
    public input23: InputBox = undefined;
    public lable24: TextBlock = undefined;
    public input24: InputBox = undefined;
    public lable25: TextBlock = undefined;
    public input25: InputBox = undefined;


    /**底部按钮容器 */
    public btnCanv: Canvas = undefined;

    /**界面显隐按钮 */
    public hideShowBtn: StaleButton = undefined;
    /**序列化按钮 */
    public enCodeBtn: StaleButton = undefined;
    /**反序列化按钮 */
    public deCodeBtn: StaleButton = undefined;
    /**获取GUID按钮 */
    public getGUIDBtn: StaleButton = undefined;

    /**装备枪械按钮 */
    public equipBtn: StaleButton = undefined;
    /**编辑态开火按钮 */
    public shootBtn: StaleButton = undefined;
    /**编辑态换弹按钮 */
    public ReloadBtn: StaleButton = undefined;


    /**输入输出框 */
    public downInput: InputBox = undefined;




    /**实例化 */
    public static instance: MainUI;
    public onAwake() {
        MainUI.instance = this;
        let size = WindowUtil.getViewportSize();
        this.rootCanvas.renderOpacity = 0.8;
        this.rootCanvas.zOrder = UILayerSystem;
        let _margin = new Margin(0.1);

        this.downInput = InputBox.newObject(this.rootCanvas);
        this.downInput.size = new Vector2(size.x - 40, size.y / 30);
        this.downInput.fontSize = 14;
        this.downInput.textLengthLimit = 999999;


        this.btnCanv = Canvas.newObject(this.rootCanvas);
        this.btnCanv.size = new Vector2(size.x, size.y / 20);

        this.downInput.position = new Vector2(20, size.y - 1.1 * this.downInput.size.y);
        this.downInput.text = MyClearGuns.instance.GunDataJsonList[0].GunDataJson;
        this.btnCanv.position = new Vector2(20, size.y - 1.1 * this.btnCanv.size.y - 1.1 * this.downInput.size.y);
        this.btnCanv.autoLayoutRule = new UILayout(10, _margin, UILayoutType.Horizontal, UILayoutPacket.LeftCenter, new UIHugContent(0, 0), true, false);


        this.hideShowBtn = StaleButton.newObject(this.rootCanvas);
        this.hideShowBtn.size = new Vector2(size.x / 14, size.y / 20);
        this.hideShowBtn.text = "界面显隐[X]";
        this.hideShowBtn.fontSize = 18;
        this.btnCanv.addChild(this.hideShowBtn);
        /** 界面显隐按钮初始化 */
        this.hideShowBtn.transitionEnable = true;
        InputUtil.bindButton(Keys.X, this.hideShowBtn);
        this.hideShowBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.hideShowBtn.onClicked.add(() => {
            if (MyClearGuns.instance.UIVisible) {
                MyClearGuns.instance.UIVisible = false;
                this.rootCanvas.visibility = 2;
            } else {
                MyClearGuns.instance.UIVisible = true;
                this.rootCanvas.visibility = 0;

            }
        })

        this.enCodeBtn = StaleButton.newObject(this.rootCanvas);
        this.enCodeBtn.size = new Vector2(size.x / 16, size.y / 20);
        this.enCodeBtn.text = "↓序列化[G]";
        this.enCodeBtn.fontSize = 18;
        this.btnCanv.addChild(this.enCodeBtn);
        /** 序列化按钮初始化 */
        this.enCodeBtn.transitionEnable = true;
        InputUtil.bindButton(Keys.G, this.enCodeBtn);
        this.enCodeBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.enCodeBtn.onClicked.add(() => {
            this.xuLieHua();
        })

        this.deCodeBtn = StaleButton.newObject(this.rootCanvas);
        this.deCodeBtn.size = new Vector2(size.x / 14, size.y / 20);
        this.deCodeBtn.text = "↑反序列化[H]";
        this.deCodeBtn.fontSize = 18;
        this.btnCanv.addChild(this.deCodeBtn);
        /** 反序列化按钮初始化 */
        this.deCodeBtn.transitionEnable = true;
        InputUtil.bindButton(Keys.H, this.deCodeBtn);
        this.deCodeBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.deCodeBtn.onClicked.add(() => {
            this.fanXuLieHua();
        })

        this.getGUIDBtn = StaleButton.newObject(this.rootCanvas);
        this.getGUIDBtn.size = new Vector2(size.x / 16, size.y / 20);
        this.getGUIDBtn.text = "获取GUID";
        this.getGUIDBtn.fontSize = 18;
        this.btnCanv.addChild(this.getGUIDBtn);
        /** 获取唯一GUID按钮初始化 */
        this.getGUIDBtn.transitionEnable = true;
        this.getGUIDBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.getGUIDBtn.onClicked.add(() => {
            let InptGunData = JSON.parse(this.downInput.text) as GunDataUnit;
            let result = InptGunData.GunGUID;
            result += ("," + InptGunData.GetGunAnime);
            result += ("," + MyClearGuns.instance.Text2SoundUnit(InptGunData.GetGunSound).guid);
            result += ("," + InptGunData.ShootAnime);
            result += ("," + MyClearGuns.instance.Text2SoundUnit(InptGunData.ShootSound).guid);
            result += ("," + InptGunData.ReloadAnime);
            result += ("," + MyClearGuns.instance.Text2SoundUnit(InptGunData.ReloadStartSound).guid);
            result += ("," + MyClearGuns.instance.Text2SoundUnit(InptGunData.ReloadOverSound).guid);
            this.downInput.text = result;
        })

        this.equipBtn = StaleButton.newObject(this.rootCanvas);
        this.equipBtn.size = new Vector2(size.x / 14, size.y / 20);
        this.equipBtn.text = "装备枪械[E]";
        this.equipBtn.fontSize = 18;
        this.btnCanv.addChild(this.equipBtn);
        /** 获取唯一GUID按钮初始化 */
        this.equipBtn.transitionEnable = true;
        InputUtil.bindButton(Keys.E, this.equipBtn);
        this.equipBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.equipBtn.onClicked.add(() => {
            let MyGunDataJSON = MyClearGuns.instance.TempDefaultGunData
            MyClearGuns.instance.CurrGunData = MyClearGuns.instance.TempDefaultGunData;
            MyClearGuns.instance.GunDataIntoMap(JSON.stringify(MyGunDataJSON));
            MyClearGuns.instance.GunDataIntoServerMap(JSON.stringify(MyGunDataJSON));
            MyClearGuns.instance.ClientAskServerForGun(Player.localPlayer);
        })

        this.shootBtn = StaleButton.newObject(this.rootCanvas);
        this.shootBtn.size = new Vector2(size.x / 18, size.y / 20);
        this.shootBtn.text = "开火[F]";
        this.shootBtn.fontSize = 18;
        this.btnCanv.addChild(this.shootBtn);
        /** 开火按钮初始化 */
        this.shootBtn.transitionEnable = true;
        InputUtil.bindButton(Keys.F, this.shootBtn);
        this.shootBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.shootBtn.onPressed.add(() => {
            MyClearGuns.ClientStartShoot();
        })
        this.shootBtn.onReleased.add(() => {
            MyClearGuns.ClientStopShoot();
        })

        this.ReloadBtn = StaleButton.newObject(this.rootCanvas);
        this.ReloadBtn.size = new Vector2(size.x / 18, size.y / 20);
        this.ReloadBtn.text = "换弹[R]";
        this.ReloadBtn.fontSize = 18;
        this.btnCanv.addChild(this.ReloadBtn);
        /** 换弹按钮初始化 */
        this.ReloadBtn.transitionEnable = true;
        InputUtil.bindButton(Keys.R, this.ReloadBtn);
        this.ReloadBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.ReloadBtn.onClicked.add(() => {
            MyClearGuns.ClientReloadAmmo();
        })


        //-----------------------//
        this.lable0 = TextBlock.newObject(this.rootCanvas);
        this.lable0.size = new Vector2(size.x / 12, size.y / 30 + 0 * (size.y / 30));
        this.lable0.position = new Vector2(10, 10);
        this.lable0.text = "枪械名称："
        this.lable0.fontSize = 24;
        this.lable0.fontColor = LinearColor.blue;
        this.lable0.outlineSize = 1;
        this.lable0.outlineColor = LinearColor.black;

        this.lable1 = TextBlock.newObject(this.rootCanvas);
        this.lable1.size = new Vector2(size.x / 12, size.y / 30);
        this.lable1.position = new Vector2(10, 10 + 1 * (size.y / 30));
        this.lable1.text = "枪械模型："
        this.lable1.fontSize = 24;
        this.lable1.outlineSize = 1;
        this.lable1.outlineColor = LinearColor.black;

        this.lable2 = TextBlock.newObject(this.rootCanvas);
        this.lable2.size = new Vector2(size.x / 12, size.y / 30);
        this.lable2.position = new Vector2(10, 10 + 2 * (size.y / 30));
        this.lable2.text = "　　偏移："
        this.lable2.fontSize = 24;
        this.lable2.outlineSize = 1;
        this.lable2.outlineColor = LinearColor.black;

        this.lable3 = TextBlock.newObject(this.rootCanvas);
        this.lable3.size = new Vector2(size.x / 12, size.y / 30);
        this.lable3.position = new Vector2(10, 10 + 3 * (size.y / 30));
        this.lable3.text = "　　旋转："
        this.lable3.fontSize = 24;
        this.lable3.outlineSize = 1;
        this.lable3.outlineColor = LinearColor.black;

        this.lable4 = TextBlock.newObject(this.rootCanvas);
        this.lable4.size = new Vector2(size.x / 12, size.y / 30);
        this.lable4.position = new Vector2(10, 10 + 4 * (size.y / 30));
        this.lable4.text = "　　缩放："
        this.lable4.fontSize = 24;
        this.lable4.outlineSize = 1;
        this.lable4.outlineColor = LinearColor.black;

        this.lable5 = TextBlock.newObject(this.rootCanvas);
        this.lable5.size = new Vector2(size.x / 12, size.y / 30);
        this.lable5.position = new Vector2(10, 10 + 5 * (size.y / 30));
        this.lable5.text = "掏枪动画："
        this.lable5.fontSize = 24;
        this.lable5.outlineSize = 1;
        this.lable5.outlineColor = LinearColor.black;

        this.lable6 = TextBlock.newObject(this.rootCanvas);
        this.lable6.size = new Vector2(size.x / 12, size.y / 30);
        this.lable6.position = new Vector2(10, 10 + 6 * (size.y / 30));
        this.lable6.text = "掏枪音效："
        this.lable6.fontSize = 24;
        this.lable6.outlineSize = 1;
        this.lable6.outlineColor = LinearColor.black;

        this.lable7 = TextBlock.newObject(this.rootCanvas);
        this.lable7.size = new Vector2(size.x / 12, size.y / 30);
        this.lable7.position = new Vector2(10, 10 + 7 * (size.y / 30));
        this.lable7.text = "出枪时间："
        this.lable7.fontSize = 24;
        this.lable7.outlineSize = 1;
        this.lable7.outlineColor = LinearColor.black;

        this.lable8 = TextBlock.newObject(this.rootCanvas);
        this.lable8.size = new Vector2(size.x / 12, size.y / 30);
        this.lable8.position = new Vector2(10, 10 + 8 * (size.y / 30));
        this.lable8.text = "有效射程："
        this.lable8.fontSize = 24;
        this.lable8.fontColor = LinearColor.red;
        this.lable8.outlineSize = 1;
        this.lable8.outlineColor = LinearColor.black;

        this.lable9 = TextBlock.newObject(this.rootCanvas);
        this.lable9.size = new Vector2(size.x / 12, size.y / 30);
        this.lable9.position = new Vector2(10, 10 + 9 * (size.y / 30));
        this.lable9.text = "单发伤害："
        this.lable9.fontSize = 24;
        this.lable9.fontColor = LinearColor.red;
        this.lable9.outlineSize = 1;
        this.lable9.outlineColor = LinearColor.black;

        this.lable10 = TextBlock.newObject(this.rootCanvas);
        this.lable10.size = new Vector2(size.x / 12, size.y / 30);
        this.lable10.position = new Vector2(10, 10 + 10 * (size.y / 30));
        this.lable10.text = "弹丸数量："
        this.lable10.fontSize = 24;
        this.lable10.fontColor = LinearColor.red;
        this.lable10.outlineSize = 1;
        this.lable10.outlineColor = LinearColor.black;

        this.lable11 = TextBlock.newObject(this.rootCanvas);
        this.lable11.size = new Vector2(size.x / 12, size.y / 30);
        this.lable11.position = new Vector2(10, 10 + 11 * (size.y / 30));
        this.lable11.text = "水平后座："
        this.lable11.fontSize = 24;
        this.lable11.fontColor = LinearColor.red;
        this.lable11.outlineSize = 1;
        this.lable11.outlineColor = LinearColor.black;

        this.lable12 = TextBlock.newObject(this.rootCanvas);
        this.lable12.size = new Vector2(size.x / 12, size.y / 30);
        this.lable12.position = new Vector2(10, 10 + 12 * (size.y / 30));
        this.lable12.text = "垂直后座："
        this.lable12.fontColor = LinearColor.red;
        this.lable12.fontSize = 24;
        this.lable12.outlineSize = 1;
        this.lable12.outlineColor = LinearColor.black;

        this.lable13 = TextBlock.newObject(this.rootCanvas);
        this.lable13.size = new Vector2(size.x / 12, size.y / 30);
        this.lable13.position = new Vector2(10, 10 + 13 * (size.y / 30));
        this.lable13.text = "散射程度："
        this.lable13.fontSize = 24;
        this.lable13.fontColor = LinearColor.red;
        this.lable13.outlineSize = 1;
        this.lable13.outlineColor = LinearColor.black;

        this.lable14 = TextBlock.newObject(this.rootCanvas);
        this.lable14.size = new Vector2(size.x / 12, size.y / 30);
        this.lable14.position = new Vector2(10, 10 + 14 * (size.y / 30));
        this.lable14.text = "　全自动："
        this.lable14.fontColor = LinearColor.red;
        this.lable14.fontSize = 24;
        this.lable14.outlineSize = 1;
        this.lable14.outlineColor = LinearColor.black;

        this.lable15 = TextBlock.newObject(this.rootCanvas);
        this.lable15.size = new Vector2(size.x / 12, size.y / 30);
        this.lable15.position = new Vector2(10, 10 + 15 * (size.y / 30));
        this.lable15.text = "射击间隔："
        this.lable15.fontSize = 24;
        this.lable15.fontColor = LinearColor.red;
        this.lable15.outlineSize = 1;
        this.lable15.outlineColor = LinearColor.black;

        this.lable16 = TextBlock.newObject(this.rootCanvas);
        this.lable16.size = new Vector2(size.x / 12, size.y / 30);
        this.lable16.position = new Vector2(10, 10 + 16 * (size.y / 30));
        this.lable16.text = "开火动画："
        this.lable16.fontSize = 24;
        this.lable16.fontColor = LinearColor.red;
        this.lable16.outlineSize = 1;
        this.lable16.outlineColor = LinearColor.black;

        this.lable17 = TextBlock.newObject(this.rootCanvas);
        this.lable17.size = new Vector2(size.x / 12, size.y / 30);
        this.lable17.position = new Vector2(10, 10 + 17 * (size.y / 30));
        this.lable17.text = "开火音效："
        this.lable17.fontSize = 24;
        this.lable17.fontColor = LinearColor.red;
        this.lable17.outlineSize = 1;
        this.lable17.outlineColor = LinearColor.black;

        this.lable18 = TextBlock.newObject(this.rootCanvas);
        this.lable18.size = new Vector2(size.x / 12, size.y / 30);
        this.lable18.position = new Vector2(10, 10 + 18 * (size.y / 30));
        this.lable18.text = "到手载弹："
        this.lable18.fontSize = 24;
        this.lable18.fontColor = LinearColor.yellow;
        this.lable18.outlineSize = 1;
        this.lable18.outlineColor = LinearColor.black;

        this.lable19 = TextBlock.newObject(this.rootCanvas);
        this.lable19.size = new Vector2(size.x / 12, size.y / 30);
        this.lable19.position = new Vector2(10, 10 + 19 * (size.y / 30));
        this.lable19.text = "弹匣载弹："
        this.lable19.fontSize = 24;
        this.lable19.fontColor = LinearColor.yellow;
        this.lable19.outlineSize = 1;
        this.lable19.outlineColor = LinearColor.black;

        this.lable20 = TextBlock.newObject(this.rootCanvas);
        this.lable20.size = new Vector2(size.x / 12, size.y / 30);
        this.lable20.position = new Vector2(10, 10 + 20 * (size.y / 30));
        this.lable20.text = "到手备弹："
        this.lable20.fontSize = 24;
        this.lable20.fontColor = LinearColor.yellow;
        this.lable20.outlineSize = 1;
        this.lable20.outlineColor = LinearColor.black;

        this.lable21 = TextBlock.newObject(this.rootCanvas);
        this.lable21.size = new Vector2(size.x / 12, size.y / 30);
        this.lable21.position = new Vector2(10, 10 + 21 * (size.y / 30));
        this.lable21.text = "最大备弹："
        this.lable21.fontSize = 24;
        this.lable21.fontColor = LinearColor.yellow;
        this.lable21.outlineSize = 1;
        this.lable21.outlineColor = LinearColor.black;

        this.lable22 = TextBlock.newObject(this.rootCanvas);
        this.lable22.size = new Vector2(size.x / 12, size.y / 30);
        this.lable22.position = new Vector2(10, 10 + 22 * (size.y / 30));
        this.lable22.text = "换弹耗时："
        this.lable22.fontSize = 24;
        this.lable22.fontColor = LinearColor.yellow;
        this.lable22.outlineSize = 1;
        this.lable22.outlineColor = LinearColor.black;

        this.lable23 = TextBlock.newObject(this.rootCanvas);
        this.lable23.size = new Vector2(size.x / 12, size.y / 30);
        this.lable23.position = new Vector2(10, 10 + 23 * (size.y / 30));
        this.lable23.text = "换弹动画："
        this.lable23.fontSize = 24;
        this.lable23.fontColor = LinearColor.yellow;
        this.lable23.outlineSize = 1;
        this.lable23.outlineColor = LinearColor.black;

        this.lable24 = TextBlock.newObject(this.rootCanvas);
        this.lable24.size = new Vector2(size.x / 12, size.y / 30);
        this.lable24.position = new Vector2(10, 10 + 24 * (size.y / 30));
        this.lable24.text = "开始音效："
        this.lable24.fontSize = 24;
        this.lable24.fontColor = LinearColor.yellow;
        this.lable24.outlineSize = 1;
        this.lable24.outlineColor = LinearColor.black;

        this.lable25 = TextBlock.newObject(this.rootCanvas);
        this.lable25.size = new Vector2(size.x / 12, size.y / 30);
        this.lable25.position = new Vector2(10, 10 + 25 * (size.y / 30));
        this.lable25.text = "完成音效："
        this.lable25.fontSize = 24;
        this.lable25.fontColor = LinearColor.yellow;
        this.lable25.outlineSize = 1;
        this.lable25.outlineColor = LinearColor.black;

        this.input0 = InputBox.newObject(this.rootCanvas);
        this.input0.size = new Vector2(size.x / 12, size.y / 31);
        this.input0.position = new Vector2(12 + size.x / 12, 10 + 0 * (size.y / 30));
        this.input0.textLengthLimit = 99;
        this.input0.text = MyClearGuns.instance.TempDefaultGunData.GunName;
        this.input0.fontSize = 14;
        this.input0.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.GunName = text;
        })

        this.input1 = InputBox.newObject(this.rootCanvas);
        this.input1.size = new Vector2(size.x / 12, size.y / 31);
        this.input1.position = new Vector2(12 + size.x / 12, 10 + 1 * (size.y / 30));
        this.input1.textLengthLimit = 99;
        this.input1.text = MyClearGuns.instance.TempDefaultGunData.GunGUID;
        this.input1.fontSize = 14;
        this.input1.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.GunGUID = text;
        })

        this.input2 = InputBox.newObject(this.rootCanvas);
        this.input2.size = new Vector2(size.x / 12, size.y / 31);
        this.input2.position = new Vector2(12 + size.x / 12, 10 + 2 * (size.y / 30));
        this.input2.textLengthLimit = 99;
        this.input2.text = MyClearGuns.instance.TempDefaultGunData.GunLoc;
        this.input2.fontSize = 14;
        this.input2.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.GunLoc = text;
        })

        this.input3 = InputBox.newObject(this.rootCanvas);
        this.input3.size = new Vector2(size.x / 12, size.y / 31);
        this.input3.position = new Vector2(12 + size.x / 12, 10 + 3 * (size.y / 30));
        this.input3.textLengthLimit = 99;
        this.input3.text = MyClearGuns.instance.TempDefaultGunData.GunRot;
        this.input3.fontSize = 14;
        this.input3.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.GunRot = text;
        })

        this.input4 = InputBox.newObject(this.rootCanvas);
        this.input4.size = new Vector2(size.x / 12, size.y / 31);
        this.input4.position = new Vector2(12 + size.x / 12, 10 + 4 * (size.y / 30));
        this.input4.textLengthLimit = 99;
        this.input4.text = MyClearGuns.instance.TempDefaultGunData.GunScal;
        this.input4.fontSize = 14;
        this.input4.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.GunScal = text;
        })

        this.input5 = InputBox.newObject(this.rootCanvas);
        this.input5.size = new Vector2(size.x / 12, size.y / 31);
        this.input5.position = new Vector2(12 + size.x / 12, 10 + 5 * (size.y / 30));
        this.input5.textLengthLimit = 99;
        this.input5.text = MyClearGuns.instance.TempDefaultGunData.GetGunAnime;
        this.input5.fontSize = 14;
        this.input5.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.GetGunAnime = text;
        })

        this.input6 = InputBox.newObject(this.rootCanvas);
        this.input6.size = new Vector2(size.x / 12, size.y / 31);
        this.input6.position = new Vector2(12 + size.x / 12, 10 + 6 * (size.y / 30));
        this.input6.textLengthLimit = 99;
        this.input6.text = MyClearGuns.instance.TempDefaultGunData.GetGunSound;
        this.input6.fontSize = 14;
        this.input6.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.GetGunSound = text;
        })

        this.input7 = InputBox.newObject(this.rootCanvas);
        this.input7.size = new Vector2(size.x / 12, size.y / 31);
        this.input7.position = new Vector2(12 + size.x / 12, 10 + 7 * (size.y / 30));
        this.input7.textLengthLimit = 99;
        this.input7.text = MyClearGuns.instance.TempDefaultGunData.GetGunShowTime + "";
        this.input7.fontSize = 14;
        this.input7.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.GetGunShowTime = Number(text);
        })

        this.input8 = InputBox.newObject(this.rootCanvas);
        this.input8.size = new Vector2(size.x / 12, size.y / 31);
        this.input8.position = new Vector2(12 + size.x / 12, 10 + 8 * (size.y / 30));
        this.input8.textLengthLimit = 99;
        this.input8.text = MyClearGuns.instance.TempDefaultGunData.Range + "";
        this.input8.fontSize = 14;
        this.input8.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.Range = Number(text);
        })

        this.input9 = InputBox.newObject(this.rootCanvas);
        this.input9.size = new Vector2(size.x / 12, size.y / 31);
        this.input9.position = new Vector2(12 + size.x / 12, 10 + 9 * (size.y / 30));
        this.input9.textLengthLimit = 99;
        this.input9.text = MyClearGuns.instance.TempDefaultGunData.Projectil_Damage + "";
        this.input9.fontSize = 14;
        this.input9.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.Projectil_Damage = Number(text);
        })

        this.input10 = InputBox.newObject(this.rootCanvas);
        this.input10.size = new Vector2(size.x / 12, size.y / 31);
        this.input10.position = new Vector2(12 + size.x / 12, 10 + 10 * (size.y / 30));
        this.input10.textLengthLimit = 99;
        this.input10.text = MyClearGuns.instance.TempDefaultGunData.Projectil_Count + "";
        this.input10.fontSize = 14;
        this.input10.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.Projectil_Count = Number(text);
        })

        this.input11 = InputBox.newObject(this.rootCanvas);
        this.input11.size = new Vector2(size.x / 12, size.y / 31);
        this.input11.position = new Vector2(12 + size.x / 12, 10 + 11 * (size.y / 30));
        this.input11.textLengthLimit = 99;
        this.input11.text = MyClearGuns.instance.TempDefaultGunData.Recoil_H + "";
        this.input11.fontSize = 14;
        this.input11.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.Recoil_H = Number(text);
        })

        this.input12 = InputBox.newObject(this.rootCanvas);
        this.input12.size = new Vector2(size.x / 12, size.y / 31);
        this.input12.position = new Vector2(12 + size.x / 12, 10 + 12 * (size.y / 30));
        this.input12.textLengthLimit = 99;
        this.input12.text = MyClearGuns.instance.TempDefaultGunData.Recoil_V + "";
        this.input12.fontSize = 14;
        this.input12.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.Recoil_V = Number(text);
        })

        this.input13 = InputBox.newObject(this.rootCanvas);
        this.input13.size = new Vector2(size.x / 12, size.y / 31);
        this.input13.position = new Vector2(12 + size.x / 12, 10 + 13 * (size.y / 30));
        this.input13.textLengthLimit = 99;
        this.input13.text = MyClearGuns.instance.TempDefaultGunData.Spread + "";
        this.input13.fontSize = 14;
        this.input13.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.Spread = Number(text);
        })

        this.input14 = InputBox.newObject(this.rootCanvas);
        this.input14.size = new Vector2(size.x / 12, size.y / 31);
        this.input14.position = new Vector2(12 + size.x / 12, 10 + 14 * (size.y / 30));
        this.input14.textLengthLimit = 99;
        this.input14.text = MyClearGuns.instance.TempDefaultGunData.FullAuto + "";
        this.input14.fontSize = 14;
        this.input14.onTextCommitted.add((text: string) => {
            if (text == "false" || text == "0" || text == "False" || text == "FALSE") {
                MyClearGuns.instance.TempDefaultGunData.FullAuto = false;
            } else {
                MyClearGuns.instance.TempDefaultGunData.FullAuto = true;
            }
        })

        this.input15 = InputBox.newObject(this.rootCanvas);
        this.input15.size = new Vector2(size.x / 12, size.y / 31);
        this.input15.position = new Vector2(12 + size.x / 12, 10 + 15 * (size.y / 30));
        this.input15.textLengthLimit = 99;
        this.input15.text = MyClearGuns.instance.TempDefaultGunData.ShootDelay + "";
        this.input15.fontSize = 14;
        this.input15.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.ShootDelay = Number(text);;
        })

        this.input16 = InputBox.newObject(this.rootCanvas);
        this.input16.size = new Vector2(size.x / 12, size.y / 31);
        this.input16.position = new Vector2(12 + size.x / 12, 10 + 16 * (size.y / 30));
        this.input16.textLengthLimit = 99;
        this.input16.text = MyClearGuns.instance.TempDefaultGunData.ShootAnime + "";
        this.input16.fontSize = 14;
        this.input16.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.ShootAnime = text;
        })

        this.input17 = InputBox.newObject(this.rootCanvas);
        this.input17.size = new Vector2(size.x / 12, size.y / 31);
        this.input17.position = new Vector2(12 + size.x / 12, 10 + 17 * (size.y / 30));
        this.input17.textLengthLimit = 99;
        this.input17.text = MyClearGuns.instance.TempDefaultGunData.ShootSound;
        this.input17.fontSize = 14;
        this.input17.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.ShootSound = text;
        })

        this.input18 = InputBox.newObject(this.rootCanvas);
        this.input18.size = new Vector2(size.x / 12, size.y / 31);
        this.input18.position = new Vector2(12 + size.x / 12, 10 + 18 * (size.y / 30));
        this.input18.textLengthLimit = 99;
        this.input18.text = MyClearGuns.instance.TempDefaultGunData.Ammo_CurNum + "";
        this.input18.fontSize = 14;
        this.input18.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.Ammo_CurNum = Number(text);
        })

        this.input19 = InputBox.newObject(this.rootCanvas);
        this.input19.size = new Vector2(size.x / 12, size.y / 31);
        this.input19.position = new Vector2(12 + size.x / 12, 10 + 19 * (size.y / 30));
        this.input19.textLengthLimit = 99;
        this.input19.text = MyClearGuns.instance.TempDefaultGunData.Ammo_MaxInOne + "";
        this.input19.fontSize = 14;
        this.input19.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.Ammo_MaxInOne = Number(text);
        })

        this.input20 = InputBox.newObject(this.rootCanvas);
        this.input20.size = new Vector2(size.x / 12, size.y / 31);
        this.input20.position = new Vector2(12 + size.x / 12, 10 + 20 * (size.y / 30));
        this.input20.textLengthLimit = 99;
        this.input20.text = MyClearGuns.instance.TempDefaultGunData.Ammo_CurPrepare + "";
        this.input20.fontSize = 14;
        this.input20.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.Ammo_CurPrepare = Number(text);
        })

        this.input21 = InputBox.newObject(this.rootCanvas);
        this.input21.size = new Vector2(size.x / 12, size.y / 31);
        this.input21.position = new Vector2(12 + size.x / 12, 10 + 21 * (size.y / 30));
        this.input21.textLengthLimit = 99;
        this.input21.text = MyClearGuns.instance.TempDefaultGunData.Ammo_MaxPrepare + "";
        this.input21.fontSize = 14;
        this.input21.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.Ammo_MaxPrepare = Number(text);
        })

        this.input22 = InputBox.newObject(this.rootCanvas);
        this.input22.size = new Vector2(size.x / 12, size.y / 31);
        this.input22.position = new Vector2(12 + size.x / 12, 10 + 22 * (size.y / 30));
        this.input22.textLengthLimit = 99;
        this.input22.text = MyClearGuns.instance.TempDefaultGunData.ReloadDelay + "";
        this.input22.fontSize = 14;
        this.input22.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.ReloadDelay = Number(text);
        })

        this.input23 = InputBox.newObject(this.rootCanvas);
        this.input23.size = new Vector2(size.x / 12, size.y / 31);
        this.input23.position = new Vector2(12 + size.x / 12, 10 + 23 * (size.y / 30));
        this.input23.textLengthLimit = 99;
        this.input23.text = MyClearGuns.instance.TempDefaultGunData.ReloadAnime;
        this.input23.fontSize = 14;
        this.input23.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.ReloadAnime = text;
        })

        this.input24 = InputBox.newObject(this.rootCanvas);
        this.input24.size = new Vector2(size.x / 12, size.y / 31);
        this.input24.position = new Vector2(12 + size.x / 12, 10 + 24 * (size.y / 30));
        this.input24.textLengthLimit = 99;
        this.input24.text = MyClearGuns.instance.TempDefaultGunData.ReloadStartSound;
        this.input24.fontSize = 14;
        this.input24.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.ReloadStartSound = text;
        })

        this.input25 = InputBox.newObject(this.rootCanvas);
        this.input25.size = new Vector2(size.x / 12, size.y / 31);
        this.input25.position = new Vector2(12 + size.x / 12, 10 + 25 * (size.y / 30));
        this.input25.textLengthLimit = 99;
        this.input25.text = MyClearGuns.instance.TempDefaultGunData.ReloadOverSound;
        this.input25.fontSize = 14;
        this.input25.onTextCommitted.add((text: string) => {
            MyClearGuns.instance.TempDefaultGunData.ReloadOverSound = text;
        })




        // // 加载完成后执行一次序列化
        // this.xuLieHua();

        // 加载完成后执行一次反序列化
        this.fanXuLieHua();

    }


    /**反序列化，将底部编辑栏中的Json反序列化进TempDefaultGunData中，并投射到UI里 */
    public fanXuLieHua() {
        MyClearGuns.instance.TempDefaultGunData = JSON.parse(this.downInput.text) as GunDataUnit;
        this.input0.text = MyClearGuns.instance.TempDefaultGunData.GunName;
        this.input1.text = MyClearGuns.instance.TempDefaultGunData.GunGUID;
        this.input2.text = MyClearGuns.instance.TempDefaultGunData.GunLoc;
        this.input3.text = MyClearGuns.instance.TempDefaultGunData.GunRot;
        this.input4.text = MyClearGuns.instance.TempDefaultGunData.GunScal;
        this.input5.text = MyClearGuns.instance.TempDefaultGunData.GetGunAnime;
        this.input6.text = MyClearGuns.instance.TempDefaultGunData.GetGunSound;
        this.input7.text = MyClearGuns.instance.TempDefaultGunData.GetGunShowTime + "";
        this.input8.text = MyClearGuns.instance.TempDefaultGunData.Range + "";
        this.input9.text = MyClearGuns.instance.TempDefaultGunData.Projectil_Damage + "";
        this.input10.text = MyClearGuns.instance.TempDefaultGunData.Projectil_Count + "";
        this.input11.text = MyClearGuns.instance.TempDefaultGunData.Recoil_H + "";
        this.input12.text = MyClearGuns.instance.TempDefaultGunData.Recoil_V + "";
        this.input13.text = MyClearGuns.instance.TempDefaultGunData.Spread + "";
        this.input14.text = MyClearGuns.instance.TempDefaultGunData.FullAuto + "";
        this.input15.text = MyClearGuns.instance.TempDefaultGunData.ShootDelay + "";
        this.input16.text = MyClearGuns.instance.TempDefaultGunData.ShootAnime + "";
        this.input17.text = MyClearGuns.instance.TempDefaultGunData.ShootSound;
        this.input18.text = MyClearGuns.instance.TempDefaultGunData.Ammo_CurNum + "";
        this.input19.text = MyClearGuns.instance.TempDefaultGunData.Ammo_MaxInOne + "";
        this.input20.text = MyClearGuns.instance.TempDefaultGunData.Ammo_CurPrepare + "";
        this.input21.text = MyClearGuns.instance.TempDefaultGunData.Ammo_MaxPrepare + "";
        this.input22.text = MyClearGuns.instance.TempDefaultGunData.ReloadDelay + "";
        this.input23.text = MyClearGuns.instance.TempDefaultGunData.ReloadAnime;
        this.input24.text = MyClearGuns.instance.TempDefaultGunData.ReloadStartSound;
        this.input25.text = MyClearGuns.instance.TempDefaultGunData.ReloadOverSound;
    }
    /**序列化，将TempDefaultGunData中的数据Json化，并覆写到底部编辑栏中 */
    public xuLieHua() {
        this.downInput.text = JSON.stringify(MyClearGuns.instance.TempDefaultGunData);
    }



}

/**枪械Json */
@Serializable
class GunList {
    @mw.Property({ displayName: "枪械Json" })
    public GunDataJson: string = "";
    constructor(a?: string) {
        this.GunDataJson = a ?? "";
    }
}
/** 主脚本 MyClearGuns*/
@Component
export default class MyClearGuns extends mw.Script {

    // ---------[属性面板&全局设置]---------- //
    @mw.Property({ displayName: "优先加载", group: "全局设置", tooltip: "在这里填入需要优先加载的GUID，然后ctrl+s保存该工程，不用担心重复" })
    NeedloadAssets: string = "";
    @mw.Property({ displayName: "编辑状态", group: "全局设置", tooltip: "进游戏后是否能看到枪械编辑UI" })
    public EditorMode: boolean = true;
    @mw.Property({ displayName: "音效距离系数", group: "距离裁剪", tooltip: "音效广播距离的全局缩放裁剪系数，可通过调整该系数降低rpc压力" })
    public SoundCutDistanceScale: number = 1;
    @mw.Property({ displayName: "特效距离系数", group: "距离裁剪", tooltip: "特效广播距离的全局缩放裁剪系数，可通过调整该系数降低rpc压力" })
    public EffectCutDistanceScale: number = 1;
    @mw.Property({ displayName: "动画裁剪距离", group: "距离裁剪", tooltip: "超过这个距离将看不到其他玩家的开火、换弹动画" })
    public AnnieCutDistance: number = 1200;
    @mw.Property({ displayName: "枪械配置", group: "枪械库", tooltip: "在这里填入需要优先加载的GUID，然后ctrl+s保存该工程，不用担心重复" })
    public GunDataJsonList: GunList[] = [new GunList('{"GunName":"scar-L","GunGUID":"43712","GunLoc":"4|0|0","GunRot":"0|0|-25","GunScal":"0.8|0.8|0.8","GetGunAnime":"97180","GetGunSound":"20429|1|3|6","GetGunShowTime":0.5,"Range":20,"Projectil_Damage":30,"Projectil_Count":1,"Recoil_H":0.55,"Recoil_V":0.35,"Spread":0.02,"FullAuto":true,"ShootDelay":100,"ShootAnime":"80483","ShootSound":"12563|1|8|16","Ammo_CurNum":30,"Ammo_MaxInOne":30,"Ammo_CurPrepare":180,"Ammo_MaxPrepare":360,"ReloadDelay":2,"ReloadAnime":"33561","ReloadStartSound":"12525|1|3|6","ReloadOverSound":"12546|1|3|6"}')];


    // ---------[双端属性-不需要同步的]---------- //
    /**由枪名-json串反序列化而来存在了这个map，用于服务端、客户端获取枪械时的数据对齐 */
    public GunName_GunData: Map<string, GunDataUnit> = new Map();

    // ---------[服务器的属性]---------- //
    /** 玩家-手里的枪模型 */
    public PlayersInfo_GunMesh: Map<string, GameObject> = new Map();
    /** 玩家-手里的枪名 */
    public Players_GunName: Map<Player, string> = new Map();

    // ---------[客户端的属性]---------- //
    //【编辑态】
    /** 编辑状态UI显隐 */
    public UIVisible: boolean = true;
    //** 编辑状态的临时枪械数据 *
    public TempDefaultGunData: GunDataUnit = new GunDataUnit;
    //【消费态】
    /** 当前手持枪械数据 */
    public CurrGunData: GunDataUnit = undefined;
    /**是否已有自动开火在进行 */
    public FireLoop: number = null;
    /**开火间隔Timeout，用于半自动射击间隔 */
    public FireDelayTimeout: number = null;
    /**当前是否在换弹状态 */
    public isReloading: boolean = false;
    // /**换弹中的Timeout */
    // public reloadTimeoutNum: number = null;


    /* 解析资源ID列表 */
    private resolveString(assetIds: string): string[] {
        let assetIdArray: string[] = new Array<string>();
        let assetId: string = "";
        let s = assetIds.split("");
        for (let a of s) {
            if (a == ",") {
                assetIdArray.push(assetId);
                assetId = "";
            } else {
                assetId += a;
            }
        }
        if (assetId) {
            assetIdArray.push(assetId);
        }
        return assetIdArray;
    }

    /* 初始化资源 */
    private async initAssets(assetIds: string): Promise<void> {
        let assetIdArray = this.resolveString(assetIds);
        for (let element of assetIdArray) {
            await AssetUtil.asyncDownloadAsset(element)
        }
    }


    // _isReady 标志用于指示 MyClearGuns 是否已经准备就绪
    private static _isReady = false;
    // _instance 用于存储 MyClearGuns 的实例
    private static _instance: MyClearGuns | null = null;
    // _queuedOperations 数组用于存储还未执行的方法调用
    private static _queuedOperations: (() => void)[] = [];
    // instance 属性用于获取 MyClearGuns 的实例
    public static get instance() {
        // 如果实例尚未创建，则创建一个代理（Proxy）
        if (!MyClearGuns._instance) {
            MyClearGuns._instance = new Proxy({}, {
                get: (target, prop) => {
                    // 如果已经准备就绪，直接返回实例的方法或属性
                    if (MyClearGuns._isReady) {
                        return MyClearGuns._instance[prop];
                    } else {
                        // 如果尚未准备就绪，返回一个函数，将操作加入队列中
                        return (...args: any[]) => {
                            MyClearGuns._queuedOperations.push(() => MyClearGuns._instance[prop](...args));
                        };
                    }
                }
            }) as MyClearGuns;
        }
        return MyClearGuns._instance;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart() {
        // 初始化真正的 MyClearGuns 实例
        MyClearGuns._instance = this;
        MyClearGuns._isReady = true;
        this.GunDataListIntoMap();
        this.initAssets(this.NeedloadAssets);
        this.UIVisible = true;
        if (SystemUtil.isClient()) {
            // this.EditorMode = true;
            setTimeout(() => {
                if (this.EditorMode && SystemUtil.isPIE) {
                    let mainui = UIService.create(MainUI);
                    UIService.showUI(mainui);
                }
            }, 700);
        }

        if (SystemUtil.isServer()) {
            Player.onPlayerJoin.add((player: Player) => {
                this.onPlayerJoin(player);
            })
            Player.onPlayerLeave.add((player: Player) => {
                this.onPlayerLeft(player);
            })
        }



    }

    /**当玩家加入时的方法 */
    public onPlayerJoin(player: Player) {
        if (SystemUtil.isServer()) {
            player.character.collisionExtent.y = 150;
            // console.log(player.character.displayName + " Joined the game");
        }
    }

    /**当玩家离开时的方法 */
    public onPlayerLeft(player: Player) {
        if (SystemUtil.isServer()) {
            // console.log(player.character.displayName + " Left the game");
            // 卸除玩家手里的枪
            this.ServerDelAllWeapon(player);
        }
    }


    ////////////////////////////
    //   建议开发者调用的接口   //
    ////////////////////////////

    /**检查两个PlayerID是否为友军 */
    public static checkIfFriendly: ((PlayerID1: string, PlayerID2: string) => boolean)[] = [];


    // ---------[客户端方法]---------- //
    //----[动作]---//
    /**纯客户端停火 */
    public static ClientStopShoot() {
        if (SystemUtil.isClient()) {
            if (MyClearGuns.instance.FireLoop != undefined) {
                /**清理全自动开火 */
                clearInterval(MyClearGuns.instance.FireLoop);
                /**将全自动开火记录清除 */
                MyClearGuns.instance.FireLoop = null;
            }
        }
    }

    /**纯客户端持续开火，包含全自动和半自动，没有弹速、下坠，纯射线，用ClientStopShoot()停火*/
    public static ClientStartShoot() {
        if (SystemUtil.isClient()) {
            /**如果手里没有枪械，则不进行射击 */
            if (MyClearGuns.instance.CurrGunData != undefined) {
                /**如果正在换弹，停止射击并返回 */
                if (MyClearGuns.instance.isReloading) {
                    this.ClientStopShoot();
                    return;
                }

                /**有枪且不在换弹中，拿出当前数据 */
                let dt = MyClearGuns.instance.CurrGunData.ShootDelay;
                let autofall = MyClearGuns.instance.CurrGunData.FullAuto;
                let range = MyClearGuns.instance.CurrGunData.Range;
                let Y_move = MyClearGuns.instance.CurrGunData.Recoil_V;
                let Z_move = MyClearGuns.instance.CurrGunData.Recoil_H;
                let Spred = MyClearGuns.instance.CurrGunData.Spread;
                let count = MyClearGuns.instance.CurrGunData.Projectil_Count;

                // 进行全自动射击
                if (autofall) {
                    // console.log("全自动射击");

                    // 如果timeout还在就不射击，不在就射击并加个timeout
                    if (MyClearGuns.instance.FireDelayTimeout == undefined) {

                        MyClearGuns.instance.ClientShootOnce(range, Y_move, Z_move, Spred, count);
                        if (MyClearGuns.instance.FireLoop != null) { return; }
                        MyClearGuns.instance.FireLoop = setInterval(() => {
                            MyClearGuns.instance.ClientShootOnce(range, Y_move, Z_move, Spred, count);
                        }, dt)

                        MyClearGuns.instance.FireDelayTimeout = setTimeout(() => {
                            // timeout后清除timeout存储器
                            MyClearGuns.instance.FireDelayTimeout = undefined;
                        }, dt);
                    }

                    /**2023.12.3 尝试修复连点器情况下超越全自动的射速 */
                    // this.ClientShootOnce(range, Y_move, Z_move, Spred, count);
                    // if (this.FireLoop != null) { return; }
                    // this.FireLoop = setInterval(() => {
                    //     this.ClientShootOnce(range, Y_move, Z_move, Spred, count);
                    // }, dt)
                }
                // 进行半自动射击
                else {
                    // console.log("半自动射击");
                    // 如果timeout还在就不射击，不在就射击并加个timeout
                    if (MyClearGuns.instance.FireDelayTimeout == undefined) {
                        MyClearGuns.instance.ClientShootOnce(range, Y_move, Z_move, Spred, count);
                        MyClearGuns.instance.FireDelayTimeout = setTimeout(() => {
                            // timeout后清除timeout存储器
                            MyClearGuns.instance.FireDelayTimeout = undefined;
                        }, dt);
                    }
                }
            }
        }
    }

    /**纯客户端换弹，换弹会停止射击，且换弹期间无法射击 */
    public static ClientReloadAmmo() {
        if (SystemUtil.isClient()) {
            if (MyClearGuns.instance.CurrGunData == undefined) { return };
            if (MyClearGuns.instance.CurrGunData.Ammo_CurNum == MyClearGuns.instance.CurrGunData.Ammo_MaxInOne) { return };
            /**如果当前正在换弹，则直接返回不执行下面的操作 */
            if (MyClearGuns.instance.isReloading) {
                return;
            }
            /**现在正在换弹 */
            MyClearGuns.instance.isReloading = true;
            /**换弹停止开火 */
            this.ClientStopShoot();

            let char = Player.localPlayer.character;

            /**没备弹了 */
            if (MyClearGuns.instance.CurrGunData.Ammo_CurPrepare <= 0) {
                /**放一下没子弹的音效 */
                MyClearGuns.instance.ServerPlay3DSoundOnGmoj(char.gameObjectId, "95723", 1, 400, 800);
                // this.ServerPlay3DSoundOnGmoj(char.gameObjectId, "27257", 1, 400, 800);
                /**现在不在换弹了 */
                MyClearGuns.instance.isReloading = false;
                // console.log("[MCG] 没备弹啦！！");

                /**返回，不执行之后的动作 */
                return;
            }

            /**放一下开始换弹的音效 */
            let _reloadStartSound = MyClearGuns.instance.Text2SoundUnit(MyClearGuns.instance.CurrGunData.ReloadStartSound);
            MyClearGuns.instance.ServerPlay3DSoundOnGmoj(char.gameObjectId, _reloadStartSound.guid, _reloadStartSound.volume, _reloadStartSound.inner, _reloadStartSound.outter);
            // this.ServerPlay3DSoundOnGmoj(char.gameObjectId, _reloadStartSound.guid, _reloadStartSound.volume, _reloadStartSound.inner, _reloadStartSound.outter);
            // console.log("[MCG] 开始换弹");


            MyClearGuns.instance.ServerPlayAnnie(MyClearGuns.instance.CurrGunData.ReloadAnime, char.player.userId);
            // let anime1 = char.loadAnimation(this.CurrGunData.ReloadAnime);
            // anime1.speed = anime1.length / this.CurrGunData.ReloadDelay;
            // anime1.slot = AnimSlot.Upper;
            // anime1.play();

            /**读秒，等换弹完成 */
            setTimeout(() => {

                // 判断手里是否还有枪，不然直接操作数据会报错
                if (MyClearGuns.instance.CurrGunData != undefined) {
                    /**归拢一下剩余子弹数 */
                    let totalAmmo = MyClearGuns.instance.CurrGunData.Ammo_CurNum + MyClearGuns.instance.CurrGunData.Ammo_CurPrepare;
                    /**还够换一次子弹 */
                    if (totalAmmo > MyClearGuns.instance.CurrGunData.Ammo_MaxInOne) {
                        MyClearGuns.instance.CurrGunData.Ammo_CurNum = MyClearGuns.instance.CurrGunData.Ammo_MaxInOne;
                        MyClearGuns.instance.CurrGunData.Ammo_CurPrepare = totalAmmo - MyClearGuns.instance.CurrGunData.Ammo_MaxInOne;
                    }
                    /**不够了只能有多少上多少了 */
                    else {
                        MyClearGuns.instance.CurrGunData.Ammo_CurNum = totalAmmo;
                        MyClearGuns.instance.CurrGunData.Ammo_CurPrepare = 0;
                    }
                    // 给开发者方便调的地方，完成了换弹后会执行这个
                    this.onClientReloadComplete.forEach(callbackfn => callbackfn(MyClearGuns.instance.CurrGunData.Ammo_CurNum, MyClearGuns.instance.CurrGunData.Ammo_CurPrepare));

                }
                // this.ServerPlay3DSoundOnGmoj(char.gameObjectId, _reloadOverSound.guid, _reloadOverSound.volume, _reloadOverSound.inner, _reloadOverSound.outter);
                // console.log("[MCG] 换弹完毕！");

                /**现在不在换弹了 */
                MyClearGuns.instance.isReloading = false;



            }, MyClearGuns.instance.CurrGunData.ReloadDelay * 1000);

            if (MyClearGuns.instance.CurrGunData != undefined) {
                setTimeout(() => {
                    /**放一下结束换弹的音效 */
                    let _reloadOverSound = MyClearGuns.instance.Text2SoundUnit(MyClearGuns.instance.CurrGunData.ReloadOverSound);
                    MyClearGuns.instance.ServerPlay3DSoundOnGmoj(char.gameObjectId, _reloadOverSound.guid, _reloadOverSound.volume, _reloadOverSound.inner, _reloadOverSound.outter);
                }, MyClearGuns.instance.CurrGunData.ReloadDelay * 1000 - 300);
            }
        }

    }

    /** 给指定玩家添加子弹，双端可用，如果补成功了会触发换弹完成onClientReloadComplete回调
     * @param player 需要添加子弹的玩家
     * @param AmmoCount 可选，不填=装满最大备弹数Ammo_MaxPrepare，>1则给具体子弹数但不超过限制，0<x<1则按最大备弹数比例给
     */
    @mw.RemoteFunction(mw.Client)
    public static ClientAddAmmo(player: Player, AmmoCount?: number) {
        if (AmmoCount == undefined) {
            MyClearGuns.instance.CurrGunData.Ammo_CurNum = MyClearGuns.instance.CurrGunData.Ammo_MaxInOne;
            MyClearGuns.instance.CurrGunData.Ammo_CurPrepare = MyClearGuns.instance.CurrGunData.Ammo_MaxPrepare;
        }
        else {
            if (AmmoCount >= 1) {
                if (AmmoCount > MyClearGuns.instance.CurrGunData.Ammo_MaxPrepare) {
                    MyClearGuns.instance.CurrGunData.Ammo_CurPrepare = MyClearGuns.instance.CurrGunData.Ammo_MaxPrepare;
                }
                else {
                    MyClearGuns.instance.CurrGunData.Ammo_CurPrepare = AmmoCount;
                }
            }
            else {
                if (AmmoCount < 1 && AmmoCount > 0) {
                    MyClearGuns.instance.CurrGunData.Ammo_CurPrepare = Math.floor(MyClearGuns.instance.CurrGunData.Ammo_MaxPrepare * AmmoCount);
                }
            }
        }
        this.onClientReloadComplete.forEach(callbackfn => callbackfn(MyClearGuns.instance.CurrGunData.Ammo_CurNum, MyClearGuns.instance.CurrGunData.Ammo_CurPrepare));
    }



    //----[事件]----//

    /**[纯客户端] 成功拿到枪后调用，可以在这里改UI、摄像机属性
     * @param gunName: 枪名
     */
    public static onClientEquipedGun: ((gunName: string, curAmmo: number, preAmmo: number) => void)[] = [];

    /**纯客户端，每批次射击完成时调用，不管半自动还是全自动，也不管子弹数，打一次射线就会掉一次，可以在这里接UI更新子弹数 */
    public static onClientOneShootComplete: ((curAmmo: number, preAmmo: number) => void)[] = [];

    /**纯客户端，每次成功换弹后调用，可以在这里接UI更新子弹数 */
    public static onClientReloadComplete: ((curAmmo: number, preAmmo: number) => void)[] = [];


    /**纯客户端，成功下掉枪后调用，可以在这里改UI、摄像机属性 */
    public static onClientRemovedGun: (() => void)[] = [];

    /**纯客户端，当客户端击中敌方时，可以在这里修改UI、播放集中音效、提示等，但此时并未造成伤害，伤害仅由服务端执行
     * @param victim 被击中的玩家角色
     * @param damage 伤害值
     */
    public static onClientHit: ((victim: Player | Character, damage: number) => void)[] = []


    // ---------[服务器方法]---------- //
    //----[动作]---//
    /**服务器移除玩家枪械 */
    public static ServerDelGun(player: Player) {
        MyClearGuns.instance.ServerDelAllWeapon(player);
        // 清除玩家手里的枪名
        MyClearGuns.instance.Players_GunName.delete(player);
        MyClearGuns.instance.ServerRemoveClientGunData(player);
        MyClearGuns.instance.serverLetClientRemovedGun(player);
    }

    /**服务器给玩家装备枪械，是枪械库里有的枪 */
    @mw.RemoteFunction(mw.Server)
    public static ServerGiveGun(player: Player, gunName: string) {
        let GunData = MyClearGuns.instance.GunName_GunData.get(gunName);
        let loc = MyClearGuns.instance.stringToVector(GunData.GunLoc);
        let rot = MyClearGuns.instance.stringToRotation(GunData.GunRot);
        let scal = MyClearGuns.instance.stringToVector(GunData.GunScal)
        MyClearGuns.instance.ChangeClientCurrGunData(player, JSON.stringify(GunData));
        let anime1 = player.character.loadAnimation(GunData.GetGunAnime)
        anime1.slot = AnimSlot.Upper;
        anime1.play();
        MyClearGuns.instance.Players_GunName.set(player, gunName);
        setTimeout(() => {
            MyClearGuns.instance.ServerEquipWeapon(GunData.GunGUID, player, loc, rot, scal);
            MyClearGuns.instance.ServerPlay3DSoundOnGmoj(player.character.gameObjectId, "12732", 1, 3, 6);
            MyClearGuns.instance.serverLetClientEquipedGun(player, gunName);
        }, GunData.GetGunShowTime * 1000);
    }

    /**服务器处理伤害事件
     * @param attacker 攻击者guid
     * @param victim 受害者guid
     * @param damege 造成的伤害
     * @param HeadShot 是否爆头，不带参数视为不爆头
     */
    public static ServerDamageChar: ((attacker: string, victim: string, damege: number, HeadShot?: boolean) => void)[] = [];

    /**服务器，检测到玩家开火事件 */
    public static onPlayerShoot: ((PlayerId: string) => void)[] = [];

    /**服务器给玩家随机一把枪，可选定范围
     * @param player 需要给枪的玩家
     * @param guns 给枪范围，传枪械名称string[]，如为空就从所有枪械里给
     */
    public static ServerGiveRandomGun(player: Player, guns?: string[]) {
        if (guns == undefined) {
            guns = [];
            MyClearGuns.instance.GunName_GunData.forEach((value, key) => {
                guns.push(key)
            })
        }
        else {
            let newGuns = new Set();
            guns.forEach((value) => {
                if (MyClearGuns.instance.GunName_GunData.has(value)) {
                    newGuns.add(value);
                }
            })
            guns = Array.from(newGuns) as string[];

            if (guns.length < 1) {
                guns = [];
                MyClearGuns.instance.GunName_GunData.forEach((value, key) => {
                    guns.push(key)
                })
            }
        }

        const randomIndex: number = Math.floor(Math.random() * guns.length);
        const RandomGunName = guns[randomIndex];
        this.ServerGiveGun(player, RandomGunName);
    }


    /**[双端] 获取玩家手里装备着的枪名，C端只获取自己
     * @param player 玩家
     * @returns 枪名字
     */
    public static getPlayerGunName(player?: Player): string {
        if (SystemUtil.isClient()) {
            if (MyClearGuns.instance.CurrGunData != undefined) {
                return MyClearGuns.instance.CurrGunData.GunName
            }
            else {
                return null
            }
        }
        else {
            if (player != undefined) {
                if (MyClearGuns.instance.Players_GunName.has(player)) {
                    return MyClearGuns.instance.Players_GunName.get(player)
                }
                else {
                    return null
                }
            }
            else {
                return null
            }
        }
    }

    ////////////////////////////////
    //方法实现类接口(开发者可以不管)//
    ////////////////////////////////

    // 【动作】
    /** 纯客户端单次开火，没有弹速、下坠，纯射线
     * @param range 有效射程
     * @param Y_move 垂直后座-上抬
     * @param Z_move 水平后座-左右
     * @param Spred 散射
     * @param count [可选]弹丸数，默认1
     */
    public ClientShootOnce(range: number, Y_move: number, Z_move: number, Spred: number, count?: number) {
        if (SystemUtil.isClient()) {
            // 有子弹的情况
            if (this.CurrGunData.Ammo_CurNum > 0) {
                let p = Player.localPlayer;
                let char = p.character;
                this.CurrGunData.Ammo_CurNum -= 1;
                // console.log("剩余子弹: " + this.CurrGunData.Ammo_CurNum + "/" + this.CurrGunData.Ammo_CurPrepare);
                this.ClientTellServerShoot(p)
                // this.ServerPlay3DSoundOnGmoj(char.gameObjectId, S_uni.guid, S_uni.volume, S_uni.inner, S_uni.outter);
                Spred *= 10;
                range *= 100;
                let cam = Camera.currentCamera;
                let dir = cam.worldTransform.getForwardVector();
                let start = p.character.worldTransform.position.clone().add(Vector.multiply(dir, 30)).clone().add(new Vector(0, 0, 30));
                // 获取角色身上到准星位置的向量，最大距离5000(50格)
                let shotDir = this.getShootDir(p.character, start, range);
                if (count == undefined) { count = 1; }
                for (let index = 0; index < count; index++) {
                    // console.log("尝试射击");
                    /** 偏移后的射击方向 */
                    let shotDir2: Vector = undefined;
                    // 散射逻辑 一个圆形内散射
                    if (Spred != null) {
                        let spredx = null;
                        let spredy = null;
                        let matharg = Math.random() * 360;
                        spredx = Math.random() * Math.sin(matharg) * Spred;
                        spredy = Math.random() * Math.cos(matharg) * Spred;
                        shotDir2 = shotDir.clone().toRotation().add(new Rotation(0, spredx, spredy)).getForce();
                    }
                    let end = Vector.add(p.character.worldTransform.position, Vector.multiply(shotDir2, range));
                    try {
                        let Results = QueryUtil.lineTrace(start, end, true, true)
                        // console.log("Results:"+Results.length)
                        Results.forEach((v: HitResult) => {
                            if(v.gameObject.name == "left_right" || v.gameObject.name == "up_down"){
                                // console.log("命中的物体父亲名字为"+v.gameObject.parent.name+" id:"+v.gameObject.parent.gameObjectId)
                            }
                            else if(v.gameObject.name.includes("地狱龙") || v.gameObject.name.includes("宠物")){
                                // console.log("命中的物体名字为"+v.gameObject.name+" id:"+v.gameObject.gameObjectId)
                                //v.gameObject.setVisibility(false);
                                //(v.gameObject as Model).setCollision(CollisionStatus.Off);
                                this.toServer(v.gameObject,Player.localPlayer,v.gameObject.name)

                                //Event.dispatchToServer("L6_OnHurt",Player.localPlayer)
                            }
                        });
                        QueryUtil.lineTrace(start, end, true, true,["2C4B10D3"]).forEach((v: HitResult) => {
                            //console.log("命中的物体名字为"+v.gameObject.name)
                            if (v.gameObject instanceof Character) {
                                if (v.gameObject != p.character) {
                                    if (!v.gameObject.ragdollEnabled) {

                                        // 击中非自身角色
                                        let loc = v.position;
                                        let rot = v.impactNormal.toRotation();
                                        rot.y -= 90;

                                        // 如果需要判断队友，需要自己去isFriendly方法里设计队友判定逻辑哦
                                        if (!this.isFriendly(p.userId, v.gameObject.player.userId)) {
                                            // 如果不是队友
                                            // 击中角色的特效
                                            this.ServerHitChar(v.gameObject.gameObjectId, loc, rot);
                                            // 客户端击中其他玩家，播放音效
                                            setTimeout(() => {
                                                SoundService.playSound("121684", 1, 1.5);
                                            }, 200);
                                            if (v.gameObject instanceof Character) {
                                                let hitChar = v.gameObject as Character
                                                MyClearGuns.onClientHit.forEach(callbackfn => callbackfn(hitChar, this.CurrGunData.Projectil_Damage));
                                            }
                                            // 爆头判定
                                            if (!v.gameObject.isCrouching) {
                                                if (loc.z - v.gameObject.worldTransform.position.z >= 40) {
                                                    // console.log("head shot!");
                                                    this.clientLetServerDamageChar(p.character.gameObjectId, v.gameObject.gameObjectId, this.CurrGunData.Projectil_Damage, true);
                                                }
                                                else {
                                                    this.clientLetServerDamageChar(p.character.gameObjectId, v.gameObject.gameObjectId, this.CurrGunData.Projectil_Damage, false);
                                                }
                                            } else {
                                                if (loc.z - v.gameObject.worldTransform.position.z >= 35) {
                                                    // console.log("head shot!");
                                                    this.clientLetServerDamageChar(p.character.gameObjectId, v.gameObject.gameObjectId, this.CurrGunData.Projectil_Damage, true);
                                                }
                                                else {
                                                    this.clientLetServerDamageChar(p.character.gameObjectId, v.gameObject.gameObjectId, this.CurrGunData.Projectil_Damage, false);
                                                }
                                            }


                                            throw new Error("[just ignore] stop Foreach , just return once!!");

                                        }
                                    }
                                }
                            }
                            else {
                                // 排除击中触发器和冲量对象
                                if (!(v.gameObject instanceof Trigger) && !(v.gameObject instanceof Impulse)) {
                                    // 击中场景  
                                    let loc = v.position;
                                    let rot = v.impactNormal.toRotation();
                                    rot.y -= 90;
                                    // 播放击中场景的声效、特效                                
                                    //this.ServerHitMesh(loc, rot);
                                    throw new Error("[just ignore] stop Foreach , just return once!!");
                                }
                            }
                        })
                    } catch (error) {
                    }
                }

                // 射线后的镜头抖动垂直后座、水平后座
                let y = Math.random() * Y_move;
                let z = (1 - 2 * Math.random()) * Z_move;


                let oldRota = Player.getControllerRotation()
                Player.setControllerRotation(new Rotation(oldRota.x, oldRota.y + y, oldRota.z + z));


                // 触发射击一次完毕的回调
                MyClearGuns.onClientOneShootComplete.forEach(callbackfn => callbackfn(this.CurrGunData.Ammo_CurNum, this.CurrGunData.Ammo_CurPrepare));

            }
            // 没子弹了，播放没子弹音效
            else {
                let p = Player.localPlayer;
                let char = p.character;
                MyClearGuns.ClientStopShoot();
                this.ServerPlay3DSoundOnGmoj(char.gameObjectId, "27257", 1, 400, 800);
                MyClearGuns.ClientReloadAmmo();
            }
        }
    }


    // 【数据层封装】

    /**客户端告诉服务器开火了 */
    @mw.RemoteFunction(mw.Server)
    public ClientTellServerShoot(player: Player) {
        let _pGunData = this.GunName_GunData.get(this.Players_GunName.get(player))
        if (_pGunData != undefined) {
            // 开火音效
            let S_uni = this.Text2SoundUnit(_pGunData.ShootSound);
            this.ServerPlay3DSoundOnGmoj(player.character.gameObjectId, S_uni.guid, S_uni.volume, S_uni.inner, S_uni.outter);
            this.ServerPlayAnnie(_pGunData.ShootAnime, player.userId, 1.5);
            MyClearGuns.onPlayerShoot.forEach(callbackfn => callbackfn(player.userId));
        } else {
            MyClearGuns.ServerDelGun(player);
        }
    }

    /**PIE编辑态客户端找服务器要枪，要的是TempDefaultGunData里的枪，即左侧编辑器上的 */
    @mw.RemoteFunction(mw.Server)
    public ClientAskServerForGun(player: Player) {
        MyClearGuns.ServerGiveGun(player, this.TempDefaultGunData.GunName);
    }

    /**双端可用，仅调用端，解析配置列表里的枪械数据，并加入到map里维护 */
    public GunDataListIntoMap() {
        this.GunDataJsonList.forEach((value: GunList) => {
            this.GunDataIntoMap(value.GunDataJson);
            if (SystemUtil.isClient()) {
                let InptGunData = JSON.parse(value.GunDataJson) as GunDataUnit;
                let result = InptGunData.GunGUID;
                result += ("," + InptGunData.GetGunAnime);
                result += ("," + MyClearGuns.instance.Text2SoundUnit(InptGunData.GetGunSound).guid);
                result += ("," + InptGunData.ShootAnime);
                result += ("," + MyClearGuns.instance.Text2SoundUnit(InptGunData.ShootSound).guid);
                result += ("," + InptGunData.ReloadAnime);
                result += ("," + MyClearGuns.instance.Text2SoundUnit(InptGunData.ReloadStartSound).guid);
                result += ("," + MyClearGuns.instance.Text2SoundUnit(InptGunData.ReloadOverSound).guid);
                // console.log("GunDataListIntoMap:" + result);
                this.initAssets(result)
            }
        })
    }

    /**双端可用，仅调用端，将GunDataJson解析，并加入到map里维护 */
    public GunDataIntoMap(MyGunDataJSON: string) {
        let _myGunData = JSON.parse(MyGunDataJSON) as GunDataUnit;
        this.GunName_GunData.set(_myGunData.GunName, _myGunData);
        // console.log("[MyClearGuns] 已导入枪械：" + _myGunData.GunName);
    }

    /**服务器向指定客户端下发临时枪械数据 */
    @mw.RemoteFunction(mw.Client)
    public ChangeClientCurrGunData(player: Player, MyGunDataJSON: string) {
        let _myGunData = JSON.parse(MyGunDataJSON) as GunDataUnit;
        this.CurrGunData = _myGunData;
    }

    /**客户端向服务器临时导入，将GunDataJson解析，并加入到map里维护，一般用在PIE环境 */
    @mw.RemoteFunction(mw.Server)
    public GunDataIntoServerMap(MyGunDataJSON: string) {
        let _myGunData = JSON.parse(MyGunDataJSON) as GunDataUnit;
        this.TempDefaultGunData = _myGunData;
        this.GunName_GunData.set(_myGunData.GunName, _myGunData);
        // console.log("[MyClearGuns] 已从客户端临时导入枪械：" + _myGunData.GunName);
    }

    /**服务器向指定客户端临时导入，将GunDataJson解析，并加入到map里维护，一般用在PIE环境 */
    @mw.RemoteFunction(mw.Client)
    public GunDataIntoClientMap(player: Player, MyGunDataJSON: string) {
        let _myGunData = JSON.parse(MyGunDataJSON) as GunDataUnit;
        this.GunName_GunData.set(_myGunData.GunName, _myGunData);
        // console.log("[MyClearGuns] 已从服务器临时导入枪械：" + _myGunData.GunName);
    }

    /**客户端向服务器上报伤害事件，可以在这里做一定的反作弊检测
     * @param attacker 攻击者guid
     * @param victim 受害者guid
     * @param damege 造成的伤害
     * @param HeadShot 是否爆头，不带参数视为不爆头
     */
    @mw.RemoteFunction(mw.Server)
    public clientLetServerDamageChar(attacker: string, victim: string, damege: number, HeadShot?: boolean) {
        let victimChar = GameObject.findGameObjectById(victim) as Character;
        // 判断攻击者此时有没有枪

        GameObject.asyncFindGameObjectById(attacker).then((obj) => {
            const attackerChar = obj as Character

            if (this.Players_GunName.get(attackerChar.player) != undefined) {
                // 判断此刻玩家手里的枪的伤害是否正常
                if (this.GunName_GunData.get(this.Players_GunName.get(attackerChar.player)).Projectil_Damage != damege) {
                    damege = this.GunName_GunData.get(this.Players_GunName.get(attackerChar.player)).Projectil_Damage;
                }
                // console.log("[MCG] " + attackerChar.displayName + " 击中了 " + victimChar.displayName + ",造成: " + damege + "点伤害，是否爆头： " + HeadShot);
                MyClearGuns.ServerDamageChar.forEach(callbackfn => callbackfn(attackerChar.player.userId, victimChar.player.userId, damege, HeadShot));
            }
            else {
                // 攻击者没枪但是能造成伤害，可能卡了，没有成功下掉他的枪
                // 那就再下一次
                // console.log("攻击者没枪但是能造成伤害，可能卡了，没有成功下掉他的枪");
                MyClearGuns.ServerDelGun(attackerChar.player);
            }
        })
    }

    /** 服务器向指定客户端清理客户端枪械数据缓存
     * @param player 指定客户端
     */
    @mw.RemoteFunction(mw.Client)
    public ServerRemoveClientGunData(player: Player) {
        this.CurrGunData = undefined;
    }


    /** 服务器移除所有枪
     * @param player 需要移除的玩家
     */
    @mw.RemoteFunction(mw.Server)
    public ServerDelAllWeapon(player: Player) {
        this.PlayersInfo_GunMesh.forEach((oldGobj: GameObject, oldkey) => {
            if (oldkey.includes("p_" + player.userId)) {
                if (oldGobj) {
                    // console.log("DelAllGun: " + player.userId + "-" + oldGobj.guid + "  trying destroy gun");
                    oldGobj.destroy();
                    this.PlayersInfo_GunMesh.delete(oldkey);
                }
            }
        })
    }
    /** 服务器隐藏所有枪
     * @param player 需要隐藏的玩家
     */
    @mw.RemoteFunction(mw.Server)
    public ServerHideAllWeapon(player: Player) {
        this.PlayersInfo_GunMesh.forEach((oldGobj: GameObject, oldkey) => {
            if (oldkey.includes("p_" + player.userId)) {
                if (oldGobj) {
                    oldGobj.setVisibility(2);
                }
            }
        })
    }
    /** 服务器显示所有枪
     * @param player 需要显示的玩家
     */
    @mw.RemoteFunction(mw.Server)
    public ServerShowAllWeapon(player: Player) {
        this.PlayersInfo_GunMesh.forEach((oldGobj: GameObject, oldkey) => {
            if (oldkey.includes("p_" + player.userId)) {
                if (oldGobj) {
                    oldGobj.setVisibility(1);
                }
            }
        })
    }

    /**判断是否为友军 */
    public isFriendly(PlayerID1: string, PlayerID2: string): boolean {
        for (const check of MyClearGuns.checkIfFriendly) {
            if (check(PlayerID1, PlayerID2)) {
                return true;
            }
        }
        return false;
        // //阵营系统 https://forum.ark.online/forum.php?mod=viewthread&tid=1686
        // return MyClearGuns.instance.isFriendly(PlayerID1, PlayerID2);
    }

    /**服务器下发装备枪的事件给客户端 */
    @mw.RemoteFunction(mw.Client)
    public serverLetClientEquipedGun(player: Player, gunName: string) {
        // 被下掉枪后要停止换弹状态
        this.isReloading = false;
        // 触发拿到武器后的回调
        MyClearGuns.onClientEquipedGun.forEach(callbackfn => callbackfn(gunName, this.CurrGunData.Ammo_CurNum, this.CurrGunData.Ammo_CurPrepare))
        // //无限弹药逻辑：将备弹改为一个弹匣的数量
        // this.CurrGunData.Ammo_CurPrepare = this.CurrGunData.Ammo_MaxInOne;

        // 这里写你的逻辑
    }

    /**服务器下掉枪后向客户端通信 */
    @mw.RemoteFunction(mw.Client)
    public serverLetClientRemovedGun(player: Player) {
        // 这里写你的逻辑
        // 被下掉枪后要停止换弹状态
        this.isReloading = false;
        // 被下掉枪后要停止开火
        MyClearGuns.ClientStopShoot();
        MyClearGuns.onClientRemovedGun.forEach(callbackfn => callbackfn())
    }


    //【表现层封装】

    /** 服务器给玩家装备枪械模型
     * @param guid 武器guid
     * @param player 需要装配枪械的玩家
     * @param offset 枪械的偏移
     * @param rotation 枪械的旋转
     * @param scale 枪械的缩放
     */
    @mw.RemoteFunction(mw.Server)
    public async ServerEquipWeapon(guid: string, player: Player, offset?: Vector, rotation?: Rotation, scale?: Vector) {

        /**枪械储存标识符 */
        let PlayerInfoGunGUID = "p_" + player.userId;

        this.ServerDelAllWeapon(player);

        GameObject.asyncSpawn(guid, { replicates: true }).then((MyNewGobj) => {
            if (offset == undefined) {
                offset = Vector.zero;
            }
            if (rotation == undefined) {
                rotation = Rotation.zero;
            }
            if (scale == undefined) {
                scale = Vector.one;
            }
            offset = new Vector(offset.x, offset.y, offset.z);
            rotation = new Rotation(rotation.x, rotation.y, rotation.z);
            scale = new Vector(scale.x, scale.y, scale.z);
            let MyTransform = new Transform(offset, rotation, scale)
            MyNewGobj.worldTransform = MyTransform;
            MyNewGobj.setCollision(2);
            MyNewGobj.getChildren().forEach((ggobj) => {
                ggobj.setCollision(2)
            })
            player.character.attachToSlot(MyNewGobj, 16);
            PlayerInfoGunGUID += MyNewGobj.gameObjectId;
            this.PlayersInfo_GunMesh.set(PlayerInfoGunGUID, MyNewGobj);
            // console.log("MyNewGobjGUID:" + MyNewGobj.guid + ", pinfo:" + PlayerInfoGunGUID);


        })

    }

    /**子弹击中墙面声效，客户端向服务器发起同步，默认1200内可见可听，受裁剪影响
     * @param loc 弹痕特效、声音的位置
     * @param rot 弹痕特效的旋转
     */
    @mw.RemoteFunction(mw.Server)
    public ServerHitMesh(loc: Vector, rot: Rotation) {
        Player.getAllPlayers().forEach((player) => {
            let dis = loc.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
            if (dis <= (1200 * this.EffectCutDistanceScale)) {
                this.ServerPlayEffectOnLoc("98962", 1, loc, rot, Vector.one, 1200);
            }
            if (dis <= (800 * this.EffectCutDistanceScale)) {
                this.ServerPlay3DSoundOnLoc(loc, "114172", 1, 4, 8);
            }
        })
    }

    /**子弹确认击中角色声效，客户端向服务器发起同步，默认1200内可见可听，受裁剪影响，建议在此之前判断好是否是队友
     * @param CharGuid 确认击中的角色
     * @param loc 击中位置
     * @param rot 特效的旋转
     * @param hitAinimGuid 可选，受击者需要播放的动画，默认46284
     */
    @mw.RemoteFunction(mw.Server)
    public ServerHitChar(CharGuid: string, loc: Vector, rot: Rotation, hitAinimGuid?: string) {
        if (hitAinimGuid == undefined) {
            hitAinimGuid = "46284";
        }
        let char = GameObject.findGameObjectById(CharGuid) as Character;
        let hitAnime = char.loadAnimation("46284");
        // console.log("hit.z: " + loc.z + ", char.z: " + char.worldTransform.position.z + ", collison.z: " + char.collisionExtent.z);

        if (!char.isCrouching) {
            hitAnime.play();
            // if (loc.z - char.worldTransform.position.z - char.collisionExtent.z >= -38) {
            //     console.log("head shot!");
            // }
        } else {
            hitAnime.slot = AnimSlot.Upper;
            hitAnime.play();
            // if (loc.z - char.worldTransform.position.z - char.collisionExtent.z >= -10) {
            //     console.log("head shot!");
            // }
        }


        Player.getAllPlayers().forEach((player) => {
            let dis = char.worldTransform.position.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
            if (dis <= (1200 * this.EffectCutDistanceScale)) {
                let MyScal = Vector.one.multiply(0.3);
                this.ServerPlayEffectOnLoc("29392", 1, loc, rot, MyScal, 1200);
            }
            if (dis <= (800 * this.EffectCutDistanceScale)) {
                this.ServerPlay3DSoundOnLoc(loc, "115257", 1, 4, 8);
            }
        })
    }

    //【声效相关】

    /** 服务器在指定位置播放3D声音，自动裁剪
     * @param guid 播放声音的GUID,<=0时不播放
     * @param startLoc 播放声音的起始位置
     * @param volume 播放声音的音量
     * @param inner 声音的内径，1=1个正方体的边长=100
     * @param outter 声音的外径,超过外径*全局缩放比的距离的玩家将不会接收到改声音，以节省性能
     */
    @mw.RemoteFunction(mw.Server)
    public ServerPlay3DSoundOnLoc(startLoc: Vector, guid: string, volume: number, inner: number, outter: number) {
        if (Number(guid) <= 0) { return };
        const in_ = inner;
        const out_ = outter;
        inner = in_ < out_ ? in_ : out_;
        outter = in_ >= out_ ? in_ : out_;
        inner *= MyClearGuns.instance.SoundCutDistanceScale * 100;
        outter *= MyClearGuns.instance.SoundCutDistanceScale * 100;
        startLoc = new Vector(startLoc.x, startLoc.y, startLoc.z);
        Player.getAllPlayers().forEach((player) => {
            let dis = startLoc.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
            if (dis <= outter) {
                this.ClientPlay3DSoundOnLoc(player, startLoc, guid, volume, inner, outter);
            }
        })
    }
    /** 客户端被服务器RPC在指定位置播放3D声音
     * @param player 指定的客户端
     * @param guid 播放声音的GUID
     * @param startLoc 播放声音的起始位置
     * @param volume 播放声音的音量
     * @param inner 声音的内径
     * @param outter 声音的外径
     */
    @mw.RemoteFunction(mw.Client)
    public ClientPlay3DSoundOnLoc(player: Player, startLoc: Vector, guid: string, volume: number, inner: number, outter: number) {
        // 2023.12.03 尝试修复开火声音丢失问题
        if (!AssetUtil.assetLoaded(guid)) {
            AssetUtil.asyncDownloadAsset(guid).then((result: boolean) => {
                if (result) {
                    startLoc = new Vector(startLoc.x, startLoc.y, startLoc.z);
                    SoundService.play3DSound(guid, startLoc, 1, volume, { radius: inner, falloffDistance: outter });
                }
            })
        } else {
            startLoc = new Vector(startLoc.x, startLoc.y, startLoc.z);
            SoundService.play3DSound(guid, startLoc, 1, volume, { radius: inner, falloffDistance: outter });
        }
    }
    /** 服务器在指定Gmoj播放3D声音，自动裁剪
     * @param guid 播放声音的GUID,<=0时不播放
     * @param Gmojguid 播放声音的Gameobject的GUID
     * @param volume 播放声音的音量
     * @param inner 声音的内径，1=1个正方体的边长=100
     * @param outter 声音的外径,超过外径*全局缩放比的距离的玩家将不会接收到改声音，以节省性能
     */
    @mw.RemoteFunction(mw.Server)
    public ServerPlay3DSoundOnGmoj(Gmojguid: string, guid: string, volume: number, inner: number, outter: number) {
        if (Number(guid) <= 0) { return };
        const in_ = inner;
        const out_ = outter;
        inner = in_ < out_ ? in_ : out_;
        outter = in_ >= out_ ? in_ : out_;
        inner *= MyClearGuns.instance.SoundCutDistanceScale * 100;
        outter *= MyClearGuns.instance.SoundCutDistanceScale * 100;
        let obj = GameObject.findGameObjectById(Gmojguid);
        Player.getAllPlayers().forEach((player) => {
            let dis = obj.worldTransform.position.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
            if (dis <= outter) {
                this.ClientPlay3DSoundOnGmoj(player, Gmojguid, guid, volume, inner, outter);
            }
        })
    }
    /** 客户端被服务器RPC在指定Gmoj上播放3D声音
     * @param player 指定的客户端
     * @param guid 播放声音的GUID
     * @param Gmojguid 播放声音的Gameobject的GUID
     * @param volume 播放声音的音量
     * @param inner 声音的内径
     * @param outter 声音的外径
     */
    @mw.RemoteFunction(mw.Client)
    public ClientPlay3DSoundOnGmoj(player: Player, Gmojguid: string, guid: string, volume: number, inner: number, outter: number) {
        // 2023.12.03 尝试修复开火声音丢失问题
        if (!AssetUtil.assetLoaded(guid)) {
            AssetUtil.asyncDownloadAsset(guid).then((result: boolean) => {
                if (result) {
                    SoundService.play3DSound(guid, Gmojguid, 1, volume, { radius: inner, falloffDistance: outter });
                }
            })
        } else {
            SoundService.play3DSound(guid, Gmojguid, 1, volume, { radius: inner, falloffDistance: outter });
        }
    }

    //【特效相关】
    /** 服务器在指定position上播放特效，自动裁剪
     * @param guid 特效guid，<=0不播放
     * @param loop 循环次数，负数则为时间
     * @param position 特效的位置
     * @param rotation 特效的旋转
     * @param scale 特效的缩放
     * @param distance 最大可视距离，超视距就不同步给客户端了
     */
    @mw.RemoteFunction(mw.Server)
    public ServerPlayEffectOnLoc(guid: string, loop: number, position: Vector, rotation: Rotation, scale: Vector, distance: number) {
        if (Number(guid) <= 0) { return; }
        position = new Vector(position.x, position.y, position.z);
        rotation = new Rotation(rotation.x, rotation.y, rotation.z);
        scale = new Vector(scale.x, scale.y, scale.z);
        distance *= MyClearGuns.instance.EffectCutDistanceScale;
        Player.getAllPlayers().forEach((player) => {
            let dis = position.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
            if (dis <= distance) {
                this.ClientPlayEffectOnLoc(player, guid, loop, position, rotation, scale);
            }
        })
    }
    /** 客户端被服务器RPC在指定GUID的Gameobject上播放特效
     * @param player 指定的客户端
     * @param guid 特效guid，<=0不播放
     * @param loop 循环次数，负数则为时间
     * @param position 特效的位置
     * @param rotation 特效的旋转
     * @param scale 特效的缩放
     */
    @mw.RemoteFunction(mw.Client)
    public ClientPlayEffectOnLoc(player: Player, guid: string, loop: number, position: Vector, rotation: Rotation, scale: Vector) {
        position = new Vector(position.x, position.y, position.z);
        rotation = new Rotation(rotation.x, rotation.y, rotation.z);
        scale = new Vector(scale.x, scale.y, scale.z);
        EffectService.playAtPosition(guid, position, {
            loopCount: loop,
            rotation: rotation,
            scale: scale
        });
    }

    /** 服务器在指定GUID的Gameobject上播放特效，自动裁剪
     * @param guid 特效guid，<=0不播放
     * @param gmobjGUID 需要播放特效的gameobject
     * @param loop 循环次数，负数则为时间
     * @param offset 特效的偏移
     * @param rotation 特效的旋转
     * @param scale 特效的缩放
     * @param distance 最大可视距离，超视距就不同步给客户端了
     */
    @mw.RemoteFunction(mw.Server)
    public ServerPlayEffectAtGmoj(guid: string, gmobjGUID: string, loop: number, offset: Vector, rotation: Rotation, scale: Vector, distance: number) {
        if (Number(guid) <= 0) { return; }
        GameObject.asyncFindGameObjectById(gmobjGUID).then((gmobj) => {
            offset = new Vector(offset.x, offset.y, offset.z);
            rotation = new Rotation(rotation.x, rotation.y, rotation.z);
            scale = new Vector(scale.x, scale.y, scale.z);
            distance *= MyClearGuns.instance.EffectCutDistanceScale;
            Player.getAllPlayers().forEach((player) => {
                let dis = gmobj.worldTransform.position.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
                if (dis <= distance) {
                    this.ClientPlayEffectAtGmoj(player, guid, gmobjGUID, loop, offset, rotation, scale)
                }
            })
        })
    }
    /** 客户端被服务器RPC在指定GUID的Gameobject上播放特效
     * @param player 指定的客户端
     * @param guid 特效guid，<=0不播放
     * @param gmobjGUID 需要播放特效的gameobject
     * @param loop 循环次数，负数则为时间
     * @param offset 特效的偏移
     * @param rotation 特效的旋转
     * @param scale 特效的缩放
     */
    @mw.RemoteFunction(mw.Client)
    public ClientPlayEffectAtGmoj(player: Player, guid: string, gmobjGUID: string, loop: number, offset: Vector, rotation: Rotation, scale: Vector) {
        offset = new Vector(offset.x, offset.y, offset.z);
        rotation = new Rotation(rotation.x, rotation.y, rotation.z);
        scale = new Vector(scale.x, scale.y, scale.z);
        GameObject.asyncFindGameObjectById(gmobjGUID).then((gmobj) => {
            EffectService.playOnGameObject(guid, gmobj, {
                position: offset, rotation: rotation, loopCount: loop, scale: scale
            });

            //loop, offset, rotation, scale
        })
    }

    //【动画相关】
    /**服务器在指定玩家身上广播指定动画，自动距离裁剪
     * @param guid 动画guid
     * @param AnnieplayerID 要播放动画的玩家 
     * @param speed 播放动画的速度
     * @returns 
     */
    @mw.RemoteFunction(mw.Server)
    public ServerPlayAnnie(guid: string, AnnieplayerID: string, speed?: number) {
        if (Number(guid) <= 0) { return; }
        if (speed == undefined) {
            speed = 1;
        }
        Player.getAllPlayers().forEach((player) => {
            let dis = Player.getPlayer(AnnieplayerID).character.worldTransform.position.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
            if (dis <= this.AnnieCutDistance) {
                let fireEffectID = [];
                this.PlayersInfo_GunMesh.forEach((Gunmesh, key) => {
                    if (key.includes(AnnieplayerID)) {
                        Gunmesh.getChildren().forEach(gobj => {
                            if (gobj.tag == "FireEffect") {
                                fireEffectID.push(gobj.gameObjectId);
                            }
                        })
                    }
                })
                this.ClientPlayAnnie(player, guid, AnnieplayerID, speed, fireEffectID)
            }
        })
    }
    /** 客户端被服务器RPC在指定GUID的Gameobject上播放特效
     * @param player 指定的客户端
     * @param guid 特效guid，<=0不播放
     * @param loop 循环次数，负数则为时间
     * @param position 特效的位置
     * @param rotation 特效的旋转
     * @param scale 特效的缩放
     */
    @mw.RemoteFunction(mw.Client)
    public ClientPlayAnnie(player: Player, guid: string, AnnieplayerID: string, speed: number, fireEffectID?: string[]) {
        const PChar = Player.getPlayer(AnnieplayerID).character
        if (PChar) {
            const _anim = PChar.loadAnimation(guid);
            _anim.speed = speed;
            _anim.loop = 1;
            _anim.slot = AnimSlot.Upper;
            _anim.play();
        }
        if (fireEffectID.length != 0 ) {
            fireEffectID.forEach((EID)=>{
                GameObject.asyncFindGameObjectById(EID).then((v: Effect) => {
                    v.play();
                    setTimeout(() => {
                        v.stop();
                    }, 60);
                })
            })
        }
    }

    ////////////////////////////
    //       通用工具接口      //
    ////////////////////////////

    public getShootDir(chara: Character, startPos: Vector, shootRange: number) {
        const camera = Camera.currentCamera;
        let start = Vector.zero;
        let end = Vector.zero;
        let dir = Vector.zero;
        if (startPos) {
            start = startPos;
        }
        if (camera) {
            end = camera.worldTransform.position.add(camera.worldTransform.getForwardVector().multiply(shootRange));
            const hits = QueryUtil.lineTrace(camera.worldTransform.position, end, false, false, [], false, true, chara);
            dir = end.subtract(start);
            if (hits.length > 1) {
                dir = hits[1].impactPoint.subtract(start);
            }
        }
        return dir.normalize();
    }


    /** 将SoundUnit音效通用基元转换为String
     * @param S_uni 需要转换的音效通用基元
     * @returns 返回转换后的String: guid|volume|inner|outter
     */
    public SoundUnit2Text(S_uni: SoundUnit): string {
        return (S_uni.guid + "|" + S_uni.volume + "|" + S_uni.inner + "|" + S_uni.outter);
    }

    /** 文本String转SoundUnit音效通用基元，格式不对返回基元的默认值 */
    public Text2SoundUnit(Text: string): SoundUnit {
        let myS_uni = new SoundUnit;
        let parts = Text.split("|").map(parseFloat);
        if (parts.length != 4 || parts.some(isNaN)) {
            return myS_uni;
        } else {
            myS_uni.guid = parseInt(parts[0] + "") + "";
            myS_uni.volume = parts[1];
            myS_uni.inner = parts[2];
            myS_uni.outter = parts[3];
            return myS_uni;
        }
    }

    /** v3、旋转变量转换为string
    * @param v3 传入的v3或旋转
    * @returns 返回转换好的string
    */
    public v3toString(v3: Rotation | Vector): string {
        let st = v3.x + "|" + v3.y + "|" + v3.z;
        return st;
    }

    /**文本转Rotation，如格式不对则返回Rotation.Zero */
    public stringToRotation(st: string): Rotation {
        let parts = st.split("|").map(parseFloat);
        if (parts.length != 3 || parts.some(isNaN)) {
            return Rotation.zero;
        } else {
            return new Rotation(parts[0], parts[1], parts[2]);
        }
    }

    /**文本转Vector，如格式不对则返回Vector.one */
    public stringToVector(st: string): Vector {
        let parts = st.split("|").map(parseFloat);
        if (parts.length != 3 || parts.some(isNaN)) {
            return Vector.one;
        } else {
            return new Vector(parts[0], parts[1], parts[2]);
        }
    }

    @RemoteFunction(Server)
    private toServer(obj:GameObject,player:Player,objName:string) {
        // console.log("进入命中服务端")
        EffectService.playOnGameObject("27422",obj)
        SoundService.play3DSound("199431",obj,1,80,{radius:1500,falloffDistance:2000})
        obj.setVisibility(false);
        (obj as Model).setCollision(CollisionStatus.Off);
        let settlementManager = SettlementManager.getInstance();
        let score;
        if(objName.includes("地狱龙")){
            score = 2;
        }
        if(objName.includes("宠物")){
            score = 1;
        }
        settlementManager.AddPlayerCount(player.userId,score);
        // console.log("玩家"+player.userId+" 命中"+settlementManager.GetPlayerCount(player.userId)+"次")
        Event.dispatchToClient(player,"L6_Hurt",settlementManager.GetPlayerCount(player.userId))
    }

}
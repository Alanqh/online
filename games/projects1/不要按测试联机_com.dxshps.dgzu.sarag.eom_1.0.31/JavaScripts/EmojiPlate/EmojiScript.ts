import { PlayerManagerExtesion } from "../Modified027Editor/ModifiedPlayer";
import { PetModuleC } from "../modules/petModule/PetModuleC";
import { FourPlayerState } from "../modules/petModule/fourPlayerFSM/FourPlayerFSM";
import P_EmojiEnter from "./UI/P_EmojiEnter";


export const WheelCancelRadius = 0.4;
export const ChatListLength = 8;
export enum ChatType{
    Emoji = 1,
    Animation = 2,
}


@Component
export default class EmojiScript extends Script {
    public static instance: EmojiScript;
    @mw.Property({ displayName: "播放冷却" })
    public playCoolTime: number = 2;
    @mw.Property({ displayName: "初始化的时候是否为人形对象" })
    private isHuman: boolean = false;
    @mw.Property({ displayName: "未选中轮盘颜色", group: "轮盘表现相关" })
    private unChooseColor: string = "#FFFFFF";
    @mw.Property({ displayName: "选中轮盘颜色", group: "轮盘表现相关" })
    private chooseColor: string = "#FFD600";
    @mw.Property({ displayName: "轮盘选中缩放", group: "轮盘表现相关" })
    private chooseScale: Vector2 = new Vector2(1.2, 1.2);
    @mw.Property({ displayName: "轮盘选中缩放动画过度时间", group: "轮盘表现相关" })
    private tweenTime: number = 0.1;
    @mw.Property({ displayName: "对应表情配置表id(逗号分隔)", group: "人物相关" })
    private emojiString: string = "";
    @mw.Property({ displayName: "表情的偏移位置", group: "人物相关" })
    private emojiOffset: Vector = new Vector(0, 0, 300);
    @mw.Property({ displayName: "表情的缩放", group: "人物相关" })
    private emojiScale: Vector = new Vector(2, 2, 2);
    @mw.Property({ displayName: "对应表情配置表id(逗号分隔)", group: "宠物相关" })
    private emojiAnimalString: string = "";
    @mw.Property({ displayName: "表情的偏移位置", group: "宠物相关" })
    private animalEmojiOffset: Vector = new Vector(0, 0, 300);
    @mw.Property({ displayName: "表情的缩放", group: "宠物相关" })
    private animalEmojiScale: Vector = new Vector(2, 2, 2);
    

    /**客户端使用 */
    private emojiStringList_c: Array<number> = new Array<number>();
    private animalEmojiStringList_c: Array<number> = new Array();
    private curAnimation: Animation;
    private usedList: Array<number>;
    /**服务器使用 */
    private playerEmojiMap:Map<number,number> = new Map();


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart() {
        EmojiScript.instance = this;
        if (SystemUtil.isServer()) {
            Event.addClientListener("EmojiScript_playEmoji", this.net_playEmoji.bind(this));
            Player.onPlayerLeave.add((player: Player)=>{
                if (!this.playerEmojiMap.has(player.playerId)) {
                    return;
                }
                this.playerEmojiMap.delete(player.playerId);
            })
            return;
        }
        let tempArray = this.emojiString.split(",");
        tempArray.forEach(element => {
            this.emojiStringList_c.push(Number(element));
        })
        tempArray.length = 0;
        tempArray = this.emojiAnimalString.split(",");
        tempArray.forEach(element => {
            this.animalEmojiStringList_c.push(Number(element));
        })
        this.useUpdate = true;
    }
    /**外部赋值获取数据方法 */
    public setGetEmojiInfoFunc(func: (id: number)=> EmojiInfo){
        this.getEmojiInfoFunc = func;
        if (SystemUtil.isServer()) {
            return;
        }
        let data = this.isHuman ? this.emojiStringList_c : this.animalEmojiStringList_c
        this.usedList = data;
        UIService.show(P_EmojiEnter).initData(data);
    }

    public refreshByAnimal(isAnimal: boolean){
        if (isAnimal) {
            this.usedList = this.animalEmojiStringList_c;
            UIService.getUI(P_EmojiEnter).initData(this.animalEmojiStringList_c);
            return;
        }
        this.usedList = this.emojiStringList_c;
        UIService.getUI(P_EmojiEnter).initData(this.emojiStringList_c);
        
    }

    public getWheelItemParam(){
        return {
            unChooseColor: this.unChooseColor,
            chooseColor: this.chooseColor,
            chooseScale: this.chooseScale,
            tweenTime: this.tweenTime,
        }
    }

    private getEmojiInfoFunc: (id: number)=> EmojiInfo;
    /**内部调用，外部禁止使用 */
    public getEmojiInfo(id: number){
        if (!this.getEmojiInfoFunc) {
            return new EmojiInfo();
        }
        return this.getEmojiInfoFunc(id);
    }

    public getCanPlayChatFunc: ()=>boolean;

    private getCanPlayChat(){
        if (this.getCanPlayChatFunc) {
            return this.getCanPlayChatFunc();
        }
        return true;
    }

    public endAnimation(){
        if (this.curAnimation) {
            this.emojiActionFinish();
        }
    }


    playChat(index:number){
        if (this.usedList.length <= index || index < 0) {
            return;
        }
        let configId: number = this.usedList[index];
        let config = this.getEmojiInfo(configId);
        if(!config) return;
        if(config.ChatType == ChatType.Emoji){
            Event.dispatchToServer("EmojiScript_playEmoji", configId);
            SoundService.playSound(config.SoundGuid,config.SoundLoop,config.SoundVolume);
        }else{
            if (!this.getCanPlayChat()) {
                return;
            }
            this.playAction(configId);
        }

    }

    protected onUpdate(dt: number): void {
        if (SystemUtil.isServer()) {
            return;
        }
        if (!this.curAnimation) {
            return;
        }
        if (Player.localPlayer.character.isMoving || Player.localPlayer.character.isJumping) {
            this.endAnimation();
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }

    /**客户端代码 */
    public playAction(configId: number){
        if (Player.localPlayer.character.isMoving || Player.localPlayer.character.isJumping) {
            return;
        }
        let dataInfo = this.getEmojiInfo(configId);
        this.curAnimation = PlayerManagerExtesion.loadAnimationExtesion(Player.localPlayer.character, dataInfo.AssetGuid);
        this.curAnimation.loop = dataInfo.ChatLoop
        this.curAnimation.speed = dataInfo.AnimationTime == -1 ? 1: this.curAnimation.length / dataInfo.AnimationTime;
        this.curAnimation.play();
        this.curAnimation.onFinish.add(()=>{
            this.emojiActionFinish();
        })
    }


    private emojiActionFinish(){
        if (this.curAnimation) {
            this.curAnimation.stop();
            this.curAnimation = null;   
        }
        ModuleService.getModule(PetModuleC).changeState(true, FourPlayerState.IdleState);
    }

    /**下面是服务器代码 */
    public net_playEmoji(player: Player, configId: number){
        let config = this.getEmojiInfo(configId);
        if(!config) return;
        let playerId = player.playerId;
        if(this.playerEmojiMap.has(playerId)) {
            EffectService.stop(this.playerEmojiMap.get(playerId));
        };
        let slot: number = mw.HumanoidSlotType.Root;
        let characterType = player.character.characterType;
        let offset = this.emojiOffset;
        let scale = this.emojiScale;
        if (characterType == CharacterType.FourFootStandard) {
            slot = NonHumanoidSlotType.Root;
            offset = Vector.divide(this.animalEmojiOffset.clone(), player.character.worldTransform.scale);
            scale = Vector.divide(this.animalEmojiScale.clone(), player.character.worldTransform.scale);
        }
        
        let playId = EffectService.playOnGameObject(config.AssetGuid, player.character, {
            slotType: slot,
            position: offset,
            loopCount: 2,
            rotation: mw.Rotation.zero,
            scale: scale,
        })
        this.playerEmojiMap.set(playerId,playId);
    }
    

}

export class EmojiInfo{
    /**交互名字 */
    public Name: string = "笑哭";
    /**交互guid */
    public AssetGuid: string = "184427";
    /**交互icon */
    public Icon: string = "50317";
    /**交互类型（1 = 表情，2 = 动作） */
    public ChatType: number = 1;
    /**交互循环次数 */
    public ChatLoop: number = 1;
    /**动画播放时间 */
    public AnimationTime: number = 0;
    /**声音Guid */
    public SoundGuid: string = "265055";
    /**声音循环次数 */ 
    public SoundLoop: number = 1;
    /**声音音量 */
    public SoundVolume: number = 1;
    /**是否读取资源icon */
    public IconReadAssetsGuid: boolean = true;
}
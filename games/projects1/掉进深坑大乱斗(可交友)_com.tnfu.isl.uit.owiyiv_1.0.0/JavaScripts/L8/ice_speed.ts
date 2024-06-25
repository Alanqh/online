// @Component

// export default class b_tx extends Script {
//     /** 当脚本被实例后，会在第一帧更新前调用此函数 */
//     protected onStart(): void {
//         if(SystemUtil.isClient()){
//             // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
//             const trigger = this.gameObject as Trigger;

//             // 检测进入触发器范围的玩家
//             trigger.onEnter.add((other) => {
//                 //判断是否是角色
//                 if(other instanceof Character){
//                     this.EnterFun(other);
//                     console.log("进入");
//                 }  
//             });           
//             // 当有物体离开触发器时，执行此函数
//             trigger.onLeave.add((other: GameObject) => {
//                 // 如果离开的物体是Character类型
//                 if (other instanceof Character) {
//                     this.LeaveFun(other);
//                     console.log("离开");
//                 }
//             });
//         }
//     }
    
//     @RemoteFunction(Client)
//     //根据传入的Character参数来处理角色相关的逻辑
//     public EnterFun(chara:Character): void {

//         //声明角色
//         let player = Player.localPlayer.character
//         //启用地面摩擦力
//         player.groundFrictionEnabled = true;
//         //设备角色的地面摩擦力=10
//         player.groundFriction = 1;
//     }
//     public LeaveFun(chara:Character): void {
//         //声明角色
//         let player = Player.localPlayer.character
//         //启用地面摩擦力
//         player.groundFrictionEnabled = false;
//         //设备角色的地面摩擦力=10
//         player.groundFriction = 10;
//     }
// }

@Component
export default class b_tx extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if(SystemUtil.isClient()){
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject as Trigger;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if(other instanceof Character){
                    this.ice_speed(other.player);
                }              
            });
            trigger.onLeave.add((other: GameObject) => {
                // 如果离开的物体是Character类型
                if (other instanceof Character) {
                    this.fall_speed(other.player);
                }
            });
        }
    }
    @RemoteFunction(Client)
    private ice_speed(player:Player):void{
        this.useUpdate=true;
        let myPlayer = Player.localPlayer;
        // 获取当前玩家控制的角色
        let myCharacter = myPlayer.character;
        // 最大加速度为原来的0.1倍
        // myCharacter.maxAcceleration = 0.1 * myCharacter.maxAcceleration;
        // 最大转向速度为原来的0.5倍
        // myCharacter.rotateRate = 0.5 * myCharacter.rotateRate;
        // 最大行走速度为原来的2倍
        // myCharacter.maxWalkSpeed = 0.5 * myCharacter.maxWalkSpeed;
        // 行走制动速率为原来的0.1倍
        myCharacter.brakingDecelerationWalking = 0.2 * myCharacter.brakingDecelerationWalking;
        // 地面摩擦系数为1
        myCharacter.groundFriction = 0.5;
        console.log("进入");
    }
    @RemoteFunction(Client)
    private fall_speed(player:Player):void{
        this.useUpdate=true;
        let myPlayer = Player.localPlayer;
        // 获取当前玩家控制的角色
        let myCharacter = myPlayer.character;
        // 最大加速度为原来的0.1倍
        // myCharacter.maxAcceleration = 0.1 * myCharacter.maxAcceleration;
        // 最大转向速度为原来的0.5倍
        // myCharacter.rotateRate = 0.5 * myCharacter.rotateRate;
        // 最大行走速度为原来的2倍
        // myCharacter.maxWalkSpeed = 0.5 * myCharacter.maxWalkSpeed;
        // 行走制动速率为原来的0.1倍
        myCharacter.brakingDecelerationWalking =myCharacter.brakingDecelerationWalking;
        // 地面摩擦系数为1
        myCharacter.groundFriction = 8;
        console.log("出去");
    }
    protected onUpdate(): void {
        if(SystemUtil.isClient()){
            let myPlayer = Player.localPlayer;
            // 获取当前玩家控制的角色
            let myCharacter = myPlayer.character;
            if(myCharacter.isMoving){
                console.log("移动中");
            }
        }
    }
}
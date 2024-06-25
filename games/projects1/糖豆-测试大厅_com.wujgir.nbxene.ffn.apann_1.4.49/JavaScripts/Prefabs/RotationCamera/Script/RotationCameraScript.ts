/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-06 09:21:44
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-02-06 09:22:17
 * @FilePath     : \stumbleguys\Prefabs\RotationCamera\Script\RotationCameraScript.ts
 * @Description  : 修改描述
 */
/*
 * @Author: zhenhaung.luo  zhenhuang.luo@appshahe.com
 * @Date: 2023-02-02 16:50:52
 * @LastEditors: zhenhuang.luo  zhenhuang.luo@appshahe.com
 * @LastEditTime: 2023-02-02 17:17:12
 * @FilePath: \Demo1\Prefabs\RotationCamera\Script\RotationCameraScript.ts
 * @Descripttion: 
 */

@Component
export default class RotationCameraScript extends mw.Script {
    @mw.Property({ displayName: "是否启用", group: "参数" })
    public isEnable: boolean = true;
    @mw.Property({ displayName: "旋转速度", group: "参数", range: { min: 0.01, max: 50 } })
    public speed: number = 20;

    private dir: mw.Vector2;
    private actor: Character;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        Player.asyncGetLocalPlayer().then(player => {
            this.actor = player.character;
        });
        Event.addLocalListener("Joy.Move.Client", this.addYawInput);
        Event.addLocalListener("Joy.Up.Client", this.onYawRelease);
    }
    /**
     * 设置监听镜头偏移
     * @param vec 
     * @returns 
     */
    private addYawInput = (vec: mw.Vector2) => {
        if (!this.isEnable && !this.actor) return;
        this.useUpdate = true;
        this.dir = vec;
    }
    /**
     * 停止监听
     */
    private onYawRelease = () => {
        this.useUpdate = false;
        this.dir = Vector2.zero;
    }


    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        const controller = this.actor["actor"].GetPlayerController();
        controller.AddYawInput(this.dir.x * dt * this.speed);
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}
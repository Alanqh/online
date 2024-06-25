/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-05 14:38:44
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-03-19 15:54:04
 * @FilePath     : \stumbleguys\JavaScripts\prefabs\SpawnLocation\Script\SpawnLocationScript.ts
 * @Description  : 修改描述
 */

@Component
export default class SpawnLocationScript extends mw.Script {

    @mw.Property({ displayName: "镜头抬高角度", range: { min: 0, max: 90 }, group: "配置" })
    private cameraPitchAngle: number = 20;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.gameObject.setVisibility(mw.PropertyStatus.Off);
        const loc = this.gameObject.worldTransform.position;
        Player.asyncGetLocalPlayer().then(player => {
            loc.x += MathUtil.randomFloat(0, 100 * this.gameObject.worldTransform.scale.x) - 50 * this.gameObject.worldTransform.scale.x;
            loc.y += MathUtil.randomFloat(0, 100 * this.gameObject.worldTransform.scale.y) - 50 * this.gameObject.worldTransform.scale.y;
            loc.z += 120;
            player.character.worldTransform.position = loc;
            player.character.lookAt(mw.Vector.add(player.character.worldTransform.position, mw.Vector.multiply(this.gameObject.worldTransform.getForwardVector(), 100)));

            const playerColl = player.character["actor"].GetPlayerController();
            let r = this.gameObject.worldTransform.rotation.z;

            //尝试旋转镜头到正确的位置
            for (let i = 0; i < 4; i++) {
                if (r > 90) {
                    playerColl.AddYawInput(90 / playerColl.InputYawScale);
                    r -= 90;
                } else if (r < -90) {
                    playerColl.AddYawInput(-90 / playerColl.InputYawScale);
                    r += 90;
                } else {
                    playerColl.AddYawInput(r / playerColl.InputYawScale);
                    break;
                }
            }
            // playerColl.AddPitchInput(-this.cameraPitchAngle / playerColl.InputPitchScale);
        });
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}

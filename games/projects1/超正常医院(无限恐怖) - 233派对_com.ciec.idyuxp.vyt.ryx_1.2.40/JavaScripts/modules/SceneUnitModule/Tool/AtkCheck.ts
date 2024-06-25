
import { GlobalData } from "../../../const/GlobalData";


/**攻击检测 */
export class AtkCheck {


    /**
     * 玩家变身后攻击玩家判定 
     * return 返回攻击到的玩家 playerId 
     */
    public static playerAtkPlayer(charcter: mw.Character): number {
        let halfSize = new mw.Vector(50, 50, 50); // 攻击范围一半
        let attackDis = 100; // 攻击距离
        GlobalData.TempVector.vector1.x = halfSize.x;
        GlobalData.TempVector.vector2.x = halfSize.x + attackDis;
        let startPos = charcter.worldTransform.transformPosition(GlobalData.TempVector.vector1);
        let endPos = charcter.worldTransform.transformPosition(GlobalData.TempVector.vector2);
        let resList = QueryUtil.boxTrace(startPos, endPos, halfSize, GlobalData.TempRotation.rotation1, true, true, [], false, charcter);

        let playerId: number = null;

        resList.forEach((res) => {
            if (playerId) return;
            let obj = res.gameObject;
            if (obj instanceof Character) {
                if (obj.player) {
                    playerId = obj.player.playerId;
                }
            }
        });
        return playerId;
    }

    public static setLocal(obj: mw.GameObject, loc: mw.Vector, scl: mw.Vector) {
        obj.localTransform.position = loc;
        obj.localTransform.scale = scl;
    }

    /**
     * 查找物体周围的可用空地
     * @param char 发起者
     * @param dis 距离
     * @param radius 半径
     */
    public static findCanUseLoc(char: Character, dis: number, radius: number) {
        let transform = char.worldTransform;

        //char正前方
        let tarPos = transform.position.clone().add(transform.getForwardVector().multiply(dis));
        let hitlen = QueryUtil.sphereOverlap(tarPos, radius, true, [], false, char);
        if (hitlen.length == 0) return tarPos;

        //char正后方
        tarPos = transform.position.clone().add(transform.getForwardVector().multiply(-dis));
        hitlen = QueryUtil.sphereOverlap(tarPos, radius, true, [], false, char);
        if (hitlen.length == 0) return tarPos;

        //char左方
        tarPos = transform.position.clone().add(transform.getRightVector().multiply(dis));
        hitlen = QueryUtil.sphereOverlap(tarPos, radius, true, [], false, char);
        if (hitlen.length == 0) return tarPos;

        //char右方
        tarPos = transform.position.clone().add(transform.getRightVector().multiply(-dis));
        hitlen = QueryUtil.sphereOverlap(tarPos, radius, true, [], false, char);
        if (hitlen.length == 0) return tarPos;

        return null;

    }

}

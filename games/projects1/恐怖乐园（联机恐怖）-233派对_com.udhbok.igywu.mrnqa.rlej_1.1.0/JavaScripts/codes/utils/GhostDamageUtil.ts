import GhostBehavoirInst from "../modules/ghost/GhostBehavoir";
import GhostInst from "../modules/ghost/GhostInst";
import GhostBossInst from "../modules/ghostBoss/GhostBossInst";

export class GhostDmageUtil {
    public static getDamgeRate(self: GhostBehavoirInst | GhostBossInst, target: Character, exVals: number[][]) {
        let rate = 1
        exVals && exVals.forEach(element => {
            if (element[0] == 2) {
                const dis = Vector.distance(self.ghostChar.worldTransform.position, target.worldTransform.position);
                rate = rate * Math.pow((element[1] - dis) / element[1], 2);
                console.log("真实的伤害倍率为" + rate);
            }
        });
        return rate
    }
}
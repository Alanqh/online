import { GameConfig } from "../../../../config/GameConfig";
import { WeaponData } from "./WeaponDef";

WeaponData.getWeaponJson = (...skillIds: number[]) => {
    let jsonList = [];
    skillIds.forEach(e => {
        let skillCfg = GameConfig.GhostAttack.getElement(e);
        if (!skillCfg) {
            return;
        }
        jsonList.push(skillCfg.json);
    })
    console.log("jsonlist" + jsonList)
    return jsonList;
}
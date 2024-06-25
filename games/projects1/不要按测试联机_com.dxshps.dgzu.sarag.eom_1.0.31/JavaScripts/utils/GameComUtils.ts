import { oTrace } from "odin";
import { PlayerManagerExtesion } from "../Modified027Editor/ModifiedPlayer";
import { GeneralManager } from "../Modified027Editor/ModifiedStaticAPI";
import { GameConfig } from "../config/GameConfig";
import { GlobalData } from "../const/GlobalData";

export default class GameComUtils {

    /*2DUI-多语言=================================================================================================================*/
    /**
         *2DUI-多语言
         * @param node 
         * @param textConId 
         * @param param 
         */
    public static setUIText(node: mw.TextBlock | mw.StaleButton, textConId: number | string, ...param: any[]): void {
        let str = "";
        if (typeof textConId === "number") {
            let textEle = GameConfig.Text.getElement(textConId);
            if (!textEle) {
                return
            }
            str = textEle.Text;
            // let lbSize = 0;
            // switch (GlobalData.selectedLanguageIndex) {
            //     case 1:
            //         lbSize = textEle.ChinsesSize;
            //         break;
            //     case 0:
            //         lbSize = textEle.EnglishSize;
            //         break;
            //     case 2:
            //         lbSize = textEle.JanpanseSize;
            //         break;
            //     case 3:
            //         lbSize = textEle.GermanSize;
            //         break;
            // }
            // if (lbSize > 0) {
            //     node.fontSize = (lbSize);
            // }
        }
        if (typeof textConId === "string") {
            let langueConfig = GameConfig.Language.findElement("Name", textConId);
            if (!langueConfig) {
                return;
            }
            // 需要两个表的id一一对应
            // textEle = GameConfig.Text.getElement(langueConfig.ID);
            str = langueConfig.Value;
        }

        if (param && param.length > 0) {
            str = this.format(str, ...param);
        }
        str = str.split("\\n").join("\n");
        if (node instanceof mw.TextBlock) {
            node.text = (str);
        }
        else {
            node.text = (str);
        }
    }
    public static format(str: string, ...param: any[]) {
        if (param) {
            let i = 0;
            param.forEach((p) => {
                str = str.replace("{" + i + "}", param[i]);
                i++;
            });
        }
        return str;
    }
    public static downloadAsset(guid: string) {
        if (AssetUtil.assetLoaded(guid)) return true;
        return AssetUtil.asyncDownloadAsset(guid);
    }

    /**客户端检测是否为本地玩家对象 */
    public static check_isLocalPlayer(obj: mw.GameObject): boolean {
        if (SystemUtil.isServer()) {
            console.error("只允许客户端调用");
            return
        }
        let otherUserID = this.getPlayerUserId(obj);
        if (otherUserID == null) {
            return false;
        }

        let curPlayer = Player.localPlayer;
        if (!curPlayer) {
            return;
        }

        if (otherUserID != curPlayer.userId) {
            return false;
        }

        return true;
    }

    /**获得UserId */
    public static getPlayerUserId(obj: mw.GameObject): string {
        if (obj == null) {
            return null;
        }

        if ((PlayerManagerExtesion.isCharacter(obj)) == false) {
            return null;
        }

        let t_cha = obj as mw.Character;
        if (t_cha.player == null) {
            return null;
        }

        return t_cha.player.userId;
    }

    public static playEffectOnChar(npc: mw.Character, cfgID: number) {
        let effectcfg = GameConfig.Effect.getElement(cfgID);
        if (!effectcfg) {
            oTrace("error effectcfg")
            return
        }

        let id = GeneralManager.rpcPlayEffectOnPlayer(
            effectcfg.EffectID,
            npc,
            effectcfg.EffectPoint,
            effectcfg.EffectTime,
            effectcfg.EffectLocation,
            effectcfg.EffectRotate.toRotation(),
            effectcfg.EffectLarge);


        // if (StringUtil.isEmpty(effectcfg.ColorValue) == false) {
        //     EffectService.getEffectById(id).then((effect) => {
        //         effect.setColor("Color", mw.LinearColor.colorHexToLinearColor(effectcfg.ColorValue));
        //     });
        // }

        return id
    }
    public static playEffectOnPos(pos: mw.Vector, cfgID: number) {
        let effectcfg = GameConfig.Effect.getElement(cfgID);
        if (!effectcfg) {
            oTrace("error effectcfg")
            return
        }

        let id = GeneralManager.rpcPlayEffectAtLocation(
            effectcfg.EffectID,
            pos,
            effectcfg.EffectTime,
            effectcfg.EffectRotate.toRotation(),
            effectcfg.EffectLarge);


        // if (StringUtil.isEmpty(effectcfg.ColorValue) == false) {
        //     EffectService.getEffectById(id).then((effect) => {
        //         effect.setColor("Color", mw.LinearColor.colorHexToLinearColor(effectcfg.ColorValue));
        //     });
        // }

        return id
    }

    /**
    * 播放配置表音效
    * @param soundCfgId 音效表id 
    */
    public static play3DSoundByCfg(soundCfgId: number, target: string | mw.GameObject | mw.Vector) {
        let dataInfo = GameConfig.Sound.getElement(soundCfgId);
        if (dataInfo == null || dataInfo.Spatialization != 1) return;
        let playParam = {
            innerRadius: dataInfo.InnerRadius,
            falloffDistance: dataInfo.FalloffRadius
        }
        return mw.SoundService.play3DSound(dataInfo.GUID, target, dataInfo.Loop, dataInfo.Volume, playParam);
    }

    public static play2DSoundByCfg(soundCfgId: number) {
        let dataInfo = GameConfig.Sound.getElement(soundCfgId);
        if (!dataInfo || dataInfo.Spatialization != 0) {
            return;
        }
        return mw.SoundService.playSound(dataInfo.GUID, dataInfo.Loop, dataInfo.Volume);
    }

    public static playBGMByCfg(soundCfgId: number) {
        let dataInfo = GameConfig.Sound.getElement(soundCfgId);
        if (!dataInfo || dataInfo.Spatialization != 2) {
            return;
        }
        mw.SoundService.playBGM(dataInfo.GUID, dataInfo.Volume);
    }


    public static async waitForOdinInitDone() {
        if (GlobalData.odinInitDone) {
            return true
        }
        return new Promise((resolve, reject) => {
            let timer = setInterval(() => {
                if (GlobalData.odinInitDone) {
                    clearInterval(timer)
                    resolve(true)
                }
            }, 50)
        })
    }

    public static async waitForGlobalCtrlInitDone() {
        if (GlobalData.globalCtrlInitDone) {
            return true
        }
        return new Promise((resolve, reject) => {
            let timer = setInterval(() => {
                if (GlobalData.globalCtrlInitDone) {
                    clearInterval(timer)
                    resolve(true)
                }
            }, 50)
        })
    }
    /**获得UserId */
    public static checkPlayer(obj: mw.GameObject): string {
        if (obj == null) {
            return null;
        }

        if ((PlayerManagerExtesion.isCharacter(obj)) == false) {
            return null;
        }

        let t_cha = obj as mw.Character;
        if (t_cha.player == null) {
            return null;
        }

        return t_cha.player.userId;
    }

    /**
     * 计算点位矩阵
     * @param firstP 首个位置
     * @param forwardDir 前进方向
     * @param maxCount 最大数量
     * @param disX x间距
     * @param disY y间距
     * @param colCountMax 一行最多几个
     */
    public static getPos(firstP: Vector, forwardDir: Vector, maxCount: number, disX: number, disY: number, colCountMax: number): Array<Vector> {
        let posList = new Array<Vector>;
        let index = 0;
        let rightDir = new Vector();
        Vector.cross(Vector.up, forwardDir, rightDir);
        rightDir = rightDir.normalize();

        let backDir = new Vector();
        Vector.multiply(forwardDir, -1, backDir);
        backDir = backDir.normalize();

        let row = Math.floor(maxCount / colCountMax) + 1;
        let back = new Vector();
        for (let i = 0; i < row; i++) {
            Vector.multiply(backDir, disX * i, back);
            let newP = Vector.add(firstP, back);
            for (let j = 0; j < colCountMax; j++) {
                if (index >= maxCount) {
                    break;
                }
                let right = Vector.multiply(rightDir, disY * j);
                let tempPos = Vector.add(newP, right)
                posList.push(tempPos);
                index++;
            }
        }
        return posList;
    }

    public static changeSecond2Minus(curtime: number) {
        let resStr = "0";
        if (curtime < 0) {
            return resStr;
        }
        let time = Math.round(curtime);
        let minus = Math.floor(time / 60);
        let seconds = time % 60;
        let secondstr = seconds.toString();
        if (seconds < 10) {
            secondstr = "0" + seconds.toString();
        }
        resStr = minus.toString() + ":" + secondstr;
        return resStr;
    }

    //  秒数转化为时分秒
    public static changeSecond2Hour(curtime: number) {
        let resStr = "00:00:00";
        if (curtime < 0) {
            return resStr;
        }
        let time = Math.round(curtime);
        var h = Math.floor(time / 3600);
        time -= h * 3600;
        var m = Math.floor(time / 60);
        time -= m * 60;
        var s = time;
        let hStr = h.toString();
        if (h < 10) {
            hStr = "0" + h.toString();
        }
        let mStr = m.toString();
        if (m < 10) {
            mStr = "0" + h.toString();
        }
        let sStr = s.toString();
        if (s < 10) {
            sStr = "0" + s.toString();
        }
        resStr = hStr + ":" + mStr + ":" + sStr;
        return resStr;
    }

    public static async changeCharacterToAnimal(character: mw.Character, animalId: number | string) {
        let petInfo = GameConfig.Pet.getElement(animalId);
        if (!AssetUtil.assetLoaded(petInfo.guid)) {
            await AssetUtil.asyncDownloadAsset(petInfo.guid);
        }
        character.clearDescription();
        await character.asyncReady();
        character.description.base.wholeBody = petInfo.guid;
        character.collisionShape = petInfo.collisionType;
        character.collisionExtent = petInfo.collisionScale.clone();
        character.worldTransform.scale = petInfo.scale.clone();
    }

    public static getRandomPoint(centerPoint: Vector, size: Vector2) {
        let x = MathUtil.randomInt(-size.x / 2, size.x / 2);
        let y = MathUtil.randomInt(-size.y / 2, size.y / 2);
        return Vector.add(centerPoint, new Vector(x, y, 0));
    }

    public static async playLoseAni(char: mw.Character, onBegin: () => void, onEnd: () => void) {
        char.switchToFlying();
        await TimeUtil.delaySecond(0.1);
        let startPos = char.worldTransform.position.clone();
        let upEndPos1 = startPos.clone();
        upEndPos1.z += GlobalData.loseUpHeight;

        let downEndPos = upEndPos1.clone();
        downEndPos.z -= GlobalData.loseDownHeight;

        let upEndPos2 = downEndPos.clone();
        upEndPos2.z += GlobalData.loseUpHeight2;

        let upTween2 = new Tween<Vector>(downEndPos)
            .to(upEndPos2, GlobalData.loseUpTime2 * 1000)
            .onUpdate((v) => {
                char.worldTransform.position = v;
            })
            .onComplete(() => {
                if (onEnd) {
                    onEnd.call(this)
                }
            });

        let downTween = new Tween<Vector>(upEndPos1)
            .to(downEndPos, GlobalData.loseDownTime * 1000)
            .onUpdate((v) => {
                char.worldTransform.position = v;
            })
            .chain(upTween2);

        let upTween1 = new Tween<Vector>(startPos)
            .to(upEndPos1, GlobalData.loseUpTime * 1000)
            .onUpdate((v) => {
                char.worldTransform.position = v;
            })
            .chain(downTween);

        upTween1.start();
        if (onBegin) {
            onBegin.call(this)
        }
    }

    /**
     * 重置一个Vector
     * @param v 
     * @returns 
     */
    public static resetVector(v: mw.Vector) {
        if (v == null) return
        v.x = 0;
        v.y = 0;
        v.z = 0;
    }
}
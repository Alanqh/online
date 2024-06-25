/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-03-10 19:01:23
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-07-14 17:29:01
 * @FilePath     : \stumbleguys\JavaScripts\utils\Tools.ts
 * @Description  : 修改描述
 */
MathUtil.randomFloat = function (min: number, max: number) {
    return Math.random() * (max - min) + min;
}
MathUtil.randomInt = function (min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}
export class Tools {
    /**获取ui绝对坐标 */
    public static getUIAbsolutePos(widget: mw.Widget) {
        let outPixelPosition = new mw.Vector2();
        let outViewportPosition = new mw.Vector2();
        mw.localToViewport(widget.tickSpaceGeometry, mw.Vector2.zero, outPixelPosition, outViewportPosition);
        return outViewportPosition;
    }
    /**设置ui的显隐 */
    public static setUIVisible(node: mw.Widget, visible: boolean) {
        let ev = visible ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        node.visibility = ev;
    }
    /**
     * 异步查找节点
     * @param guid 
     * @returns 
     */
    public static asyncFindGO(guid: string): Promise<mw.GameObject> {
        return new Promise((res, rej) => {
            let finder = setInterval(() => {
                let out = GameObject.findGameObjectById(guid)
                if (out) {
                    res(out);
                    clearInterval(finder);
                }
            }, 200);
        })
    }
    public static getLanguage(): number {
        let language = mw.LocaleUtil.getDefaultLocale().toString().toLowerCase();
        if (!!language.match("zh")) {
            return 0;
        }
        if (!!language.match("en")) {
            return 1;
        }
        return 1;
    }

    /**
    * 字符串过长，后面加...    （utf-8）
    * @param str 原字符串
    * @param byte 最大字节数
    * @returns 
    */
    public static getUITextAfterOmission(str: string, byte: number): string {
        let count = 0;
        let ret = ""
        for (let i = 0; i < str.length; i++) {
            const codePoint = str.codePointAt(i);
            ret += str[i];
            if (codePoint === null) {
                continue;
            }
            if (codePoint < 0x80) {
                count += 1;
            } else if (codePoint < 0x800) {
                count += 2;
            } else if (codePoint < 0x10000) {
                count += 3;
            } else if (codePoint < 0x110000) {
                count += 4;
            }
            if (count >= byte) {
                return ret + "...";
            }
            if (codePoint >= 0x10000) {
                i++;
            }
        }

        return str;
    }
    /**
     * 获取character
     * @param player 
     * @returns 
     */
    public static getCharacter(player: mw.Player) {
        return new Promise<Character>((res) => {
            let maxTime = 20;
            let timer = setInterval(() => {
                if (player && player.character) {
                    res(player.character);
                    clearInterval(timer);
                }
                maxTime--;
                if (maxTime <= 0) {
                    res(null);
                    clearInterval(timer);
                }
            }, 800);
        });
    }
    /**
     * 获取本地Player保证有Character
     */
    public static getLocalPlayer() {
        return new Promise<Player>((res) => {
            let timer = setInterval(() => {
                if (Player.localPlayer && Player.localPlayer.character) {
                    res(Player.localPlayer);
                    clearInterval(timer);
                }
            }, 800);
        });
    }
    /**
     * 获取player,保证character
     * @param playerid 
     * @returns 
     */
    public static getPlayer(playerid: number) {
        return new Promise<Player>((res) => {
            let timer = setInterval(() => {
                const player = Player.getPlayer(playerid);
                if (player && player.character) {
                    res(player);
                    clearInterval(timer);
                }
            }, 800);
        });
    }
}
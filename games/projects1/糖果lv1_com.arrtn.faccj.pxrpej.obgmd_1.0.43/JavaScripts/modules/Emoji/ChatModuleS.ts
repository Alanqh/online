/** 
 * @Author       : zhenhaung.luo  zhenhuang.luo@appshahe.com
 * @Date         : 2023-03-02 13:40:38
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-11-01 18:28:43
 * @FilePath     : \stumbleguys_new\JavaScripts\modules\Emoji\ChatModuleS.ts
 * @Descripttion : 
 */

import { ChatModuleC } from "./ChatModuleC";

export class ChatModuleS extends ModuleS<ChatModuleC, null>{
	public net_playEmoji(player: mw.Player, guid: string) {
		this.getAllClient().net_playEmoji_Client(player, guid);
	}

	public net_playChat(player: mw.Player, guid: string) {
		this.getAllClient().net_playChat_Client(player, guid);
	}
}
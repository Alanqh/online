/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-02-17 09:10:25
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-02-20 09:41:21
 * @FilePath     : \stumbleguys\JavaScripts\ProcessModule\UI\GameIcon.ts
 * @Description  : 游戏小图
 */


import LevelPics_Generate from "../../../ui-generate/LevelPic/LevelPics_generate";

export default class GameIcon extends LevelPics_Generate {

	/**
	 * 设置图片guid
	 * @param icon  图片guid
	 */
	public setIcon(icon: string): void {
		this.mIconPic.imageGuid = icon;
	}

}

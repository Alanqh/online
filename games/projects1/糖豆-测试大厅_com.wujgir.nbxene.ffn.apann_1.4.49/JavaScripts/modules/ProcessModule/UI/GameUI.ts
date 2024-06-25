/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-02-13 14:53:41
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-11-21 17:14:33
 * @FilePath     : \stumbleguys_new\JavaScripts\modules\ProcessModule\UI\GameUI.ts
 * @Description  : 小游戏内主界面
 */


import { CLAI } from "../../../AI/client/ClientAIService";
import { GameConfig } from "../../../config/GameConfig";
import { MGSCore } from "../../../mgs/MGSCore";
import { TeamManager } from "../../../Prefabs/GameStater/Script/TeamManager";
import { LanUtils } from "../../../tool/LanguageUtil";
import { Singleton } from "../../../tool/Singleton";
import GameUI_Generate from "../../../ui-generate/GameUI_generate";
import ProcessModuleC from "../ProcessModuleC";
const IMG_ASSET: string[] = ["240164", "240165", "240228", "240231"];

export default class GameUI extends GameUI_Generate {
	private passAICount: number = 0;
	private passPlayerCount: number = 0;
	private playerId: number = 0;
	private remaindCount: number = -1;
	protected onStart() {
		if (GameConfig.GameInfo.getAllElement()[0].type == 3) {
			this.txtScore.text = 0 + "/" + 2;
			this.cvsScore.visibility = mw.SlateVisibility.Visible;
		} else {
			this.cvsScore.visibility = mw.SlateVisibility.Hidden;
		}
		Event.addLocalListener("CharacterSelf_Fresh_Score", (allScore, maxScore) => {
			this.txtScore.text = allScore + "/" + maxScore;
		});

		Event.addLocalListener("GameState.UpdatePlayerNum", (playerNum: number) => {
			this.passPlayerCount = playerNum;
			this.updatePlayerNum();
		});

		Event.addLocalListener("GameState.CountDown.Client", () => {
			this.showCountDown();
		})

		Event.addLocalListener("GameState.AddAIWinNum", () => {
			this.passAICount++;
			this.updatePlayerNum();
		});

		Event.addServerListener("Team.Eliminate.Count", (remaindCount: number, remaindAICount: number, eliminateGuid: string) => {
			CLAI.keepAI(remaindAICount);
			this.remaindCount = remaindCount;
			this.updatePlayerNum();
			GameObject.asyncFindGameObjectById(eliminateGuid).then(character => {
				if (character) {
					character.setVisibility(PropertyStatus.Off);
				}
			})
		});
		Event.addLocalListener("UpdateGamePlayerCount", () => {
			this.remaindCount = -1;
			this.updatePlayerNum();
		});
		Event.addLocalListener("GameState.ResGamingCharacter", (data: any) => {
			if (data.eliminateNum) {
				// this.eliminateNum = data.eliminateNum;
				this.updatePlayerNum();
			}
		});
		Event.addLocalListener("GameState.Gameing.Client", () => {
			// this.hideTheme(); 适配新版本UI
			this.hideCountDown();
		});
		this.mVersion.visibility = mw.SlateVisibility.Hidden;
		Event.addLocalListener("ShowVersion", () => {
			this.mVersion.visibility = mw.SlateVisibility.Visible;
			this.mVersion.text = GameConfig.Language.UI_LOBBY_191.Value + "：" + RouteService.getGameVersion();
		})

		AssetUtil.asyncDownloadAsset("37822")
		AssetUtil.asyncDownloadAsset("146788")
		AssetUtil.asyncDownloadAsset(IMG_ASSET[0]);
		AssetUtil.asyncDownloadAsset(IMG_ASSET[1]);
		AssetUtil.asyncDownloadAsset(IMG_ASSET[2]);
		AssetUtil.asyncDownloadAsset(IMG_ASSET[3]);
		this.countDownImg.renderScale = Vector2.zero
	}

	onShow() {
		this.showLoading();
		this.showTheme();

		const maxPlayer = GameConfig.GameInfo.getElement(1);
		this.playerNumText.text = `${0}/${maxPlayer.playerNum}`;
	}

	/**
	 * 符合人数
	 * @param num 当前人数
	 */
	private async updatePlayerNum(): Promise<void> {
		const cfg = GameConfig.GameInfo.getElement(1);
		const gameData = await ModuleService.getModule(ProcessModuleC).getGameInfo();
		let round = 0;
		if (gameData != null) round = gameData.round;
		const gameType = cfg.type;
		let maxPlayer = cfg.playerNum;
		const num = Math.min(maxPlayer, this.passAICount + this.passPlayerCount);
		// 是竞速关卡还是淘汰关卡
		if (gameType == 1 || gameType == 3) {
			if (round == 2) {
				this.playerNumText.text = LanUtils.getLanguage("UI_LAN_238").replace("{}", num.toFixed(0)).replace("{}", "1");
				Event.dispatchToLocal("UPDATE_WORLD_UI", num); //运算一样先放在一起
			} else {
				this.playerNumText.text = LanUtils.getLanguage("UI_LAN_239").replace("{}", num.toFixed(0)).replace("{}", maxPlayer.toString())//
				Event.dispatchToLocal("UPDATE_WORLD_UI", num); //运算一样先放在一起
			}
		} else {
			const team = TeamManager.teams ? TeamManager.teams[0] : null;
			maxPlayer = team ? team.clientPlayerCount : 24;
			maxPlayer = maxPlayer + CLAI.getAllRobots().length;
			if (this.remaindCount == -1) this.remaindCount = maxPlayer;
			this.playerNumText.text = LanUtils.getLanguage("UI_LAN_240").replace("{}", Math.min(maxPlayer - this.remaindCount, maxPlayer - 1).toString()).replace("{}", (maxPlayer - 1).toString());
			Event.dispatchToLocal("UPDATE_WORLD_UI", maxPlayer - num); //运算一样先放在一起
		}

	}

	private showLoading(): void {
		// this.loadPic.visibility = mw.SlateVisibility.HitTestInvisible;
		// mw.UIService.show(LevelChooseUI, 1);
	}

	private scaleVec: mw.Vector2 = new mw.Vector2(0, 0);
	private _scaleVec: number = 5;
	private async showCountDown(): Promise<void> {
		this.countDownImg.visibility = mw.SlateVisibility.Visible;
		this.countDownImg.renderScale = Vector2.zero

		let num = GameConfig.GameInfo.getElement(1).countDownTime;
		let countdownPlayed = false;
		if (num === 3) {
			Event.dispatchToLocal("PLAY_BY_CFG", 4);
			countdownPlayed = true;
		}

		let tween = new mw.Tween(this).to({ _scaleVec: 1 }, 300).onUpdate((v) => {
			this.scaleVec.set(this._scaleVec, this._scaleVec);
			this.countDownImg.renderScale = this.scaleVec;
		});

		setInterval(() => {
			if (num == 0) {
				this.countDownImg.imageGuid = IMG_ASSET[0];
			} else {
				//根据不同num用不同的图
				switch (num) {
					case 1:
						this.countDownImg.imageGuid = IMG_ASSET[3];
						break;
					case 2:
						this.countDownImg.imageGuid = IMG_ASSET[2];
						break;
					case 3:
						this.countDownImg.imageGuid = IMG_ASSET[1];
						break;
					default:
						break;
				}
			}
			tween.start();
			if (num == 3 && !countdownPlayed) {
				/**倒计时音效 */
				Event.dispatchToLocal("PLAY_BY_CFG", 4);
				countdownPlayed = true;
			}
			num = num > 0 ? num - 1 : num;
			// console.log(num, "countdown");
		}, 800)

		// 获取 round
		const gameData = await ModuleService.getModule(ProcessModuleC).getGameInfo();
		const round = gameData.round;
		if (round == 1) {
			Singleton.getIns(MGSCore).coreStep(7);
		} else if (round == 2) {
			Singleton.getIns(MGSCore).coreStep(12);
		}

	}

	private hideCountDown(): void {
		Event.dispatchToLocal("GamePlay.Client");
		setTimeout(() => {
			this.countDownImg.visibility = mw.SlateVisibility.Hidden;
		}, 1000);
	}

	private showTheme(): void {
		const theme = GameConfig.GameInfo.getElement(1).name;
		this.themeText.text = LanUtils.getLanguage(theme);
	}

	private hideTheme(): void {
		this.themeCanvas.visibility = mw.SlateVisibility.Hidden;
	}
}

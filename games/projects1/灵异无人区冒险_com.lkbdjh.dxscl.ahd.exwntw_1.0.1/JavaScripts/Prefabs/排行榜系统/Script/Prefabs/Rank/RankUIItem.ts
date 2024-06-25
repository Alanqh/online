/*
 * @Description: Description
 */

import UIRankItem_Generate from "../../../../../ui-generate/Prefabs/排行榜系统/UI/UIRankItem_generate";
import { RankPlayerInfo } from "./RankSystem";

export default class RankUIItem extends UIRankItem_Generate {

    onStart() {

    }

    onShow(info: RankPlayerInfo, rankNumber: number) {

        this.nameText.text = info.name;
        this.gradeText.text = info.score.toString();
        this.rankText.text = (rankNumber + 1).toString();

    }

}
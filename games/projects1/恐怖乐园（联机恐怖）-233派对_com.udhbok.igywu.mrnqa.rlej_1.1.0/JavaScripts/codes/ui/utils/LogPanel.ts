import LogItem_Generate from "../../../ui-generate/ShareUI/utils/LogItem_generate";
import LogPanel_Generate from "../../../ui-generate/ShareUI/utils/LogPanel_generate";
import GameStart from "../../GameStart";
import { GridContainer } from "../../utils/UIPool";


class Log {
    public constructor() {
        Event.addServerListener("evt_addServerLog", (str: string) => { UIService.getUI(LogPanel).addTxt(str, true) });
    }

    public show() {
        UIService.show(LogPanel);
    }

    public addServerLog(str: string) {
        Event.dispatchToAllClient("evt_addServerLog", str);
    }

    public addClientLog(str: string) {
        UIService.getUI(LogPanel).addTxt(str, false)
    }
}

export const LogService = new Log();

class LogPanel extends LogPanel_Generate {

    private logContainer: GridContainer<LogItem>;

    onStart() {
        this.logContainer = new GridContainer(this.canvas, LogItem);
        this.btn.onClicked.add(() => { UIService.hideUI(this) });
        this.btn_1.onClicked.add(() => { this.logContainer.clear(); });
    }

    addTxt(str: string, isServer: boolean) {
        if (!GameStart.UseGM) { return; }
        const node = this.logContainer.addNode();
        node.setText(str, isServer);
    }
}

class LogItem extends LogItem_Generate {

    onStart() {
        this.text.isRichText = true;
    }

    setText(str: string, isServer: boolean) {
        str = isServer ? `<color=#FF4500>server</color><color=#ABFFFF>${str}</color>` : `<color=#FFFB00>client</color><color=#AFFFAB>${str}</color>`;
        this.text.text = this.text.text + "\n" + str;
    }
}
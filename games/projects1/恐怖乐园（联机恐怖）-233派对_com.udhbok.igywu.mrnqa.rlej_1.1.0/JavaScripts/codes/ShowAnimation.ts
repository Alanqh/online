import { PlayerManagerExtension, } from './Modified027Editor/ModifiedPlayer';
import { WaitLoop } from './utils/AsyncTool';

@Component
export default class ShowAnimation extends mw.Script {
    @mw.Property({ displayName: "常规动画" })
    public dance: string = "";

    private _danceAni: mw.Animation;

    protected async onStart() {
        // if (SystemUtil.isServer()) {
        //     return;
        // }
        //await ModuleService.ready();

        WaitLoop.loop(() => { return this.gameObject }).then(async () => {

            let npc = this.gameObject as mw.Character;
            await AssetUtil.asyncDownloadAsset(this.dance);
            this._danceAni = PlayerManagerExtension.loadAnimationExtesion(npc, this.dance, false);
            this._danceAni.loop = 0;
            this._danceAni.play();
            npc.displayName = "";
        })
    }
}


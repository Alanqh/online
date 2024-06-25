/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-07 15:38:37
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-02-07 17:04:18
 * @FilePath     : \TrackCamera\JavaScripts\runtime\Data.ts
 * @Description  : 修改描述
 */
export class Data {

    constructor(public time: number, public position?: number[], public rotation?: number[]) {

    }

    /**序列化 */
    public serialize(position: mw.Vector, rotation: mw.Rotation) {
        this.position = [parseFloat(position.x.toFixed(2)), parseFloat(position.y.toFixed(2)), parseFloat(position.z.toFixed(2))];
        this.rotation = [parseFloat(rotation.x.toFixed(2)), parseFloat(rotation.y.toFixed(2)), parseFloat(rotation.z.toFixed(2))];
        return this;
    }
    clone(data: Data) {
        this.position = data.position;
        this.rotation = data.rotation;
    }

    /**Data更改 */
    public onChanged: Action1<Data> = new Action1();
}
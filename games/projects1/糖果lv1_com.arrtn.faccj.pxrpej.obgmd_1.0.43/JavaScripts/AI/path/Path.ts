import { RoadNode } from "./RoadNode";

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-01-31 17:36:02
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-18 11:21:15
 * @FilePath     : \stumbleguys\JavaScripts\AI\path\Path.ts
 * @Description  : 修改描述
 */
export class Path {

    private _result: Vector[];
    constructor(private roads: RoadNode[]) {
        this._result = [];
    }


    /**
     * 计算一条路径
     * @param start 
     * @param end 
     */
    public compute(start: Vector, end: Vector) {
        this._result.length = 0;
        let startNode = this.findCloseNode(start);
        let endNode = this.findCloseNode(end);
        if (!this.roads[startNode]) return;
        const startId = this.roads[startNode].id;
        const endId = this.roads[endNode].id;
        /**当前节点的标志 */
        let flag = this.roads[startNode].flag;
        if (startId == 1) {
            //加入初始点
            const roads = this.roads.filter(i => (i.id == startId && (!flag || flag == i.flag)));
            this._result.push(roads[MathUtil.randomInt(0, roads.length)].location);
        } else {
            //加入起点
            this._result.push(this.roads[startNode].location);
        }
        for (let id = startId + 1; id <= endId - 1; id++) {
            let road: RoadNode = null;
            const roads = this.roads.filter(i => (i.id == id && (!flag || flag == i.flag)));
            if (roads.length == 0) {
                //没用符合标志的路，随机一条
                const nextRoads = this.roads.filter(i => i.id == id);
                if (nextRoads.length > 0) {
                    road = nextRoads[MathUtil.randomInt(0, nextRoads.length)];
                }
            } else {
                road = roads[MathUtil.randomInt(0, roads.length)];
            }
            if (road) {
                flag = road.flag;
                this._result.push(road.location);
            }
        }
        this._result.push(this.roads[endNode].location);
        this._result.push(end);
    }
    public computeById(point: string, dist: mw.Vector) {
        let road = this.roads.find(i => point == `${i.id}-${i.flag}`);
        if (!road) {
            const roads = this.roads.filter(i => i.id.toString() == point);
            if (roads.length > 0) {
                road = roads[MathUtil.randomInt(0, roads.length)];
            }
        }
        if (road) {
            this.compute(road.location, dist);
        }
    }
    /**
     * 获取路径，如果数据返回空数组表示无路可走
     */
    public get waypoints() {
        return this._result.concat();
    }

    /**寻找最近的可以通到的点 */
    private findCloseNode(location: Vector) {
        let min = Infinity;
        let index = 0;
        for (let i = 0; i < this.roads.length; i++) {
            const distance = mw.Vector.squaredDistance(this.roads[i].location, location);
            if (min > distance) {
                min = distance;
                index = i;
            }
        }
        return index;
    }
}
/** 
 * @Author       : lei.zhao
 * @Date         : 2023-01-31 17:04:00
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-06 18:47:12
 * @FilePath     : \stumbleguys\JavaScripts\AI\path\PathService.ts
 * @Description  : 修改描述
 */
import { Path } from "./Path";
import { RoadNode } from "./RoadNode";

class PathServicePackage {
    /**
     *  寻路父节点
     */
    private roadMapGuid: string;

    private roads: RoadNode[];
    private _isLoaded: boolean;
    constructor() {
        this.roads = [];
    }

    /**
     * 异步获取路径点
     * @param start 开始节点
     * @param end 结束节点
     */
    public async createPath() {
        if (this._isLoaded) {
            return new Path(this.roads);
        }
        return new Promise<Path>(res => {
            const inter = setInterval(() => {
                if (this._isLoaded) {
                    clearInterval(inter);
                    res(new Path(this.roads));
                }
            }, 100);
        });

    }

    /**
     * 初始化
     * @param roadMapGuid 
     */
    public async init(roadCfg: string, roadMapGuid: string) {
        this.roads.length = 0;
        this.roadMapGuid = roadMapGuid;
        if (roadCfg) {
            const roads = roadCfg.split(",").map(i => Number(i));
            for (let i = 0; i < roads.length; i += 5) {
                this.roads.push(new RoadNode(
                    roads[i + 0],
                    new mw.Vector(roads[i + 2], roads[i + 3], roads[i + 4]),
                    roads[i + 1])
                );
            }
        } else if (roadMapGuid) {
            await this.parseRoadMap();
        }
        this._isLoaded = true;
    }

    /**获取路径点，并解析为路径点对象 */
    public async parseRoadMap() {
        this.roads.length = 0;
        const roadMapRoot = await GameObject.asyncFindGameObjectById(this.roadMapGuid);
        await roadMapRoot.asyncReady();
        const roads = roadMapRoot.getChildren();
        for (const road of roads) {
            this.insertRoadNode(road);
        }
        this.roads.sort((a, b) => { return a.id - b.id });
    }
    public export() {
        const result = [];
        this.roads.forEach(rode => {
            result.push([rode.id, rode.flag, rode.location.x.toFixed(2), rode.location.y.toFixed(2), rode.location.z.toFixed(2)]);
        });
        return result;
    }
    /**
     * 添加一个路点
     * @param road 
     */
    private insertRoadNode(road: mw.GameObject) {
        try {
            const flag = road.name.split("-");
            const id = parseInt(flag[0]);
            this.roads.push(new RoadNode(id, road.worldTransform.position, flag.length == 1 ? 0 : parseInt(flag[1])));
        } catch (error) {
            console.log(error.stack);
        }

    }

}

export const PathService = new PathServicePackage();

import { Parser } from "../../CameraRuntime/Script/Paser";
import { RenderNode } from "./render/RenderNode";

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-07 19:01:43
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-03-09 10:35:57
 * @FilePath     : \色块派对\JavaScripts\Resolver.ts
 * @Description  : 修改描述
 */
//0.11,-832.78,-5623.80,288.82,0.00,-13.96,-35.75,2.7,-382.33,-5010.35,505.75,0.00,-25.83,-106.13,8.63,307.54,-5078.14,718.75,0.00,-30.44,-145.79,16.39,913.89,-5674.06,1031.16,0.00,-36.45,178.74,21.3,1027.65,-6940.10,1595.30,0.00,-38.96,142.29,27,-125.60,-7259.50,1783.89,0.00,20.81,145.92,33.08,-1406.88,-7608.97,2420.23,0.00,54.04,127.35,38.48,-2518.95,-8449.81,1692.79,0.00,41.06,92.86,43.05,-3033.33,-9382.53,1399.28,0.00,-5.87,65.21,47.62,-2770.02,-6927.73,1237.21,0.00,-8.38,60.18
export namespace Resolver {
    /**将节点转换成字符串 */
    export function serialize(renderNodes: RenderNode[]) {
        const result = [];
        for (let i = 0; i < renderNodes.length; i++) {
            const data = renderNodes[i].data;
            result.push(data.time, ...data.position.map(i => i.toFixed(2)), ...data.rotation.map(i => i.toFixed(2)));
        }
        return result.join(",");
    }

    /**将字符串转换成节点 */
    export function unserialize(data: string) {
        const datas = Parser.parse(data);
        const result: RenderNode[] = [];
        for (const node of datas) {
            result.push(new RenderNode(node));

        }
        return result;
    }
}
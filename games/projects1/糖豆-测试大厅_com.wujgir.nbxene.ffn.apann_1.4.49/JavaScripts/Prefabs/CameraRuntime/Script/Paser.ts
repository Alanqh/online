import { Data } from "./Data";

export namespace Parser {

    /**解析运行字符串 */
    export function parse(data: string) {
        const list = data.split(",");
        const len = list.length / 7;
        const result: Data[] = [];
        for (let i = 0; i < len; i++) {
            let index = i * 7;
            const nodeData = new Data(
                parseFloat(list[index++]),//time
                [list[index++], list[index++], list[index++]].map(i => parseFloat(i)),//position
                [list[index++], list[index++], list[index++]].map(i => parseFloat(i))//rotation
            );
            result.push(nodeData);
        }
        return result;
    }
}
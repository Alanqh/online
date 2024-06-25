import { Path } from "../path/Path";

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-05-30 13:06:54
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-05-30 13:06:54
 * @FilePath     : \stumbleguys\JavaScripts\AI\client\IAIService.ts
 * @Description  : 修改描述
 */
export interface IAIService {
    path: Path;
    dist: mw.Vector;
}
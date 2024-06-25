/*
 * @Author: zhenhaung.luo  zhenhuang.luo@appshahe.com
 * @Date: 2023-02-14 17:37:02
 * @LastEditors: zhenhuang.luo  zhenhuang.luo@appshahe.com
 * @LastEditTime: 2023-02-21 13:50:20
 * @FilePath: \stumbleguysc:\Users\AA\Downloads\Singleton.ts
 * @Descripttion: 单例管理中心
 */
export class Singleton {
    private static _ints: {}={};
    static getIns<T>(cls: { new(): T }): T {
        let ins = this._ints[cls.name];
        if (!ins) {
            ins = new cls();
            this._ints[cls.name] = ins;
        }
        return ins;
    }
}
// class INte {
//     uui() { }
// }
// Singleton.getIns(INte).uui();
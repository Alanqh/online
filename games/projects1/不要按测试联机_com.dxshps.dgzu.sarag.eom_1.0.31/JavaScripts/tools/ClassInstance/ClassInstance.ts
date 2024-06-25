/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-11-07 13:52:57
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-11-21 18:04:39
 * @FilePath     : \petparty\JavaScripts\tools\ClassInstance\ClassInstance.ts
 * @Description  : 修改描述
 */
//aits-ignore
/*
 * @Author: YuKun.Gao
 * @Date: 2023-08-08 17:12:59
 * @LastEditors: YuKun.Gao
 * @LastEditTime: 2023-08-10 16:53:51
 * @Description: file content
 * @FilePath: \Ecs\JavaScripts\PerformanceUtils\ClassInstance\ClassInstance.ts
 */

export class ClassInstance {

    private static clazzs: Map<string, []> = new Map<string, []>();
    private static waitDelete: Map<string, []> = new Map<string, []>();

    public static gc() {

        ClassInstance.waitDelete.forEach((v, k) => {

            let pool: any[];
            if (!ClassInstance.clazzs.has(k)) {
                ClassInstance.clazzs.set(k, []);
            }
            pool = ClassInstance.clazzs.get(k);

            v.forEach(element => {
                pool.push(element);
            });

            v.length = 0;

        });

    }

    public static newc<T>(clazz: any): T {

        let name = clazz.name;
        let pool: any[];
        if (!this.clazzs.has(name)) {
            this.clazzs.set(name, []);
        }
        pool = this.clazzs.get(name);

        if (pool.length > 0) {
            return pool.shift();
        }

        var res = new clazz();
        return res as T;

    }

    public static delete(clazzIns: any) {

        let name = clazzIns.constructor.name;

        let pool: any[];
        if (!this.waitDelete.has(name)) {
            this.waitDelete.set(name, []);
        }
        pool = this.waitDelete.get(name);

        pool.push(clazzIns);

    }

    /**用完了记得回收 */
    public static getVectorClone(vector: Vector){
        let temp = ClassInstance.newc<Vector>(Vector);
        Vector.copy(vector, temp);
        this.delete(temp);
        return temp;
    }

    public static getRotateClone(rotation: Rotation){
        let temp = ClassInstance.newc<Rotation>(Rotation);
        Rotation.copy(rotation, temp);
        this.delete(temp);
        return temp;
    }

}
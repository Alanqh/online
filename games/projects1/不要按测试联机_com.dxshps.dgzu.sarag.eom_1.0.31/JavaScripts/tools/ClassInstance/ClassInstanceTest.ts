// //aits-ignore
// /*
//  * @Author: YuKun.Gao
//  * @Date: 2023-08-08 17:12:59
//  * @LastEditors: YuKun.Gao
//  * @LastEditTime: 2023-08-09 18:24:55
//  * @Description: file content
//  * @FilePath: \Ecs\JavaScripts\PerformanceUtils\Class\ClassInstanceTest.ts
//  */

// import { UseTimeHook } from "../UseTimeHook";
// import { ClassInstance } from "./ClassInstance";


// @Component
// export default class ClassInstanceTest extends mw.Script {

//     protected onStart() {

//         this.useUpdate = true;

//     }

//     private test() {
//         for (let i = 0; i < 10000; i++) {
//             let vec = ClassInstance.newc<Vector>(Vector);
//             vec.x = 1;
//             ClassInstance.delete(vec);
//         }

//     }

//     public onUpdate(dt: number): void {
//         UseTimeHook.run(this.test);
//     }


// }
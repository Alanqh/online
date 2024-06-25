// //aits-ignore
// import { ClassInstance } from "./ClassInstance/ClassInstance";

// class PerTimerTask {

//     public id: number;
//     public callback: Function;
//     public delay: number;
//     public args: any[];
//     public time: number;
//     public isRepeat: boolean = false;

//     public init(id: number, callback: Function, delay: number, isRepeat: boolean, args: any[]) {
//         this.id = id;
//         this.callback = callback;
//         this.delay = delay;
//         this.args = args;
//         this.time = PerTimer.instance.timeUnix + delay;
//         this.isRepeat = isRepeat;
//     }

//     public execute() {
//         this.callback(...this.args);
//     }


// }

// export class PerTimer {

//     public static instance: PerTimer = new PerTimer();

//     public static setTimeout(callback: Function, delay: number, ...args: any[]): number {
//         return PerTimer.instance.setTimeout(callback, delay, ...args);
//     }

//     public static setInterval(callback: Function, delay: number, ...args: any[]): number {
//         return PerTimer.instance.setInterval(callback, delay, ...args);
//     }

//     public static clearTimer(id: number) {
//         PerTimer.instance.clearTaskById(id);
//     }

//     public static now(): number {
//         return PerTimer.instance.timeUnix;
//     }

//     public static curFrameCount(): number {
//         return PerTimer.instance.frameCount;
//     }


//     public timeUnix: number = 0;

//     public frameCount: number = 0;

//     public tasks: PerTimerTask[] = [];

//     private genId: number = 1;

//     private setTimeout(callback: Function, delay: number, ...args: any[]): number {
//         let timer = ClassInstance.newc<PerTimerTask>(PerTimerTask);
//         timer.init(this.genId++, callback, delay, false, args);
//         this.tasks.push(timer);
//         return timer.id;
//     }

//     private setInterval(callback: Function, delay: number, ...args: any[]): number {
//         let timer = ClassInstance.newc<PerTimerTask>(PerTimerTask);
//         timer.init(this.genId++, callback, delay, true, args);
//         this.tasks.push(timer);
//         return timer.id;
//     }

//     private clearTaskById(id: number) {
//         for (let i = 0; i < this.tasks.length; ++i) {
//             if (this.tasks[i].id == id) {
//                 var info = this.tasks[i];
//                 this.tasks.splice(i, 1);
//                 ClassInstance.delete(info);
//                 return;
//             }
//         }
//     }

//     public handle() {
//         let now = this.timeUnix;
//         for (let i = 0; i < this.tasks.length; ++i) {
//             let task = this.tasks[i];
//             if (task.time <= now) {
//                 try {
//                     task.execute();
//                 } catch (ex) {
//                     console.error(ex);
//                     console.error(ex.stack);
//                 }
//                 if (task.isRepeat) {
//                     task.time += task.delay;
//                 } else {
//                     ClassInstance.delete(task);
//                     this.tasks.splice(i, 1);
//                     i--;
//                 }
//             }
//         }
//     }

//     public setTimeUnix(timeUnix: number) {

//         for (let i = 0; i < this.tasks.length; ++i) {
//             this.tasks[i].time = timeUnix + this.tasks[i].delay;
//         }

//         this.timeUnix = timeUnix;
//     }

//     public updateDt(dt: number) {


//         this.frameCount++;
//         if (this.timeUnix == 0) return;


//         this.timeUnix += dt * 1000;

//         this.handle();
//     }

// }

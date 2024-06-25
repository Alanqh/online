export class util {
    /**高效的从一个数组中获取一个随机元素 */
    static getRandomElement(array: any[]) {
        return array[Math.floor(Math.random() * array.length)];
    }
}
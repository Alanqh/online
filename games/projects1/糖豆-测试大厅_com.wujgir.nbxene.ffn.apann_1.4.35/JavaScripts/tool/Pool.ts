import { SpawnManager,SpawnInfo, } from '../Modified027Editor/ModifiedSpawn';
export namespace Pool {
    const storeage: Map<string, _Pool<unknown>> = new Map();
    const asyncStoreage: Map<string, _AsyncPool<unknown>> = new Map();
    const objectStoreage: Map<string, _ObjectPool<mw.GameObject>> = new Map();
    /**
     * 注册/获取一个对象池
     * @param creater 
     * @returns 
     */
    export function getPool<T>(ctor: { new(...params): T }, creater?: (...params) => T, reset?: (obj: T) => void): IPool<T> {
        const name = ctor.name;
        let pool = storeage.get(name);
        if (!pool) {
            pool = new _Pool(ctor, creater, reset);
            storeage.set(name, pool);
        }
        return pool as _Pool<T>;
    }
    /**
     * 注册/获取一个异步对象池
     * @param creater 
     * @returns 
     */
    export function getAsyncPool<T>(ctor: { new(...params): T }, creater?: (...params) => Promise<T>, reset?: (obj: T) => void): IAsyncPool<T> {
        const name = ctor.name;
        let pool = asyncStoreage.get(name);
        if (!pool) {
            pool = new _AsyncPool(ctor, creater, reset);
            asyncStoreage.set(name, pool);
        }
        return pool as IAsyncPool<T>;
    }

    /**
    * 获取一个GameObject对象池
    * @param creater 
    * @returns 
    */
    export function getObjectPool<T extends mw.GameObject>(guid: string, reset?: (obj: T) => void): IObjectPool<T> {
        const name = mw.GameObject.name;
        let pool = objectStoreage.get(name + guid);
        if (!pool) {
            pool = new _ObjectPool(guid, reset);
            objectStoreage.set(name + guid, pool);
        }
        return pool as IObjectPool<any> as IObjectPool<T>;
    }
}
export interface IObjectPool<T extends mw.GameObject> {
    /**
     * 获取一个对象池物体
     * @param params 
     * @returns 
     */
    spawn(replicate?: boolean, transform?: mw.Transform): Promise<T>;
    /**
     * 获取对象池对象
     * @param params 
     * @returns 
     */
    spawnObject(replicate?: boolean, transform?: mw.Transform): Promise<IObject<T>>;
    /**
     * 获取对象池对象
     * @param params 
     * @returns 
     */
    syncSpawnObject(replicate?: boolean, transform?: mw.Transform): IObject<T>;

    /**回收物体 */
    unSpawn(obj: T);
}
export interface IAsyncPool<T> {
    /**
  * 获取一个对象池物体
  * @param params 
  * @returns 
  */
    spawn(...params): Promise<T>;
    /**
     * 获取对象池对象
     * @param params 
     * @returns 
     */
    spawnObject(...params): Promise<IObject<T>>;

    /**回收物体 */
    unSpawn(obj: T);
}
export interface IPool<T> {
    /**
  * 获取一个对象池物体
  * @param params 
  * @returns 
  */
    spawn(...params): T;
    /**
     * 获取对象池对象
     * @param params 
     * @returns 
     */
    spawnObject(...params): IObject<T>;

    /**回收物体 */
    unSpawn(obj: T);
}
export interface IObject<T> {
    target: T;
    /**
     * 回收对象
     */
    unSpawn();
}
/**
 * 同步对象池
 */
class _Pool<T> {
    /**存储结构 */
    private cache: T[] = [];
    constructor(private ctor: { new(...params): T }, private creater?: (...params) => T, private reset?: (obj: T) => void) {

    }

    /**
     * 获取一个对象池物体
     * @param params 
     * @returns 
     */
    public spawn(...params) {
        return this.cache.length > 0 ? this.cache.pop() : (this.creater ? this.creater(...params) : new this.ctor(...params));
    }

    /**
     * 获取对象池对象
     * @param params 
     * @returns 
     */
    public spawnObject(...params): IObject<T> {
        const target = this.spawn(...params);
        return new _Object(this, target);
    }

    public unSpawn(obj: T) {
        this.reset && this.reset(obj);
        this.cache.push(obj);
    }
}
/**
 * 异步对象池
 */
class _AsyncPool<T> implements IAsyncPool<T>{
    /**存储结构 */
    private cache: T[] = [];
    constructor(private ctor: { new(...params): T }, private creater?: (...params) => Promise<T>, private reset?: (obj: T) => void) {

    }

    /**
     * 获取一个对象池物体
     * @param params 
     * @returns 
     */
    public async spawn(...params) {
        return this.cache.length > 0 ? this.cache.pop() : (this.creater ? await this.creater(...params) : new this.ctor(...params));
    }

    /**
     * 获取对象池对象
     * @param params 
     * @returns 
    */
    public async spawnObject(...params): Promise<IObject<T>> {
        const target = await this.spawn(...params);
        return new _Object(this, target);
    }

    public unSpawn(obj: T) {
        this.reset && this.reset(obj);
        this.cache.push(obj);
    }
}
const InfinityPos = new mw.Vector(0, 0, 50000);
/**
 * 异步对象池
 */
class _ObjectPool<T extends mw.GameObject> implements IObjectPool<T> {
    /**存储结构 */
    private cache: T[] = [];
    constructor(private guid: string, private reset?: (obj: T) => void) {

    }

    /**
     * 获取对象池对象
     * @param params 
     * @returns 
     */
    syncSpawnObject(replicate?: boolean, transform?: mw.Transform): IObject<T> {
        const target = this.cache.length > 0 ? this.cache.pop() : SpawnManager.spawn({ guid: this.guid, replicates: replicate, transform: transform });
        return new _Object(this, target) as any;
    }
    /**
     * 获取一个对象池物体
     * @param params 
     * @returns 
     */
    public async spawn(replicate?: boolean, transform?: mw.Transform): Promise<T> {
        return this.cache.length > 0 ? this.cache.pop() : await SpawnManager.asyncSpawn({ guid: this.guid, replicates: replicate, transform: transform });
    }
    /**
      * 获取对象池对象
      * @param params 
      * @returns 
     */
    public async spawnObject(replicate?: boolean, transform?: mw.Transform): Promise<IObject<T>> {
        const target = await this.spawn(replicate, transform);
        return new _Object(this, target) as any;
    }
    public unSpawn(obj: T) {
        if (obj) {
            this.reset && this.reset(obj);
            //将OBJ移到不可见的位置
            obj.worldTransform.position = InfinityPos;
            this.cache.push(obj);
        }
    }
}

class _Object<T> implements IObject<T> {

    /**
     * 
     * @param _pool 对象池
     * @param target 目标物体
     */
    constructor(private _pool: { unSpawn: (obj: T) => void }, public target: T) {

    }

    public unSpawn() {
        this._pool.unSpawn(this.target);
    }
}
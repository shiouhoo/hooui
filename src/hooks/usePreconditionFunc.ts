import { type Ref, watch, unref } from 'vue';

function shlouldRunFunc(varible: Ref[]) {
    return varible.every((item)=> {
        const it = unref(item);
        if(Array.isArray(it) && it.length) {
            return true;
        }else if(Object.prototype.toString.call(it) === '[object Object]' && Object.keys(it).length) {
            return true;
        }else{
            return it !== null && it !== undefined;
        }
    });
}

export function usePreconditionFunc(varible: Ref | Ref[], func: Function) {
    const arr = Array.isArray(varible) ? varible : [varible];
    return ()=>{
        if(shlouldRunFunc(arr)) {
            func();
        }else{
            const unwatch = watch(arr, (newVal)=>{
                if(shlouldRunFunc(newVal)) {
                    func();
                    unwatch();
                }
            });
        }
    };

}
import { ref, watch, isRef, nextTick, type Ref } from 'vue';

function getDom(target: Ref<HTMLElement>| string | HTMLElement): HTMLElement {
    if (isRef(target)) {
        return target.value;
    }else if(typeof target === 'string') {
        if(!document.querySelector(target)) {
            console.error(`useTabScroll: 节点目标错误，没有找到${target}的元素`);
        }
        return document.querySelector(target)!;
    }else {
        return target;
    }
}

/**
 *
 * @param target 被全屏的元素
 * @param fullDom 全屏的容器
 * @returns
 */
export function useFullScreen(
    target: Ref<HTMLElement>| string | HTMLElement,
    fullDom: Ref<HTMLElement>| string | HTMLElement | Window = window
) {
    const logStyle: Record<string, any> = {};
    let targetParent: HTMLElement;
    const frameStyleMap = new WeakMap<HTMLElement, string>();
    const isFull = ref(false);

    watch(isFull, (val)=>{
        nextTick(()=>{
            if(val) {
                fullScreen();
            }else{
                reset();
            }
        });
    }, { immediate: true });
    function fullScreen() {
        const _fulldom = getDom(fullDom as string);
        const _targetdom = getDom(target);
        if(!_targetdom) {
            return;
        }
        logStyle.target = getDom(target).getAttribute('style') || '';
        if(_fulldom instanceof Window) {
            childFullWindow(_targetdom);
        }else{
            targetParent = _targetdom.parentElement!;
            childFullParent(_targetdom, _fulldom);
        }
    }
    function reset() {
        document.body.setAttribute('style', logStyle.body || '');
        getDom(target).setAttribute('style', logStyle.target || '');
        if(!(getDom(fullDom as string) instanceof Window)) {
            getDom(fullDom as string)?.setAttribute('style', logStyle.fulldom);
        }
        if(targetParent) {
            targetParent.appendChild(getDom(target));
        }
        let w: Window = window;
        while(w.parent !== w) {
            for(const i of Array.from(w.parent.document.querySelectorAll('iframe'))) {
                if(i.contentWindow === w) {
                    i?.setAttribute('style', frameStyleMap.get(i) || '');
                    break;
                }
            }
            w = w.parent;
        }
    }

    function childFullWindow(target: HTMLElement) {
        logStyle.body = document.body.getAttribute('style') || '';
        document.body.setAttribute('style', 'overflow: hidden;width: 100%;height: 100%;');
        target.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; height: 100%;margin:0;z-index: 99999;');
        let w: Window = window;
        while(w.parent !== w) {
            for(const i of Array.from(w.parent.document.querySelectorAll('iframe'))) {
                if(i.contentWindow === w) {
                    frameStyleMap.set(i, i.getAttribute('style') || '');
                    i?.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; height: 100%;margin: 0;z-index: 99999;');
                    break;
                }
            }
            w = w.parent;
        }
    }

    function childFullParent(target: HTMLElement, parent: HTMLElement | Window) {
        let _fulldom = getDom(parent as HTMLElement);
        let w: Window = window;
        while(!_fulldom && w.parent !== w) {
            w = w.parent;
            _fulldom = getDom(parent as HTMLElement);
        }
        if(!_fulldom) {
            console.error('useFullScreen: 找不到全屏容器');
            return;
        }
        logStyle.fulldom = _fulldom.getAttribute('style');
        _fulldom.setAttribute('style', 'position: relative');
        // 将目标元素放入容器节点中
        target.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;margin:0;z-index: 99999;');
        _fulldom.appendChild(target);

    }
    return { isFull };

}
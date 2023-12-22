import { onMounted, type Ref } from 'vue';

const frameStyle: string[] = [];

export function useFullScreen(target: Ref<HTMLElement>) {
    let targetStyle: string = '';
    onMounted(()=>{
        targetStyle = target.value.getAttribute('style') || '';
    });
    function fullScreen() {
        target.value.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; height: 100%;');
        let w: Window = window;
        while(w.parent !== w) {
            for(const i of Array.from(w.parent.document.querySelectorAll('iframe'))) {
                if(i.contentWindow === w) {
                    frameStyle.push(i.getAttribute('style') || '');
                    i.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; height: 100%;');
                    break;
                }
            }
            w = w.parent;
        }
    }
    function reset() {
        target.value.setAttribute('style', targetStyle);
        let w: Window = window;
        while(w.parent !== w) {
            for(const i of Array.from(w.parent.document.querySelectorAll('iframe'))) {
                if(i.contentWindow === w) {
                    i.setAttribute('style', frameStyle.shift() || '');
                    break;
                }
            }
            w = w.parent;
        }
    }
    return { fullScreen, reset };

}
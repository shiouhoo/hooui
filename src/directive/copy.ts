import type { Directive, DirectiveBinding } from 'vue';
const icon1 = '<svg class="copy-icon" width="20px" style="cursor: pointer;vertical-align: middle;" title="复制" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64z"></path><path fill="currentColor" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64"></path></svg>';

const icon2 = '<svg class="copy-icon" width="20px" style="cursor: pointer;vertical-align: middle;" title="复制" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M128 320v576h576V320zm-32-64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32M960 96v704a32 32 0 0 1-32 32h-96v-64h64V128H384v64h-64V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32M256 672h320v64H256zm0-192h320v64H256z"></path></svg>';

// 插入节点
function append(el: any) {
    el.appendChild(el.instance);
}
// 移除节点
function remove(el: any) {
    el.removeChild(el.instance);
}

// 创建一个自定义事件
const event = new CustomEvent('copy-success');
const event2 = new CustomEvent('copy-error');
function copyText(el: any) {
    try {
        navigator.clipboard.writeText(el.innerText);
        el.dispatchEvent(event);
    } catch (e) {
        console.error(e);
        el.dispatchEvent(event2);
    }
}

const copy: Directive = {
    mounted(el, binding: DirectiveBinding) {
        // 将图标传入组件
        const parser = new DOMParser();
        const doc = parser.parseFromString(icon1, 'text/html');
        el.instance = doc.body.firstChild as HTMLElement;
        el.clickHandler = function () {
            copyText(el);
        };
        el.instance.addEventListener('click', el.clickHandler);
        if (binding.value === undefined || binding.value) {
            append(el);
        }
    },
    updated(el, binding: DirectiveBinding) {
        if (binding.value !== binding.oldValue) {
            (binding.value === undefined || binding.value) ? append(el) : remove(el);
        }
    },
    unmounted(el) {
        el.instance.removeEventListener('click', el.clickHandler);
    }

};

export default {
    name: 'h-copy',
    directive: copy
};
---
outline: [2,3]
---

复制富文本到剪切板

```ts
import { message } from 'ant-design-vue';

function copyRichTextToClipboard(richText: string) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = richText;
    document.body.appendChild(tempElement);

    const range = document.createRange();
    range.selectNode(tempElement);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);

    try {
        document.execCommand('copy');
        message.success('已成功复制到剪贴板');
    } catch (err) {
        message.error('复制失败');
    }

    window.getSelection()?.removeAllRanges();
    document.body.removeChild(tempElement);
}

```
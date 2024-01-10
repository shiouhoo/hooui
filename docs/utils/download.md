---
outline: [2,3]
---

下载文件的方法，可以用于下载图片、文件等。

```ts
async function downloadFile(
    res: ArrayBuffer | Blob | Promise<ArrayBuffer | Blob>, 
    fileName: string
){
    let e: Blob;
    if(res instanceof Promise) {
        res.then(()=>{
            downloadFile(res, fileName);
        });
        return;
    }else if(res instanceof ArrayBuffer) {
        e = new Blob([res as any]);
    }
    const url = window.URL.createObjectURL(e);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', fileName);
    a.click();
    window.URL.revokeObjectURL(a.href);
}

```

需要再请求上加上`responseType: 'blob'`或者`responseType: 'arrayBuffer'`。
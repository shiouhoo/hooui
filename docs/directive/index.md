这里包含一些常用的指令。

### 全局使用
在main.ts中引入,每个文件导出的指令都是一个对象，包含name和directive两个属性，name是指令的名称，directive是指令的实现，使用时需要将这两个属性传入app.directive中。
```ts
import  XXXX  from './directive/XXXX';
const app = createApp(App);
app.directive(XXXX.name, XXXX.directive);
```

或者你可以使用vite的批量导入功能，将所有的指令导入到一个文件中，然后在main.ts中导入这个文件，这样就可以不用一个一个的导入了。
```ts
const directives:Record<string, any> = import.meta.glob('./*.ts', { eager: true });

for(const directiveKey in directives) {
    const name = directives[directiveKey].default.name;
    const directive = directives[directiveKey].default.directive;
    app.directive(name, directive);
}
```
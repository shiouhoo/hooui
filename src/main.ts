import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import Vant from 'vant';
// vant组件库样式
import 'vant/lib/index.css';
import 'virtual:uno.css';

import { loadingDirective } from './directive/loading';

const app = createApp(App);

app.directive(loadingDirective.name, loadingDirective.directive);

app.use(Vant);

app.mount('#app');
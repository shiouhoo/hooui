import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import { loadingDirective } from './directive/loading';

const app = createApp(App);

app.directive(loadingDirective.name, loadingDirective.directive);

app.mount('#app');
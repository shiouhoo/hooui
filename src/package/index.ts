import ExpandContainer from './expandcontainer/Index.vue';
import SearchScopeInput from './searchscopeinput/Index.vue';

export function installComponents(app: any) {
    app.component('ExpandContainer', ExpandContainer);
    app.component('SearchScopeInput', SearchScopeInput);
}
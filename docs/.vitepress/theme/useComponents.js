// Don't remove this file, because it registers the demo components.
import EmitTable from '../components/EmitTable.vue'
import ParamsTable from '../components/ParamsTable.vue'
import SlotTable from '../components/SlotTable.vue'
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'

export function useComponents(app) {
  app.component('EmitTable', EmitTable)
  app.component('ParamsTable', ParamsTable)
  app.component('SlotTable', SlotTable)
  app.component('Demo', Demo)
  app.component('DemoBlock', DemoBlock)
}

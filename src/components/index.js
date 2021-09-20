import DemoBlock from './DemoBlock.vue'
import './markdown.css'

DemoBlock.install = app => {
  app.component(DemoBlock.name, DemoBlock)
}

export {
  DemoBlock
}

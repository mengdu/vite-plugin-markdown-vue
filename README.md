# vite-plugin-markdown-vue

Vite plugin for converting markdown into Vue components.

> Part of the code is copied and modified from [Element-plus](https://github.com/element-plus/element-plus).

[Docs](docs/docs.md) | [Example](examples/vue)

**Feature**

+ ✨ Support `block demo` for writing component cases.
+ ✨ Support writing JS logic code and style.
+ ✨ Code block support highlights lines.

### Usage

+ 1、Install

```
npm install -D vite-plugin-markdown-vue
# or
yarn add -D vite-plugin-markdown-vue
```

+ 2、Configure vite

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import markdown from 'vite-plugin-markdown-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [markdown(), vue({
    include: [/\.vue$/, /\.md$/]
  })]
})
```

+ 3、Define the 'demo-block' component and register it with the global.

> `demo-block` component use for `block demo`.

```html
<!-- ./components/demo-block.vue -->
<template>
  <div class="demo-block">
    <div class="source"><slot name="source"></slot></div>
    <div class="meta">
      <div class="description"><slot></slot></div>
      <div class="highlight"><slot name="highlight"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'demo-block'
}
</script>
```

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import DemoBlock from './components/demo-block.vue'

const app = createApp(App)
app.component('demo-block', DemoBlock) // register `demo-block` component.
app.mount('#app')
```

**Demo**

```html
<template>
  <Demo />
</template>
<script>
import Demo from './demo.md'
export default {
  components: {
    Demo
  }
}
</script>
```
### Options

```js
// vite.config.js
export default defineConfig({
  plugins: [
    markdown({
      // Class names for the wrapper
      className: 'content',
      // options for markdown-it
      markdown: {
        // ...
        // init
        setup (md) {
          md.use(otherPlugin())
        }
      }
    }), 
    vue({
      include: [/\.vue$/, /\.md$/]
    })
  ]
})
```

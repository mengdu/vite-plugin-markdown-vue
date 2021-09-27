### Use Script

Support writing JS logic code on markdown.

> Note that only the first `script` tag is applied, and the others will be removed!

```html
<script>
// This is required if there has `block demo`
import * as Vue from 'vue'
export default {
  data () {
    return {
      text: 'Hello'
    }
  },
  methods: {
    handleShow () {
      alert(this.text)
    }
  }
}
</script>

<div style="padding: 15px; border: solid 1px #dcdfe6;">
<p>Input: {{text}}</p>
<input v-model="text" placeholder="Input..."/>&nbsp;
<button @click="handleShow">Show</button>
</div>
```

<script>
import * as Vue from 'vue'
console.log(Vue.version)
export default {
  data () {
    return {
      text: 'Hello'
    }
  },
  methods: {
    hanldeShow () {
      alert(this.text)
    }
  }
}
</script>

<div style="padding: 15px; border: solid 1px #dcdfe6;">
<p>Input: {{text}}</p>
<input v-model="text" placeholder="Input..."/>&nbsp;
<button @click="hanldeShow">Show</button>
</div>

### Use Style

If you need to define a style, you can use the 'style' tag like `.vue` component.

> It is worth noting that only the content of the last `style` tag is applied.

```html
<p style="padding: 15px; border: solid 1px #dcdfe6;">
<span class="red">Red</span>&nbsp;
<span class="green">Green</span>&nbsp;
<span class="blue">Blue</span>&nbsp;
</p>

<style>
.red {
  color: red;
}
.green {
  color: green;
}
.blue {
  color: blue;
}
</style>
```

<p style="padding: 15px; border: solid 1px #dcdfe6;">
<span class="red">Red</span>&nbsp;
<span class="green">Green</span>&nbsp;
<span class="blue">Blue</span>&nbsp;
</p>

<style>
.red {
  color: red;
}
.green {
  color: green;
}
.blue {
  color: blue;
}
</style>

### Block Demo

`::: demo` and `:::` wrapped blocks are code blocks used to write Vue component cases.

> Note that the code block language must declare the `html` language.

````markdown
:::demo this is a `demo`。

```html
<template>
<button @click="onclick">Click me</button>
</template>
<script>
export default {
  methods: {
    onclick () {
      alert('Hello')
    }
  }
}
</script>
```
:::
````

:::demo this is a `demo`。

```html
<template>
<button @click="onclick">Click me</button>
</template>
<script>
export default {
  methods: {
    onclick () {
      alert('Hello')
    }
  }
}
</script>
```
:::

### Code block highlight lines.

The code block highlights the specified lines.

For example, highlight lines 1, 3, 5-7 and 9.

````markdown
```js {1,3,5-7,9}
var foo = "hello"
const foo2 = true
let foo3 = 100

function main() {
  console.log(foo, foo2, foo3)
}

main()
```
````

```js {1,3,5-7,9}
var foo = "hello"
const foo2 = true
let foo3 = 100

function main() {
  console.log(foo, foo2, foo3)
}

main()
```

### Table

| Props       | Description    | Type    | Optional                                           | Default |
| ----------- | -------------- | ------- | -------------------------------------------------- | ------ |
| size        | Size           | string  | medium / small / mini                              | —      |
| type        | Type           | string  | primary / success / warning / danger / info / text | —      |
| plain       | Is it a simple button | boolean | —                                           | false  |
| native-type | Native type attribute | string  | button / submit / reset                     | button |

### Tip Container

Support container blocks of `:::warning`, `:::Tip`, `:::spooler`.

````markdown
:::warning
This is the `warning` prompt block.
:::

:::tip
This is the `tip` prompt block.
:::
````

:::warning
This is the `warning` prompt block.
:::

:::tip
This is the `tip` prompt block.
:::

**Spoiler**

````markdown
:::spoiler Click me

> Hello this is a `spoiler` container.
:::
````

:::spoiler Click me

> Hello this is a `spoiler` container.
:::

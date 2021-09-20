import { createFilter } from '@rollup/pluginutils'
import { createMd } from './markdown'
import { genInlineComponentText, stripScript, stripTemplate } from './utils'

export const createMarkdown = createMd

export function transformToVueCode (source, md, options = {}) {
  const content = md.render(source)
  const startTag = '<!--element-demo:'
  const startTagLen = startTag.length
  const endTag = ':element-demo-->'
  const endTagLen = endTag.length

  const components = []
  let id = 0 // demo 的 id
  let output = [] // 输出的内容
  let start = 0 // 字符串开始位置

  let commentStart = content.indexOf(startTag)
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen)

  // 把 <!--element-demo: *** :element-demo--> 的内容提取，替换
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart))

    const commentContent = content.slice(commentStart + startTagLen, commentEnd)
    const html = stripTemplate(commentContent)
    const script = stripScript(commentContent)

    const demoComponentName = `block-demo-${id}`
    output.push(`<template #source><${demoComponentName} /></template>`)
    components.push([JSON.stringify(demoComponentName), genInlineComponentText(html, script)])

    // 重新计算下一次的位置
    id++
    start = commentEnd + endTagLen
    commentStart = content.indexOf(startTag, start)
    commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  }

  output.push(content.slice(start))

  let script = ''
  let style = ''

  const template = `
    <template>
      <!-- eslint-disable -->
      <section class="markdown ${options.className || 'content'}">
      ${output.join('')}
      </section>
    </template>`
    .replace(/<script>([\s\S]+?)<\/script>/g, function (text) {
      // 只使用第一个script标签
      if (!script) {
        if (components.length > 0) {
          const constName = '$$$exportDefault'
          const componenetMixinsName = '$$$componenetMixins'
          const componenetMixinsString = `const ${componenetMixinsName} = {
            components: {\n${components.map(e => `${e[0]}: ${e[1]}`)}\n}
          }`
          const componenetMixins = `if (${constName}.mixins) {
            ${constName}.mixins.push(${componenetMixinsName})
          } else {
            ${constName}.mixins = [${componenetMixinsName}]
          }
          `
          script = text
            .replace(/export +default/, `const ${constName} =`)
            .replace(/<\/script>/, `${componenetMixinsString}\n${componenetMixins}\nexport default ${constName}\n<\/script>`)
        } else {
          script = text
        }
      }
      return ''
    })
    .replace(/<style( +.*)?>([\s\S]+?)<\/style>/g, function (text) {
      style = text // 使用最后一个style标签
      return ''
    })
  
  if (!script) {
    script = `<script>
      /** eslint-disable **/
      import * as Vue from 'vue'
      export default {
        components: {
          ${components.map(e => e[0] + ': ' + e[1] + ',')}
        }
      }
    </script>`
  }

  return [template, script, style].filter(e => !!e).join('\n')
}

export default function plugin (options = {}) {
  const filter = createFilter(options.include || /\.md$/, options.exclude)
  const md = createMd(options.markdown || {})

  return {
    name: 'vite-plugin-markdown-vue',
    enforce: 'pre',
    async transform (source, id) {
      if (!filter(id)) return null
      return transformToVueCode(source, md, options)
    },
    async handleHotUpdate(ctx) {
      if (!filter(ctx.file)) return

      const defaultRead = ctx.read
  
      ctx.read = async function() {
        return transformToVueCode(await defaultRead(), md, options)
      }
    }
  }
}

import container from 'markdown-it-container'

export default md => {
  md.use(container, 'tip')
  md.use(container, 'warning')

  // '::: spoiler click me\n*content*\n:::\n'
  md.use(container, 'spoiler', {
    validate: function(params) {
      return params.trim().match(/^spoiler\s+(.*)$/)
    },
   
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/)
   
      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n'
   
      } else {
        // closing tag
        return '</details>\n'
      }
    }
  })

  md.use(container, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
  
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
        return `<demo-block>
          ${description ? `<div>${md.render(description)}</div>` : ''}
          <!--element-demo: ${content}:element-demo-->`
      }
      return '</demo-block>'
    }
  })

  const defaultRender = md.renderer.rules.fence

  // 把demo代码块放到指定插槽
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    // 判断该 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1]
    const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/)

    // 必须是 ```html 的代码块
    if (/^html/.test(token.info) && isInDemoContainer) {
      return `<template #highlight>${defaultRender(tokens, idx, options, env, self)}</template>`
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}

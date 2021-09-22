import { compileTemplate, TemplateCompiler } from '@vue/compiler-sfc'

const templateReplaceRegex = /<template>([\s\S]+)<\/template>/g

export function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

export function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

export function stripTemplate(content) {
  content = content.trim()

  if (!content) {
    return content
  }

  // 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
}

function pad(source) {
  return source
    .split(/\r?\n/)
    .map(line => `  ${line}`)
    .join('\n')
}

export function genInlineComponentText(template, script) {
  // https://github.com/vuejs/vue-loader/blob/423b8341ab368c2117931e909e2da9af74503635/lib/loaders/templateLoader.js#L46
  let source = template
  if (templateReplaceRegex.test(source)) {
    source = source.replace(templateReplaceRegex, '$1')
  }

  const compiled = compileTemplate({
    source: `<div>${source}</div>`,
    filename: 'inline-component', // TODO：这里有待调整
    compiler: TemplateCompiler,
    compilerOptions: {
      mode: 'function'
    }
  })

  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach(tip => {
      console.warn(tip)
    })
  }

  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n` +
        compiled.errors.map(e => `  - ${e}`).join('\n') +
        '\n',
    )
  }

  let demoComponentContent = `
    ${(compiled.code).replace('return function render','function render')}
  `

  script = script.trim()
  const exportName = '$$$blockDemoExport'

  if (script) {
    script = script
      .replace(/export\s+default/, () => `const ${exportName} =`)
      .replace(/import ({.*}) from 'vue'/g, (s, s1) => `const ${s1} = Vue`)
  } else {
    script = `const ${exportName} = {}`
  }

  demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}
    return {
      render,
      ...${exportName}
    }
  })()`

  return demoComponentContent
}

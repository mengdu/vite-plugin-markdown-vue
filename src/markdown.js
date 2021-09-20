import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import anchor from 'markdown-it-anchor'
import uslug from 'uslug'
import container from './container'
import highlightLines from './highlightLines'

function highlight (code, lang, attrs) {
  let html = code

  if (lang && hljs.getLanguage(lang)) {
    try {
      html = hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
    } catch (__) {}
  } else {
    const result = hljs.highlightAuto(code)
    html = result.value
    lang = result.language || ''
  }

  return `<pre class="hljs" data-lang="${lang}"><code>${html}</code></pre>`
}

export function createMd (options) {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight,
    ...options,
  })
  
  md.linkify.set({ fuzzyLink: false })
  md.use(highlightLines)
  md.use(container)

  md.use(anchor, {
    permalink: anchor.permalink.linkInsideHeader({
      class: 'anchor',
      // symbol: '<svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>',
      symbol: '<span class="octicon octicon-link"></span>',
      placement: 'before'
    }),
    slugify: s => uslug(s),
    ...options.anchor
  })

  if (options && options.setup) {
    options.setup(md)
  }

  return md
}

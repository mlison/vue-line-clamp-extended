const isFunction = (fn: any) => typeof fn === 'function'

export interface LineClampOptions {
  text: string
  lines?: number
  expanded?: any
}

const clamp = (el: HTMLElement, binding: { value: LineClampOptions }, vnode: any) => {
  if (!binding.value) {
    throw new Error('Directive options are missing')
  }

  const originalText: string = binding.value.text || ''
  // number of lines that should remain visible after clamping
  const lineCount: number = binding.value.lines || 3
  // expanded can be a function that returns boolean, or a boolean straight up
  const expanded = binding.value.expanded

  const isExpanded: boolean = isFunction(expanded) ? expanded(el, binding) : !!expanded

  // needs to happen first, we don't have the right height later
  const lineHeight = window && window.getComputedStyle(el).lineHeight
  el.style.maxHeight = `calc(${lineHeight} * ${lineCount})`

  // content needs to be wrapped in something so we can get diffs in height
  const span = document.createElement('span')
  span.innerHTML = originalText
  el.innerHTML = ''
  el.appendChild(span)

  // if bindings indicate text should be expanded we reset text and height
  if (isExpanded) {
    span.textContent = originalText
    el.style.maxHeight = 'initial'
    return
  }

  // notify the parent component whether the text overflows or not
  vnode.context.$emit('is-expandable', span.offsetHeight > el.clientHeight)

  // cut out words from the end until it all fits into view
  while (span.offsetHeight > el.clientHeight) {
    const text = span.textContent || originalText
    span.textContent = text.replace(/\W*\s(\S)*$/, '...')
  }
}

export const lineClamp = {
  inserted: clamp,
  update: clamp,
}

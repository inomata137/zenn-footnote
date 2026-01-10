import './style.css'

export default defineContentScript({
  matches: ['https://zenn.dev/*'],
  main(ctx) {
    ctx.addEventListener(window, 'wxt:locationchange', () => attach())
    attach()
  },
})

function attach() {
  document.querySelectorAll('.znc sup.footnote-ref > a').forEach((anchor) => {
    if (anchor.parentNode?.querySelector('div.footnote-popup')) {
      return
    }
    const href = anchor.getAttribute('href')
    if (href?.startsWith('#fn-')) {
      const target = document.getElementById(href.slice(1))
      if (target) {
        const popup = document.createElement('div')
        popup.className = 'footnote-popup'
        popup.style.position = 'absolute'
        popup.style.backgroundColor = 'white'
        popup.style.border = '1px solid black'
        popup.style.padding = '4px'
        popup.style.zIndex = '1000'
        popup.style.maxWidth = '500px'
        popup.innerHTML = target.innerHTML.trim()

        anchor.insertAdjacentElement('afterend', popup)
      }
    }
  })
}

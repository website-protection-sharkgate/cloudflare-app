;(function () {
  'use strict'

  if (!window.addEventListener) return // Check for IE9+

  const isPreview = INSTALL_ID === 'preview'
  let options = INSTALL_OPTIONS
  let product = INSTALL_PRODUCT
  let element
  const style = document.createElement('style')

  function getMaxZIndex () {
    var max = 0
    var elements = document.getElementsByTagName('*')

    Array.prototype.slice.call(elements).forEach(function (element) {
      var zIndex = parseInt(document.defaultView.getComputedStyle(element).zIndex, 10)

      max = zIndex ? Math.max(max, zIndex) : max
    })

    return max
  }

  function createSharkGateLogoElement (element) {
    element = 'cloudflare-app'
    element = document.createElement(element)
    document.body.appendChild(element)
    // element = INSTALL.createElement({
    //   selector: 'body',
    //   method: 'append'
    // }, element)
    element.id = 'sharkGateLogo'
    return element
  }

  function removeSharkGateLogoElement () {
    try {
      // find a html element with id and remove if exists
      var element = document.getElementById('createSharkGateLogoElement')
      if (element) {
        element.parentNode.removeChild(element)
      }
    } catch (e) {}
  }

  function removeAndAddElement () {
    removeSharkGateLogoElement()
    element = createSharkGateLogoElement(element)
    element.setAttribute('app', 'website-protected-by-sharkgate')
    element.setAttribute('data-position', options.position)
    element.setAttribute('data-visibility', 'visible')
    element.style.zIndex = getMaxZIndex() + 1

    if (product) {
      element.setAttribute('data-product-id', product.id)
    }

    element.innerHTML = `
        <a class="sharkgate-icon" href="https://www.sharkgate.net" target="_blank">
          <img src="./media/website-protection-via-sharkgate-logo.png" style="padding: 5px 5px 5px 5px;" width="` + options.size + `%" height="` + options.size + `%" alt="website protection by sharkgate" />
        </a>
    `
    element.appendChild(style)
  }

  function bootstrap () {
    // alert('in bootstrap')
    if (!isPreview && options.showStrategy === 'never') return
    removeAndAddElement()
  }

  if (document.readyState === 'loading') {
    // alert('Ready STate is loading')
    document.addEventListener('DOMContentLoaded', bootstrap)
  } else {
    // alert('booty going for ')
    bootstrap()
  }

  window.INSTALL_SCOPE = {
    setOptions (nextOptions) {
      options = nextOptions
      removeAndAddElement()
    },
    setProduct (nextProduct) {
      product = nextProduct
      removeAndAddElement()
    }
  }
}())

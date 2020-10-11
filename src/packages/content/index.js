const BookMark = (function (d, w) {
  let characterID
  let server
  let element

  function getCurrentQueryParams() {
    const query = w.location.search.replace('?', '')

    query.split('&').forEach((param) => {
      const [key, value] = param.split('=')

      if (key === 'server') {
        server = value
      } else {
        characterID = value
      }
    })
  }

  function insertElement() {
    const targetClassName = 'df-bookmark-container'
    const buttonClassName = 'df-bookmark-button'
    const targetElement = d.createElement('div')
    const buttonElement = d.createElement('button')

    targetElement.dataset.characterId = characterID
    targetElement.classList.add(targetClassName)

    buttonElement.innerText = '즐겨찾기 추가'
    buttonElement.classList.add(buttonClassName)

    element = targetElement

    element.appendChild(buttonElement)
    d.body.appendChild(element)
  }

  function run() {
    getCurrentQueryParams()
    insertElement()
  }

  run()

  return {
    characterID,
    server,
    element
  }
})(document, window)

console.log(BookMark)

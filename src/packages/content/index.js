;(function () {
  const s = document.createElement('script')
  const f = document.createElement('script')

  s.src = 'https://use.fontawesome.com/releases/v5.15.1/js/solid.js'
  f.src = 'https://use.fontawesome.com/releases/v5.15.1/js/fontawesome.js'
  s.defer = true
  f.defer = true
  s.integrity =
    'sha384-oKbh94nlFq571cjny1jaIBlQwzTJW4KYExGYjslYSoG/J/w68zUI+KHPRveXB6EY'
  f.integrity =
    'sha384-v0OPwyxrMWxEgAVlmUqvjeEr48Eh/SOZ2DRtVYJCx1ZNDfWBfNMWUjwUwBCJgfO4'
  s.crossOrigin = 'anonymous'
  f.crossOrigin = 'anonymous'

  document.body.appendChild(s)
  document.body.appendChild(f)
})()

/**
 * @typedef {Object} BookMark
 * @property {string} characterID
 * @property {string} characterName
 * @property {number} level
 * @property {string} job
 * @property {string} server
 * @property {HTMLElement} element
 * @property {HTMLElement} buttonElement
 * @property {boolean} isStored
 */

/**
 * @returns {BookMark}
 */
function BookMark() {
  const query = window.location.search.replace('?', '')

  query.split('&').forEach((param) => {
    const [key, value] = param.split('=')

    if (key === 'server') {
      this.server = value
    } else {
      this.characterID = value
    }
  })

  chrome.storage.sync.get([this.characterID], (result) => {
    if (!result[this.characterID]) {
      this.isStored = false
    } else {
      this.isStored = true
    }
    updateButtonElement()
  })

  const updateButtonElement = () => {
    const starIcon = `<i class="fas fa-star${
      this.isStored ? ' stored' : ''
    }"></i>${this.isStored ? '즐겨찾기에 추가 됨' : '즐겨찾기에 추가'}`

    this.buttonElement.innerHTML = starIcon
  }

  const targetClassName = 'df-bookmark-container'
  const buttonClassName = 'df-bookmark-button'
  const targetElement = document.createElement('div')
  const buttonElement = document.createElement('button')

  targetElement.dataset.characterId = this.characterID
  targetElement.classList.add(targetClassName)
  buttonElement.classList.add(buttonClassName)

  this.element = targetElement
  this.buttonElement = buttonElement

  this.element.appendChild(this.buttonElement)
  document.body.appendChild(this.element)

  this.buttonElement.onclick = (event) => {
    if (this.isStored) {
      // 이미 추가 된 경우
      return
    } else {
      // 추가
      const character = {
        [this.characterID]: {
          // TODO
          id: this.characterID,
          date: Date.now(),
          server: this.server
        }
      }
      chrome.storage.sync.set(character, () => {
        updateButtonElement()
      })
    }
  }
}

const bookMark = new BookMark()

console.log(bookMark)

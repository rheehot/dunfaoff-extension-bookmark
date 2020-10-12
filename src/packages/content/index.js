/**
 * @typedef {Object} BookMark
 * @property {string} characterID
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
    this.buttonElement.innerText = this.isStored
      ? '즐겨찾기에 추가 됨'
      : '즐겨찾기 추가'
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
          id: this.characterID,
          server: this.server,
          date: Date.now()
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

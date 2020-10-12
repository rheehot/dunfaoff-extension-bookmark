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

const utils = {
  isEmpty(obj) {
    return Object.keys(obj).length === 0
  },
  showToast(opts) {
    return Toastify({
      ...opts,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'center'
    }).showToast()
  }
}

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

  // 아이디, 레벨, 직업 가져오기
  this.characterName = document.querySelector(
    `div[data-id=${this.characterID}]`
  ).innerText

  const [level, job] = document
    .querySelector('div#char_info')
    .innerText.split('|')
    .map((s) => s.trim())

  this.level = level.replace('Lv.', '')
  this.job = job

  this.buttonElement.onclick = (event) => {
    if (this.isStored) {
      // 이미 추가 된 경우 삭제
      function deleteContent(id) {
        return new Promise((resolve, reject) => {
          chrome.storage.sync.remove(id, () => resolve())
        })
      }

      deleteContent(this.characterID)
        .then(() => {
          utils.showToast({ text: '즐겨찾기에서 삭제 완료' })
          updateButtonElement()
        })
        .catch(() => {})
    } else {
      // 추가
      const character = {
        [this.characterID]: {
          date: Date.now(),
          id: this.characterID,
          job: this.job,
          level: this.level,
          name: this.characterName,
          server: this.server
        }
      }
      chrome.storage.sync.set(character, () => {
        utils.showToast({ text: '즐겨찾기에 추가 완료' })
        updateButtonElement()
      })
    }
  }

  const updateButtonElement = () => {
    chrome.storage.sync.get([this.characterID], (result) => {
      if (utils.isEmpty(result)) {
        this.isStored = false
      } else {
        this.isStored = true
      }

      const starIcon = `<i class="fas fa-star${
        this.isStored ? ' stored' : ''
      }"></i>${this.isStored ? '즐겨찾기에 추가 됨' : '즐겨찾기에 추가'}`

      this.buttonElement.innerHTML = starIcon
    })
  }

  updateButtonElement()
}

const bookMark = new BookMark()

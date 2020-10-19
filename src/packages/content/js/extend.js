function main() {
  const inputWrapNode = document.querySelector('.input-group')
  const inputNode = document.querySelector('input.form-control')

  if (!inputWrapNode || !inputNode) {
    return
  }

  /** @returns {object[] | null} */
  function getBookmark() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(['bookmark'], ({ bookmark }) => {
        resolve(!bookmark.items.length ? null : bookmark.items)
      })
    })
  }

  /** @returns {Promise<object> | null} */
  function getRecentVisited() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(['recent'], ({ recent }) => {
        resolve(!recent.items.length ? null : recent.items)
      })
    })
  }

  const tasks = Promise.all([getBookmark(), getRecentVisited()])

  tasks.then((result) => {
    console.log(result[0], result[1])
  })

  // getRecentVisited().then((items) => {
  //   if (items && items.length) {
  //     const fuse = new Fuse(items, {
  //       includeScore: true,
  //       keys: ['name', 'adventure']
  //     })

  //     const result = fuse.search('던린')

  //     console.log(result, items)
  //   }
  // })

  /**
   * @param {HTMLElement} parent
   * @param {HTMLElement | NodeList | Array} node
   */
  function appendFromParent(parent, node) {
    if (!(parent instanceof HTMLElement)) {
      throw new Error('Not HTMLElement Type Parent')
    } else if (node instanceof HTMLElement) {
      parent.appendChild(node)
    } else if (node instanceof NodeList || node.length) {
      parent.append(...node)
    } else {
      throw new Error('자식 Node의 타입 불분명')
    }
  }

  function ce(nodeType = 'div') {
    return document.createElement(nodeType)
  }

  const extendNode = document.createElement('div')

  extendNode.classList.add('extend-container')
  extendNode.dataset.active = false

  // test tab
  const tabContainer = ce('div')

  tabContainer.classList.add('tab-container')

  const tab1 = ce('div')
  const tab2 = ce('div')

  tab1.classList.add('tab-item')
  tab2.classList.add('tab-item')

  tab1.textContent = '최근검색'
  tab2.textContent = '즐겨찾기'

  appendFromParent(tabContainer, [tab1, tab2])
  appendFromParent(extendNode, tabContainer)

  // test
  const ul = document.createElement('ul')

  for (let i = 0; i < 9; i++) {
    const li = document.createElement('li')

    li.innerHTML = `캐릭터 ${i}<span>
    <i class="fas fa-star fa-sm" style="color: rgba(0, 0, 0, 0.1); margin-right: 0.2rem"></i>
    <i class="fas fa-times fa-sm" style="color: rgba(0, 0, 0, 0.1);"></i>
    </span>`

    appendFromParent(ul, li)
  }

  appendFromParent(extendNode, ul)

  inputNode.autocomplete = 'off'
  inputNode.onclick = function () {
    extendNode.dataset.active = true
  }

  appendFromParent(inputWrapNode, extendNode)
}

main()

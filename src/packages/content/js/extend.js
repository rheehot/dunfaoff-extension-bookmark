;(function testImport(nextCallback) {
  chrome.storage.sync.get(['recent'], ({ recent }) => {
    if (!recent.items.length) {
      chrome.storage.sync.set(
        {
          recent: {
            items: [
              {
                adventure: 'reactnative',
                date: 1603174785204,
                id: '938e5013549c93b8e33cc817de9257ae',
                job: '眞 크루세이더',
                level: '100',
                name: '던린이예용',
                server: 'anton'
              }
            ]
          }
        },
        () => nextCallback()
      )
    } else {
      nextCallback()
    }
  })
})(main)

function main() {
  const inputWrapNode = document.querySelector('.input-group')
  /** @type {HTMLInputElement} */
  const inputNode = document.querySelector('input.form-control')

  if (!inputWrapNode || !inputNode) {
    return
  }

  const util = {
    /**
     * @param {HTMLElement} parent
     * @param {HTMLElement | NodeList | Array} node
     */
    appendFromParent(parent, node) {
      if (!(parent instanceof HTMLElement)) {
        throw new Error('Not HTMLElement Type Parent')
      } else if (node instanceof HTMLElement) {
        parent.appendChild(node)
      } else if (node instanceof NodeList || node.length) {
        parent.append(...node)
      } else {
        throw new Error('자식 Node의 타입 불분명')
      }
    },
    ce(nodeType = 'div') {
      return document.createElement(nodeType)
    }
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
    const [bookmark, recent] = result

    // console.log(bookmark, recent)

    // init extend search form
    inputNode.autocomplete = 'off'

    const extendContainer = util.ce('div')

    extendContainer.classList.add('extend-container')
    extendContainer.dataset.active = false

    util.appendFromParent(inputWrapNode, extendContainer)

    inputNode.onclick = function (e) {
      e.stopPropagation()

      extendContainer.dataset.active = true
    }

    document.addEventListener('click', function (e) {
      if (!extendContainer.contains(e.target)) {
        extendContainer.dataset.active = false
      }
    })

    // create two tab
    const recentTab = util.ce('div')
    const bookmarkTab = util.ce('div')
    const tabContainer = util.ce('div')

    ;[recentTab, bookmarkTab].forEach((el) => el.classList.add('tab-item'))
    bookmarkTab.classList.add('deactive')
    tabContainer.classList.add('tab-container')

    recentTab.textContent = '최근검색'
    bookmarkTab.textContent = '즐겨찾기'

    // 이벤트 연결(Tabs)
    recentTab.onclick = function () {
      if (recentTab.classList.contains('deactive')) {
        recentTab.classList.remove('deactive')
        bookmarkTab.classList.add('deactive')

        recentItemContainer.style.display = 'flex'
        bookmarkItemContainer.style.display = 'none'
      } else {
        return
      }
    }

    bookmarkTab.onclick = function () {
      if (bookmarkTab.classList.contains('deactive')) {
        bookmarkTab.classList.remove('deactive')
        recentTab.classList.add('deactive')

        bookmarkItemContainer.style.display = 'flex'
        recentItemContainer.style.display = 'none'
      }
    }

    // 최근검색 리스트
    const recentItemContainer = util.ce('ul')

    recentItemContainer.classList.add('recent-ul')

    if (recent === null) {
      const noRecentItem = util.ce('div')

      noRecentItem.textContent = '최근 기록이 없습니다.'

      util.appendFromParent(recentItemContainer, noRecentItem)
    } else {
      recent.forEach((/** @type {import('./item').StoredCharacter} */ item) => {
        const li = util.ce('li')

        li.innerHTML = `
        <div class="item-wrap">
          <span class="name">
            ${item.name}
          </span>
          <span class="icon">
            <i class="fas fa-star fa-sm" style="color: rgba(0, 0, 0, 0.2); margin-right: 0.2rem"></i>
            <i class="fas fa-times fa-sm" style="color: rgba(0, 0, 0, 0.2);"></i>
          </span>
        </div>
        `

        util.appendFromParent(recentItemContainer, li)
      })
    }

    // 즐겨찾기 리스트
    const bookmarkItemContainer = util.ce('ul')

    bookmarkItemContainer.classList.add('bookmark-ul')
    bookmarkItemContainer.style.display = 'none'

    if (bookmark === null) {
      const noBookmarkItem = util.ce('div')

      noBookmarkItem.textContent = '즐겨찾기에 추가된 캐릭터가 없습니다.'

      util.appendFromParent(bookmarkItemContainer, noBookmarkItem)
    } else {
      bookmark.forEach((
        /** @type {import('./item').StoredCharacter} */ item
      ) => {
        const li = util.ce('li')

        li.innerHTML = `
        <div class="item-wrap">
          <span class="name">
            ${item.name}
          </span>
          <span class="job">
            ${item.job}
          </span>
          <span class="icon">
            <i class="fas fa-times fa-sm" style="color: rgba(0, 0, 0, 0.2);"></i>
          </span>
        </div>
        `

        util.appendFromParent(bookmarkItemContainer, li)
      })
    }

    util.appendFromParent(tabContainer, [recentTab, bookmarkTab])
    util.appendFromParent(extendContainer, tabContainer)
    util.appendFromParent(extendContainer, [
      recentItemContainer,
      bookmarkItemContainer
    ])
  })
}

// main()

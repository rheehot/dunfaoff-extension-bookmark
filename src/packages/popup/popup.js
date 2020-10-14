chrome.storage.sync.get(['bookmark'], ({ bookmark }) => {
  if (!bookmark.items.length) {
    const parent = document.querySelector('.bookmark-list .list-wrapper')
    const p = document.createElement('p')

    p.style.color = 'rgba(0, 0, 0, 0.7)'
    p.textContent =
      '아직 즐겨찾기에 아무 것도 추가되지 않았습니다. 캐릭터 페이지 우측 하단의 버튼을 이용해 캐릭터를 즐겨찾기에 추가해보세요.'

    insertItem(parent, p)
  }

  bookmark.items.forEach((item) => {
    // Bookmark Template
    const parent = document.querySelector('.bookmark-list .list-wrapper')
    const node = createNode(item)

    insertItem(parent, node)
  })
})

chrome.storage.sync.get(['recent'], ({ recent }) => {
  if (!recent.items.length) {
    const parent = document.querySelector('.recent-list .list-wrapper')
    const p = document.createElement('p')

    p.style.color = 'rgba(0, 0, 0, 0.7)'
    p.textContent = '확장 프로그램을 설치한 이후의 최근 기록이 보여집니다.'

    insertItem(parent, p)
  }

  recent.items.forEach((item) => {
    // Recent Template
    const parent = document.querySelector('.recent-list .list-wrapper')
    const node = createNode(item)

    insertItem(parent, node)
  })
})

/**
 * @param {HTMLElement} parent
 * @param {HTMLElement} item
 */
function insertItem(parent, item) {
  parent.appendChild(item)
}

function createNode({ id, server, job, name, adventure }, nodeType = 'li') {
  const node = document.createElement(nodeType)

  node.classList.add('list-item')

  node.innerHTML = `
  <a target="_blank" href="https://dunfaoff.com/SearchResult.df?server=${server}&characterid=${id}">
    <span class="job">
      ${job}
    </span>
    <span class="name">
      ${name}
    </span>
    <span class="adventure">
      ${adventure}
    </span>
  </a>
  `

  return node
}

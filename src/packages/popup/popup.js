chrome.storage.sync.get(['bookmark'], ({ bookmark }) => {
  bookmark.items.forEach((item) => {
    // Bookmark Template
    const parent = document.querySelector('.bookmark-list .list-wrapper')
    const node = createNode(item)

    insertItem(parent, node)
  })
})

chrome.storage.sync.get(['recent'], ({ recent }) => {
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

function createNode(
  { id, server, job, name, adventure, level },
  nodeType = 'li'
) {
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
    <span class="level">
      레벨 ${level}
    </span>
  </a>
  `

  return node
}

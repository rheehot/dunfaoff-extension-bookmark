chrome.storage.sync.get(['bookmark'], ({ bookmark }) => {
  bookmark.items.forEach((item) => {
    // Bookmark Template
    const parent = document.querySelector('.bookmark-list .list-wrapper')
    const node = document.createElement('li')

    node.classList.add('list-item')
    node.innerHTML = `<a target="_blank" href="https://dunfaoff.com/SearchResult.df?server=${item.server}&characterid=${item.id}">
      <span class="job">
        ${item.job} |
      </span>
      <span class="name">
        ${item.name}
      </span>
    </a>`

    insertItem(parent, node)
  })
})

chrome.storage.sync.get(['recent'], ({ recent }) => {
  recent.items.forEach((item) => {
    // Recent Template
    console.log(item)
  })
})

/**
 * @param {HTMLElement} parent
 * @param {HTMLElement} item
 */
function insertItem(parent, item) {
  parent.appendChild(item)
}

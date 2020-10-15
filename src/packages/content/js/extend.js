function main() {
  const inputWrapNode = document.querySelector('.input-group')
  const inputNode = document.querySelector('input.form-control')

  if (!inputWrapNode || !inputNode) {
    return
  }

  /** @returns {object[] | null} */
  function getBookmark() {}

  /** @returns {object[] | null} */
  function getRecentVisited() {}

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

  tabContainer.append(tab1, tab2)

  extendNode.appendChild(tabContainer)

  // test
  const ul = document.createElement('ul')

  for (let i = 0; i < 9; i++) {
    const li = document.createElement('li')

    li.innerHTML = `캐릭터 ${i}<span>
    <i class="fas fa-star fa-sm" style="color: rgba(0, 0, 0, 0.1); margin-right: 0.2rem"></i>
    <i class="fas fa-times fa-sm" style="color: rgba(0, 0, 0, 0.1);"></i>
    </span>`

    ul.appendChild(li)
  }

  extendNode.appendChild(ul)

  inputNode.autocomplete = 'off'
  inputNode.onclick = function () {
    extendNode.dataset.active = true
  }

  inputWrapNode.appendChild(extendNode)
}

main()

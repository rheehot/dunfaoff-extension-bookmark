const onError = document.querySelector('.error-actions')

if (onError !== null) {
  throw ''
}

const MAX_RECENT_LENGTH = 20

chrome.storage.sync.get(['recent'], ({ recent }) => {
  const query = window.location.search.replace('?', '')

  let server, characterID

  query.split('&').forEach((param) => {
    const [key, value] = param.split('=')

    if (key === 'server') {
      server = value
    } else {
      characterID = value
    }
  })

  const found = recent.items.find((item) => item.id === characterID)

  if (found === undefined) {
    if (recent.items.length >= MAX_RECENT_LENGTH) {
      recent.items.splice(recent.items.length - 1, 1)
    }

    const name = document.querySelector(`div[data-id="${characterID}"]`)
      .innerText

    let [level, job] = document
      .querySelector('div#char_info')
      .innerText.split('|')
      .map((s) => s.trim())

    level = level.replace('Lv.', '')
    job = job

    recent.items.unshift({
      date: Date.now(),
      id: characterID,
      job,
      level,
      name,
      server
    })

    return chrome.storage.sync.set({ recent: { items: [...recent.items] } })
  } else {
    return
  }
})

const onError = document.querySelector('.error-actions')

if (onError !== null) {
  throw ''
}

const MAX_RECENT_LENGTH = 20

chrome.storage.sync.get(['recent'], ({ recent }) => {
  const { server, characterID } = getCharFromQuery()
  const found = recent.items.find((item) => item.id === characterID)

  if (found === undefined) {
    if (recent.items.length >= MAX_RECENT_LENGTH) {
      recent.items.splice(recent.items.length - 1, 1)
    }

    const name = getCharacterName()
    const { job, level } = getLevelAndJob()

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

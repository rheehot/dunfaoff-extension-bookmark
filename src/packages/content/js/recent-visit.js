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
  } else {
    const overlayIndex = recent.items.findIndex(
      (item) => item.id === characterID
    )
    recent.items.splice(overlayIndex, 1)
  }

  const name = getCharacterName()
  const { job, level } = getLevelAndJob()
  const adventureName = getAdventureName()

  recent.items.unshift({
    adventure: adventureName,
    date: Date.now(),
    id: characterID,
    job,
    level,
    name,
    server
  })

  return chrome.storage.sync.set({ recent: { items: [...recent.items] } })
})

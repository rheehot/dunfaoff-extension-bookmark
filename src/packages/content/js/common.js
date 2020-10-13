/**
 * @returns {{ server: string, characterID: string }}
 */
function getCharFromQuery() {
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

  return { server, characterID }
}

/**
 * @param {string} id
 * @returns {string}
 */
function getCharacterName(id) {
  const nameElement = document.querySelector(`div[data-id="${id}"]`).innerText

  return nameElement
}

/**
 * @returns {{ level: string, job: string }}
 */
function getLevelAndJob() {
  let [level, job] = document
    .querySelector('div#char_info')
    .innerText.split('|')
    .map((s) => s.trim())

  level = level.replace('Lv.', '')

  return {
    level,
    job
  }
}

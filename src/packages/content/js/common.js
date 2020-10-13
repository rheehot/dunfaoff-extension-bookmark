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

  // 수집 실패
  if (!server && !characterID) {
    server = document
      .querySelector('div#char_server')
      .className.split('serverId-')[1]
    characterID = document.querySelector('div#char_name').dataset.id
  }

  return { server, characterID }
}

/**
 * @param {string} id
 * @returns {string}
 */
function getCharacterName() {
  const nameElement = document.querySelector(`div#char_name`).innerText

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

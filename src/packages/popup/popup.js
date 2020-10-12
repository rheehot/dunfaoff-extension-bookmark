Object.prototype.isEmpty = function () {
  return Object.keys(this).length === 0
}

function fetchItems() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, (items) => {
      if (items.isEmpty()) {
        reject('No Item')
      } else {
        resolve(items)
      }
    })
  })
}

fetchItems()
  .then((items) => console.log(items))
  .catch((error) => console.error(error))

fetch("src/collections.json")
    .then(res => res.json())
    .then(str => localStorage.setItem('collections', JSON.stringify(str)));
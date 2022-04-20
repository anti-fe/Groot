console.log(document.location.pathname);
if(!localStorage.getItem('collections')) {
    if(window.location.pathname == '/index.html') {
        reqCollection("./src/collections.json");
    } else {
        reqCollection("../collections.json");
    }
}

function reqCollection(path) {
    fetch(path)
    .then(res => res.json())
    .then(str => localStorage.setItem('collections', JSON.stringify(str)));
}
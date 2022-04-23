const winLoc = window.location.pathname;
if(!localStorage.getItem('collections')) {
    const winLoc = window.location.pathname;
    if(winLoc == '/index.html' || winLoc == '/Groot/index.html') {
        reqCollection("src/collections.json");
    } else if(winLoc == '/Groot/src/pages/catalog.html' || winLoc == '/src/pages/catalog.html' ||
    winLoc == '/src/pages/admin-profile.html' || winLoc == '/Groot/src/pages/admin-profile.html') {
        reqCollection("../collections.json");
    }
}

function reqCollection(path) {
    fetch(path)
    .then(res => res.json())
    .then(str => localStorage.setItem('collections', JSON.stringify(str)));
}
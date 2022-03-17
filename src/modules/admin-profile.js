function createArticle() {
    const articlePattern = 'qwertyuiopasdfghjklzxcvbnm123456789QWERTYUIOASDFGHJKLZXCVBNM#@$%&!';
    let articleText = '';

    for (var i = 0; i < 8; i++) {
        articleText += articlePattern.charAt(Math.floor(Math.random() * articlePattern.length));
    }
    return articleText;
}
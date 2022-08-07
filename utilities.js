function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function isProbable(chanceInPercents) {
    return getRandomInt(100) < chanceInPercents;
}

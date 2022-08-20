function getRandomInt(min, max) {
    return max
        ? min + Math.floor(Math.random() * (max - min))
        : Math.floor(Math.random() * min);
}

function isProbable(chanceInPercents) {
    return getRandomInt(100) < chanceInPercents;
}

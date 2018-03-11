const randomizer = {
    pickOne(array){
        return array[this.int(0, array.length - 1)]
    },
    int(low, high){
        return Math.round(Math.random() * (high - low) + low);
    },
    chance(percentage){
        return this.int(0, 99) < percentage;
    }
};

export {randomizer}
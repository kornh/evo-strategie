var config = {
    spectrum:{
        interval:[-40,40],
        max: 40
    },
    population:{
        size: 25,
        dimension: 6
    },
    function:{
        a: 20,
        b: 0.2,
        c: 2 * Math.PI,
        d: 6
    },
    search:{
        generations: 1000000,
        min_value: 0.001
    },
    mutation: {
        sigma: 1
    }
}
module.exports = config;
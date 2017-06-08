var util = require('./util'),
    config = require('./config');

var randgen = require('randgen');


var seven = (P, mutation, method) => {
    var sigma = config.mutation.sigma;
    var C = [];
    for(var i = 0; i<P.size; i++){
        for(var j = 0; j<7; j++){
            var e = util.copy(P.member[i]);
            var c = mutation(e, sigma)
            C.push(c);
        }
    }
    return method(P, C);
}

var plus = (P, C) => {
    P.member = P.member.concat(C);
    P.size = util.sizeOf(P.member);
    return P;
}

var komma = (P, C) => {
    P.member = C;
    P.size = util.sizeOf(P.member);
    return P;
}

var gauss = (E, sigma) => {
    var len = util.sizeOf(E.chromosome);
    var max = config.spectrum.max;
    E.value = null;
    E.fitness = null;

    for(var i = 0; i<len; i++){
        var u = randgen.rnorm(0, sigma);
        E.chromosome[i] += u;
        E.chromosome[i] = Math.max(E.chromosome[i], -max)
        E.chromosome[i] = Math.min(E.chromosome[i], max)
    }
    return E;
}

var sagauss = (E, sigma) => {
    var len = util.sizeOf(E.chromosome);
    var max = config.spectrum.max;
    var u = randgen.rnorm(0, 1);
    E.sigma = E.sigma * Math.exp(u / Math.sqrt(len));
    E.value = null;
    E.fitness = null;

    for(var i = 0; i<len; i++){
        var u = randgen.rnorm(0, E.sigma);
        E.chromosome[i] += u;
        E.chromosome[i] = Math.max(E.chromosome[i], -max)
        E.chromosome[i] = Math.min(E.chromosome[i], max)
    }
    return E;
}

module.exports = {
    seven: seven,
    gauss: gauss,
    sagauss: sagauss,
    plus: plus,
    komma: komma
}
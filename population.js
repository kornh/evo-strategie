var util = require('./util'),
    encoding = require('./encoding'),
    grey = require('./grey'),
    config = require('./config');

var create = () => {
    var size = config.population.size;
    var dimension = config.population.dimension;
    var spectrum = config.spectrum.max;

    var M = [];
    for(var i = 0; i<size; i++){
        var val = util.rndArray(dimension, spectrum);
        var c = {chromosome: val, sigma: 1};
        M.push(c);
    }
    
    var P = {
        size: size,
        dimension: dimension,
        member: M
    };

    return P;
}

var calcFit = (P, fits) => {
    var len = util.sizeOf(P.member);
    var F = [];
    for(var i = 0; i<len; i++){
        F[i] = fits(P.member[i]);
    }
    return F;
}

var fitness = (P, f) => {
    
    var fit_1 = (c) => f(c.chromosome);
    var F = calcFit(P, fit_1);
    var max = Math.max(...F);
    
    var fit_2 = (c) => max - fit_1(c);
    var Fs = calcFit(P, fit_2);

    for(var i = 0; i<P.size; i++){
        P.member[i].value = F[i];
        P.member[i].fitness = Fs[i];
    }
    return P;
}

var selection = (P) => {
    var top = config.population.size;
    P.member.sort((a,b) => {
        return b.fitness - a.fitness;
    });
    P.member = P.member.splice(0,top)
    P.size = util.sizeOf(P.member);
    return P;
}

var get_best = (P, f) => {
    var val = util.copy(P.member);
    val = fitness({member: val}, f).member;
    val = val.splice(0,1)[0];
    return val;
}

module.exports = {
    create:create,
    fitness: fitness,
    selection: selection,
    get_best: get_best
}
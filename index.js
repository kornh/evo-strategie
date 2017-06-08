var population = require('./population'),
    mutation = require('./mutation'),
    config = require('./config');

var f = require('./function'),
    gauss = mutation.gauss,
    sagauss = mutation.sagauss,
    plus = mutation.plus,
    komma = mutation.komma
    ;

var run = () => {
    var best = Infinity;
    var bestC = null;
    var counter = 100;
    var method = plus;

    var P = population.create();
    P = population.fitness(P, f);
    
    for(var i = 0; i<config.search.generations; i++){
        P = mutation.seven(P, sagauss, method);
        P = population.fitness(P, f);
        P = population.selection(P);

        var C = population.get_best(P, f);
        if(C.value < best){
            best = C.value;
            bestC = C;
            counter = 100;
            method = plus;
        }else{
            counter--;
            if(counter == 0){
                method = komma;
                best = C.value;
            }
        }
        if(C.value < config.search.min_value) break;

        console.log((method == plus?"P":"K") + i + ":" +C.value /*+ " <- [" + C.chromosome + "]"*/)
    }
    console.log('Best solution: ');
    console.log(bestC)
}

run();
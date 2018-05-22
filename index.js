var datapump = require('datapumps');
CsvWriterMixin = datapump.mixin.CsvWriterMixin;
var pump = new datapump.Pump();
pump
    .mixin(datapump.mixin.RestMixin)
    .from(pump.createBuffer())
    .get('https://afd662d3.eu.ngrok.io/organization/plaza', {
        "headers":{
            //Aca va el domain del workspace
            "wp":"basehcm"
        },
        "multipart": false,
        "query": {
            "cantidad":'{">":"2"}'
        }
    })
    .then(function(result) {
        console.log(result);
        //Resultado de llamada a API
        for(let i in result.result){
            //Por cada resultado escribir en csv
            pump.from().write(result.result[i]);
        }
        pump.from().seal();
    });

pump
    .mixin(CsvWriterMixin({
        path:'/tmp/ejemplo.csv',
        headers:['Id', 'Nombre']
    }))
    .process(function(result) {
        return pump.writeRow([ result._id, result.nombre ]);
    })
    .logErrorsToConsole()
    .run()
    .then(function() {
        console.log("Done writing to file");
    });
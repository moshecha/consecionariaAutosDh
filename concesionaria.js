const autos = require('./autos')

let concesionaria = {
   autos: autos,
 
   buscarAuto: function (patenteBuscada){
    let indiceEncontrado = null
    autos.forEach(function(valor,indice){
        if (valor.patente == patenteBuscada){indiceEncontrado += indice;}
        })
        return indiceEncontrado
   },

   venderAuto:function(patenteVendida){
       let newListaAutos=[]
       let patenteEncontrada = this.buscarAuto(patenteVendida)
       autos.forEach(function(valor,indice){
        if(indice==patenteEncontrada){valor.vendido=true;newListaAutos.push(valor)}
        else {newListaAutos.push(valor)}
       })
       return newListaAutos
},

autosParaLaVenta: function(){
    let noVendidos=autos.filter(function(valor){return valor.vendido==false})
    return noVendidos
},

autosNuevos: function(){
    let paraLaVenta=this.autosParaLaVenta()
    let autos0km=paraLaVenta.filter(function(valor){return valor.km<100})
    return autos0km
},

listaDeVentas:function(){
    let autosVendidos = autos.filter(function(valor){return valor.vendido==true})
    let precioDeAutosVendidos=[]
    autosVendidos.forEach(function(valor,indice){precioDeAutosVendidos.push(valor.precio)})
    return precioDeAutosVendidos
},

totalDeVentas:function(){
    let vendidos = this.listaDeVentas()
    let sumatoria = vendidos.reduce(function(acumulador,valor){return acumulador+=valor;},0)//se le pone el ,0 para que inicialmente comience en 0
    return sumatoria
},

puedeComprar:function(auto,persona){
    let cuotasOk = auto.precio / auto.cuotas <= persona.capacidadDePagoEnCuotas
    return auto.precio <= persona.capacidadDePagoTotal && cuotasOk

},

autosQuePuedeComprar:function(persona){
    let autosOk = []
    let autosParaLaVenta = this.autosParaLaVenta()
    autosParaLaVenta.forEach(function(valor,indice){
        if(concesionaria.puedeComprar(valor,persona)){autosOk.push(valor)}
    })
    return autosOk
}

   
}



let persona={
    nombre: 'Juan',
    capacidadDePagoEnCuotas: 30000,
    capacidadDePagoTotal: 100000
    }

//console.log
//concesionaria.venderAuto('APL123')
//console.log
concesionaria.venderAuto('JJK116')

//console.log(concesionaria.puedeComprar(autos[1],persona))
//console.log(concesionaria.autosQuePuedeComprar(persona))

//console.log(concesionaria.autosParaLaVenta())
console.log(concesionaria.totalDeVentas())
console.log(concesionaria.listaDeVentas())
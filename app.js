// Variables
let contadorMovimientos = null
let contadorAciertos = null
let cartaUno = null;
let cartaDos = null;
let valorCartaUno = null;
let valorCartaDos = null;
let cartasDestapadas = null;
let contadorTiempo = 40;
let temporizador = false;
let tiempoRegresivo = null;


// Apuntadores a documento
let movimientos = document.getElementById("movimientos")
let aciertos = document.getElementById("aciertos")
let tiempo = document.getElementById("tiempo")
let click = new Audio('./sound/click.wav')
let gameOver = new Audio('./sound/gameOver.wav')
let final = new Audio('./sound/finally.wav')
let winner = new Audio('./sound/winner.wav')
let clickError = new Audio('./sound/clickError.wav')
let clickAcertado = new Audio('./sound/clickAcertado.wav')


// Numeros aleatorios
let Array = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
//let ArrayLevelTwo = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12] 
Array = Array.sort(()=>
    {return Math.random()-0.5}
);
console.log(Array);


function contarTiempo() {
    tiempoRegresivo = setInterval(()=>{
        contadorTiempo--;
        tiempo.innerHTML = `Tiempo: ${contadorTiempo} segundos`

        if(contadorTiempo >= 1 && contadorTiempo <= 5){
            final.play()
        }

        if(contadorTiempo == 0){
            tiempo.innerHTML = `Suerte para la proxima 😭😔`
            clearInterval(tiempoRegresivo)
            gameOver.play()

            for(let i = 0; i < 16; i++){
                let cartaBloqueada = document.getElementById(i)
                cartaBloqueada.innerHTML = `<img src="./images/Nivel1/${Array[i]}.png">`
                cartaBloqueada.disabled = true
            }
        }

    },1000)
}


function mostrarCarta(id) {

    if(!temporizador) {
        contarTiempo()
        temporizador = true
    }

    cartasDestapadas += 1
    contadorMovimientos += 1
    movimientos.innerHTML = `Movimientos:${contadorMovimientos}`
    console.log("Cartas destapadas: "+cartasDestapadas)

    if(cartasDestapadas == 1){
        cartaUno = document.getElementById(id)
        cartaUno.innerHTML = `<img src="./images/Nivel1/${Array[id]}.png">`
        valorCartaUno = Array[id]
        cartaUno.disabled = true;
        console.log("Valor: "+valorCartaUno);
        click.play()
    }else if(cartasDestapadas == 2){
        cartaDos = document.getElementById(id)
        cartaDos.innerHTML = `<img src="./images/Nivel1/${Array[id]}.png">`
        valorCartaDos = Array[id]
        cartaDos.disabled = true;
        console.log("Valor: "+valorCartaDos)


        if(valorCartaUno == valorCartaDos) {
            clickAcertado.play()
            cartasDestapadas = 0
            contadorAciertos += 1
            aciertos.innerHTML = `Aciertos:${contadorAciertos}`
            console.log("Coincidencia encontrada")

            if(contadorAciertos == 8) {
                clearInterval(tiempoRegresivo)
                tiempo.innerHTML = `Felicidades eres un ganador 🥳💪`
                winner. play()
            }
        }else{
            clickError.play()
            setTimeout(()=>{
                cartasDestapadas = 0
                cartaUno.innerHTML = ' '
                cartaDos.innerHTML = ' '
                cartaUno.disabled = false
                cartaDos.disabled = false
            },1000)
        }
    }

    
}


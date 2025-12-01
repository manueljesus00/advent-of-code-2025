const fs = require('fs');
const path = require('path');

const MODULO = 100;
const POSINICIAL = 50;
const META = 0;


function resolverPuzzle(){
    // 1. Leemos el fichero
    const rutaFichero = path.join(__dirname, 'input.txt');
    try{
        const contenido = fs.readFileSync(rutaFichero, 'utf-8');
        let instrucciones: string[] = contenido.split(/\r?\n/).filter((linea: string) => linea.trim());
        let posActual = POSINICIAL;
        let contadorCeros = 0;

        // 2. Procesamos cada linea
        for(const instruccion of instrucciones){
            const direccion = instruccion[0];
            const cantidad = parseInt(instruccion.substring(1), 10);
            // 3. Aplicamos la rotacion
            if(direccion === 'R')
                posActual += cantidad;
            else if(direccion === 'L')
                posActual -= cantidad;
            
            // 4. Normalizamos para rango 0 - 99
            posActual = ((posActual % MODULO) + MODULO) % MODULO;
            // 5. Comprueba si esta en 0
            if(posActual === META)
                contadorCeros++;
        }
        console.log(`--- RESULTADO ---`);
        console.log(`Posicion final del dial: ${posActual}`);
        console.log(`PASSWORD (Veces en 0): ${contadorCeros}`);
    } catch (error){
        console.error('Error en el procesado del fichero: ', error);
    }
}

function resolverPuzzleParte2(){
    const rutaFichero = path.join(__dirname, 'input.txt');
    try{
        const contenido = fs.readFileSync(rutaFichero, 'utf-8');
        let instrucciones: string[] = contenido.split(/\r?\n/).filter((linea: string) => linea.trim());
        let posActual = POSINICIAL;
        let totalPassword = 0;
        
        for(const instruccion of instrucciones){
            const direccion = instruccion[0];
            const cantidad = parseInt(instruccion.substring(1), 10);

            const vueltasCompletas = Math.floor(cantidad / MODULO);
            totalPassword += vueltasCompletas;

            let movimientoRestante = cantidad % MODULO;

            for(let i = 0; i < movimientoRestante; i++){
                if(direccion === 'R')
                    posActual++;
                else if(direccion === 'L')
                    posActual--;
                posActual = ((posActual % MODULO) + MODULO) % MODULO;
                if(posActual === META)
                    totalPassword++;
            }
        }
        console.log(`--- RESULTADO PARTE 2 ---`);
        console.log(`Posicion final del dial: ${posActual}`);
        console.log(`PASSWORD (Veces que pasa por 0): ${totalPassword}`);
    } catch (error){
        console.error('Error en el procesado del fichero: ', error);
    }
}

//resolverPuzzle();
resolverPuzzleParte2();
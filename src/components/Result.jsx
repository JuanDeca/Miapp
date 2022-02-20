import React, { useState, useEffect, Fragment } from 'react';

const Result = ({conjuntoactual, calcular, setCalcular}) => {

    const [ resultado, setResultado ] = useState({
        result: '', array1: [],
    })

    const [ mostrarresult, setMostrarresult ] = useState(false)

    var arrayresto = []

    let result = 0
    
    useEffect(() => {
        if ( calcular === true ) {
            const opera = (conjuntoactual) => {
                console.log('opera activada')

                let params2 = conjuntoactual.arran.length

                let params = []

                for( let x = 0; x < params2; x++ ) {
                    params[x] = conjuntoactual.arran[x].cantidadActual / conjuntoactual.arran[x].cantidadp1
                }
                
                result = (Math.floor(Math.min(...params)))

                let i = 0
                
                while( i < params2 ) {
                    let z = conjuntoactual.arran[i].cantidadActual - result * conjuntoactual.arran[i].cantidadp1
                    arrayresto = [...arrayresto, { z, mate: conjuntoactual.arran[i].name }]
                    i++
                }

                setResultado({
                    array1: arrayresto,
                    result: result
                })

                setMostrarresult(true)
            }
            opera(conjuntoactual)
            setCalcular(false)
        }
    }, [calcular])
    

    return (
        <Fragment>
            {mostrarresult ? (
                <div className="containerresult">
                    <h3>El valor ingresado es suficiente para: <br/><span>{resultado.result} Conjuntos<span/></span></h3>
                    <ul><span>Sobran:</span>{ 
                        resultado.array1.length === 0  
                        ?   'No hay resto'
                        :   (
                            resultado.array1.map( resta => <li key={Math.random()*10000}>{resta.z} de {resta.mate}</li> )
                        )
                        }
                    </ul>
                </div> 
                    )  
                : null
            }
        </Fragment>
     );
}
 
export default Result;
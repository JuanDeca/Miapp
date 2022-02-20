import React, { Fragment, useState } from 'react'
import Result from './Result'

const Form = ({materiales, conjuntos}) => {

    const [ error, setError ] = useState(false)

    const [ mostrarResult, setmostrarResult ] = useState(false)

    const [ calcular, setCalcular ] = useState(false)

    const [ conjuntoactual, setConjuntoactual ] = useState({
        arran: []
    })

    const elegirConjunto = (e) => {
        e.preventDefault()

        console.log(conjuntos.filter(conjunto => conjunto.name === e.target.value))

        let a = conjuntos.filter(conjunto => conjunto.name === e.target.value)
        
        setConjuntoactual(a[0])
    }

    const actualizarState = (e) => {
        for ( let i = 0; i < conjuntoactual.arran.length; i++ ) {
            if ( conjuntoactual.arran[i].name === e.target.name ) {
                conjuntoactual.arran[i].cantidadActual = parseInt(e.target.value)
            }
        }
    }

    const Submit = e => {
        e.preventDefault()
        setError(false) 

        setConjuntoactual(conjuntoactual)

        setCalcular(true)

        setmostrarResult(true)
    }

    const mostrarh1 = () => {
        if (conjuntos.length < 1) {
            return <h1>Bienvenido<br/>Para empezar, creá un conjunto nuevo</h1>
        } else {
            return <h1>Elegí un conjunto para continuar</h1>
        }
    }

    return (
        <Fragment>
            <div className="containerform">
                     { conjuntoactual.name === undefined 
                    ? (
                        mostrarh1()
                        ) 
                    : (
                        <>
                            <h1>{conjuntoactual.name}</h1>
                            <form>
                                { conjuntoactual.arran.map(material => (
                                    <Fragment key={material.id}>
                                            <label>Cantidad de {material.name}</label>
                                            <input
                                                type="number"
                                                placeholder="..."
                                                onChange={actualizarState}
                                                name={material.name}
                                                value={materiales.cantidadActual}
                                                />
                                    </Fragment> ) ) }
                            </form>
                        </>
                    ) } 
                    { conjuntos.length < 1 ? null : (
                <div className="input">
                        <select onChange={(elegirConjunto)}>
                            <option>- Seleccionar Nuevo Conjunto -</option>
                            { conjuntos.map(conjunto => (
                                <option key={Math.random()*10000} value={conjunto.name}>{conjunto.name}</option>
                            ))}
                        </select>
                    { conjuntoactual.name === undefined 
                        ?    null
                        :   <input
                        type="submit"
                        className="btnm btn"
                        onClick={Submit}
                        value="Calcular"
                        />
                    }
                </div>
                        ) }
                { mostrarResult ? (
                    <Result
                        conjuntoactual={conjuntoactual}
                        calcular={calcular}
                        setCalcular={setCalcular}
                    />
                ) : null }
            </div>
            { error ? 
            <h1 className="alert alert-danger error">Error: No ingresaste todos los valores</h1> 
            : null }
        </Fragment>
     );
}
 
export default Form;
import React, { useState } from 'react'

const Change = ({materiales, conjuntos, setConjuntos}) => {

    const [ mostrarac, setMostrarac ] = useState(false)

    const [ error, setError ] = useState(false)
    const [ error2, setError2 ] = useState(false)

    const [ forma, setForma ] = useState([
        { id: 0.1, name: '' }
    ])

    const [ newconjunto, setNewconjunto] = useState({
        name: '',
        id: '',
        arran: [
            {}
        ]
    })

    const mostraracon = () => {
        if ( materiales.length < 1 ) {
            setError(true)
            return
        }
        setError(false)
        if (mostrarac) {
            setMostrarac(false)
        } else {
            setMostrarac(true)
        }
    }

    /*   -------------------   */

    const eliminarForm = (id) => {
        let formsNuevos = forma.filter( form => form.id !== id)
        setForma(formsNuevos)
    }

    const agregarForm = () => {
        setForma([...forma, {
            id: Math.random()
        }])
    }

    /*   -------------------   */

    const actualizarStatenumber = e => {
        for ( let x = 0; x < forma.length; x++) {
            if (forma[x].id == e.target.id ) {
                forma[x] = {
                    ...forma[x],
                    cantidadp1: e.target.value
                }
            }
        }
        setNewconjunto({
            ...newconjunto,
            arran: forma
        })
    }

    const actualizarStatename = (e) => {
        for ( let i = 0; i < forma.length; i++ ) {
            if ( forma[i].id == e.target.id ) {
                forma[i] = {
                    ...forma[i],
                    name: e.target.value,
                    id: Math.random()
                }
            }
        }
        setNewconjunto({
            ...newconjunto,
            arran: forma
        })
    }

    const actualizarState = (e) => {
        setNewconjunto({
            ...newconjunto,
            name: e.target.value,
            id: Math.random()
        })
    }

    /*   -------------------   */

    const eliminarCon = (id) => {
        let Connuevos = conjuntos.filter(con => con.id !== id)
        setConjuntos(Connuevos)
        console.log(conjuntos)
    }

    const submitConjunto = (e) => {
        e.preventDefault()
        if (newconjunto.name.trim() === '') {
            setError2(true)
            return
        }
        setError2(false)

        setConjuntos([...conjuntos, newconjunto])
        console.log(conjuntos)

        let newformas = forma.filter(form => form.id === 0 )
        setForma([newformas])

        setMostrarac(false)
    }

    return (
        <>
            { mostrarac ? (

                <div className="conjunto">
                    <div className="ti">
                        <h3>Nuevo Conjunto</h3>
                        <input
                            type="text"
                            placeholder="Nombre del conjunto nuevo"
                            onChange={actualizarState}
                        />
                        { error2 ? (<h1 className="msg">Necesitás un nombre para el conjunto</h1>) : (null) }
                    </div>
                    <div className="forms">
                        {
                            forma.map(form =>
                                <form 
                                    className="conjuntoform" 
                                    id={form.id}
                                    name="name"
                                >
                                    <select onChange={actualizarStatename} id={form.id}>
                                        <option value="">-Seleccionar Material-</option>
                                        { materiales.map( material => (
                                            <option 
                                                key={material.id}
                                                id2={form.id}
                                            >{material.name}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        id={form.id}
                                        placeholder="Cantidad para fabricar 1"
                                        onChange={actualizarStatenumber}
                                    />
                                    <input
                                        type="submit"
                                        value="Borrar"
                                        className="btn anger"
                                        onClick={() => eliminarForm(form.id)}
                                    />
                                </form>
                            )    
                        }
                    </div>
                    <div className="inputs">
                        <input
                            className="btnm btx"
                            type="submit"
                            value="Volver"
                            onClick={mostraracon}
                        />
                        <input
                            className="btnm btx"
                            type="submit"
                            value="Agregar material"
                            onClick={agregarForm}
                        />
                        <input
                            className="btnm btx"
                            type="submit"
                            value="Terminado"
                            onClick={submitConjunto}
                        />
                    </div>
                </div> ) : (
                    <div className="conjuntosact">
                        <h2>Conjuntos Actuales</h2>
                            {   conjuntos.length > 0 ?
                                (<ul>{ 
                                    conjuntos.map(conjunto => (
                                        <div><li key={conjunto.id}>{conjunto.name}</li>
                                        <input type="submit" className="xborrar" value="X" onClick={() => eliminarCon(conjunto.id)}/></div>
                                ) ) 
                                }</ul>) : (
                                    error
                                        ?    <h1 className="msg">Antes de crear conjuntos nuevos tenés que hacer materiales</h1>
                                        :    <span className="span">No tenés ningun conjunto guardado</span>
                                )
                            }
                        <input
                            className="btnm"
                            type="submit"
                            value='Agregar Conjunto'
                            onClick={mostraracon}
                        />
                    </div>
                )
            }
        </>
     );
}
 
export default Change;
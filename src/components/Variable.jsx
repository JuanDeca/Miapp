import React, { useState } from 'react'

const Variable = ({setMateriales, materiales}) => {

    const [ error, setError ] = useState(false)

    const [ amat, setAmat ] = useState(false)

    const [ nombre, setNombre ] = useState('')

    const [ name, setName ] = useState('Agregar Material')

    const actualizarState = (e) => {
        setNombre(e.target.value)
    }

    const eliminarMate = (id) => {
        let matesnuevos = materiales.filter(mate => mate.id !== id)
        setMateriales(matesnuevos)
        console.log(materiales)
    }

    const submitMaterial = (e) => {
        e.preventDefault()
        if ( nombre.trim() === '' ) {
            setError(true)
            return
        }
        let a = materiales.filter(mat => mat.name !== nombre)
        console.log(a)
        setError(false)
        setMateriales([...materiales, { name: nombre, id: Math.random() }])
        setNombre('')
        setAmat(false)
        mostrarAmat()
        const divc = document.getElementById('containervariable')
        divc.classList.remove('griddiv')
    }

    const mostrarAmat = () => {
        if (!amat) {
            setName('Cancelar')
            setAmat(true)
            const divc = document.getElementById('containervariable')
            divc.classList.add('griddiv')
        } else {
            setName('Agregar Material')
            setAmat(false)
            const divc = document.getElementById('containervariable')
            divc.classList.remove('griddiv')
        }
    }

    return (
        <div className="containervariable" id="containervariable">
            { amat ? ( 
                <div className="variablediv"> 
                    <h3>Nuevo Material</h3>
                    <form className="variable">
                        <label>Nombre del material</label>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={actualizarState}
                        />
                    </form>
                    { error ? <span className="errorvar">Debes ingresar un nombre para continuar</span> : null}
                    <input
                        className="btnm"
                        type="submit"
                        value="Agregar"
                        onClick={submitMaterial}
                    />
                </div> )
                : null
                }
            <div className="variablesact">
                <h2>Materiales Actuales</h2>
                {   materiales.length > 0 ?
                        (<ul>
                            { materiales.map((material => (
                                <div><li key={material.id}>{material.name}</li>
                                <input type="submit" className="xborrar" value="X"
                                onClick={() => eliminarMate(material.id)}/></div>
                            ))) }
                        </ul>) : (
                            <h1 className="span">No tenés ningun Material guardado</h1>
                        )
                }
                <input
                    className="btnm"
                    type="submit"
                    value={name}
                    onClick={mostrarAmat}
                />
            </div>
        </div>
     );
}
 
export default Variable;
import React, { useEffect, useState } from 'react';
import Conjunto from './components/Conjunto'
import Variable from './components/Variable';
import Form from './components/Form'
import { FORM, VARIABLE, CONJUNTO } from './types'


function App() {

    //Conjuntos en local storage
    let conjuntosIniciales = JSON.parse(localStorage.getItem('conjuntos'))
    let materialesIniciales = JSON.parse(localStorage.getItem('materiales'))
    
    if(!conjuntosIniciales) {
        conjuntosIniciales = []
    }
    if(!materialesIniciales) {
        materialesIniciales = []
    }

    const [ conjuntos, setConjuntos ] = useState(conjuntosIniciales)
    const [ materiales, setMateriales ] = useState(materialesIniciales)

    useEffect( () => {
      if(conjuntosIniciales) {
        localStorage.setItem('conjuntos', JSON.stringify(conjuntos))
      } else {
        localStorage.setItem('conjuntos', JSON.stringify([]))
      }
    }, [conjuntos, conjuntosIniciales])

    useEffect( () => {
        if(materialesIniciales) {
          localStorage.setItem('materiales', JSON.stringify(materiales))
        } else {
          localStorage.setItem('materiales', JSON.stringify([]))
        }
      }, [materiales, materialesIniciales])

    /*   -------------------   */

    const [ calcular, setCalcular ] = useState(FORM)

    /*   -------------------   */

    const cambiarColor = (li) => {
        document.getElementById('li').classList.remove('cn')
        document.getElementById('li2').classList.remove('cn')
        document.getElementById('li3').classList.remove('cn')
        li.classList.add('cn')
    }

    const mostrarMenu = () => {
        switch (calcular) {
            case FORM: 
                return (<Form
                            materiales={materiales}
                            conjuntos={conjuntos}/>)
            case VARIABLE:
                return (<Variable
                            materiales={materiales}
                            setMateriales={setMateriales}/>)
            case CONJUNTO:
                return (<Conjunto
                            materiales={materiales}
                            conjuntos={conjuntos}
                            setConjuntos={setConjuntos}/>)
            default: return
        }
    }

    return (
        <div className="back">
            <div className="container">
                <section className="left">
                        <h1 className="tittle">Miapp</h1>
                        <ul>
                            <li className="btnn btn cn" id="li" onClick={() => { setCalcular(FORM)
                             cambiarColor(document.getElementById('li')) }}
                                >Inicio</li>
                            <li className="btnn btn" id="li3" onClick={() => { setCalcular(CONJUNTO)
                             cambiarColor(document.getElementById('li3')) }}
                                >Conjuntos</li>
                            <li className="btnn btn" id="li2" onClick={() => { setCalcular(VARIABLE)
                             cambiarColor(document.getElementById('li2')) }}
                                >Materiales</li>
                        </ul>
                    </section>
                <div className="bottom">
                    <section className="menu">
                        { mostrarMenu() }
                    </section>
                </div>
            </div>
        </div>
    );
}

export default App;

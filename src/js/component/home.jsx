import React, { useState, useEffect } from "react"

const Home = () => {

    const [nameValue, setNameValue] = useState("")

    const mostrarNameValue = () => {
        console.log(nameValue);
    }



    return (
        <div>
            <h1>Todo list</h1>
            <input onChange={(e) => setNameValue(e.target.value)} /> {/*Actualiza nameValue cuando cambia el input*/}
            <button onClick={mostrarNameValue}>Mostrar Valor</button> {/* Llama a mostrarNameValue al hacer clic */}

        </div>

    )

}

export default Home
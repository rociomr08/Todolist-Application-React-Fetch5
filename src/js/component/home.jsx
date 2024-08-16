import React, { useState, useEffect } from "react"

const Home = () => {

    const [nameValue, setNameValue] = useState("")
    const [userList, setUsersList] = useState([])
    const [switchGetList, setswitchGetList] = useState(false)
    const [taskList, setTaskList] = useState([])
    const [task, setTask] = useState([])

    //Para verificar que esta imprimiendo el input que fue seteado con el onChange y el setNameValue
    // const mostrarNameValue = () => {
    //     console.log(nameValue);//muestra el valor del input value luego del onchange 
    // }

    const createUser = () => {
        if (nameValue === "") {
            return
        }
        fetch(`https://playground.4geeks.com/todo/users/${nameValue}`, {
            method: "POST"
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.name) {
                    setswitchGetList(prev => !prev)
                    setNameValue("")
                }
            })
    }

    const deleteUser = () => {
        fetch(`https://playground.4geeks.com/todo/users/${nameValue}`, {
            method: "DELETE"
        })
            .then((response) => {
                // console.log(response)
                if (response.ok) {
                    setswitchGetList(prev => !prev)
                    setNameValue("")
                }
            })

    }

    const getTaskListFromUser = () => {
        fetch(`https://playground.4geeks.com/todo/users/${nameValue}`)
            .then((response) => response.json())
            .then((data) => {
                setTaskList(data.todos)
            })

    }

    const getUsersList = () => {//guarda la lista de personas en una lista
        fetch("https://playground.4geeks.com/todo/users")
            .then((response) => response.json())
            .then((data) => {
                setUsersList(data.users)
            })

    }

    const createNewTask = (e) => {
        if (e.key === "Enter") {
            fetch(`https://playground.4geeks.com/todo/users/${nameValue}`, {
                method: "POST",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "label": task,
                    "is_done": false

                })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.label) {
                        setTaskList([...taskList, data])
                        setswitchGetList(prev => !prev)
                        setTask("")
                    }
                })
        } else {
            return
        }
    }

    useEffect(() => {
        getUsersList() // De forma automatica Apenas se ejecuta el componente Home Llama y ejecuta la funcion getUserList y se guarda en una array de un estado local "userList" 
    }, [switchGetList])//useEffect cuando ve que  switchGetList cambia de false a true y de true a false va forzar que obtenga nuevamente la lista



    return (
        <div>
            <h1>Todo list</h1>
            <input onChange={(e) => {
                setNameValue(e.target.value);
                console.log(e.target.value)
            }} value={nameValue} /> {/*Actualiza nameValue cuando cambia el input  // Imprime el valor actual del input justo cuando ocurre el cambio*/}
            {/* <button onClick={mostrarNameValue}>Mostrar Valor</button> al hacer click llama a mostrarNameValue al hacer clic */}
            <button onClick={createUser}>Create Usuario</button> {/* Al hacer click llama a createUser al hacer clic */}
            <button onClick={deleteUser}>Eliminar Usuario</button> {/*Al hacer click llama a deleteUser al hacer clic */}
            <button onClick={getTaskListFromUser}>Conseguir Lista de {nameValue}</button> {/*Al hacer click llama a getListr al hacer clic */}
            <h4>Lista de Usuarios</h4>
            {
                userList.map((item, index) => {
                    return (
                        <div key={index} >
                            <label htmlFor="">{item.name}</label>
                        </div>
                    )
                })
            }
            <h4>Lista de Tareas de {nameValue}</h4>

            <input onChange={(e) => setTask(e.target.value)} onKeyDown={createNewTask} value={task} />

            <ul>
                {
                    taskList.map((item) => {
                        return (
                            <div key={item.id} >
                                <li key={item.id}>{item.label}</li>
                                <button onClick={() => deleteTask(item.id)} >x</button>
                            </div>

                        )
                    })
                }
            </ul>

        </div>
    )
}

export default Home
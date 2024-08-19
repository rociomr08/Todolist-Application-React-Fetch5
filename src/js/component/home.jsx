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

    const getUsersList = () => {//guarda la lista de personas en una lista
        fetch("https://playground.4geeks.com/todo/users")
            .then((response) => response.json())
            .then((data) => {
                setUsersList(data.users)
            })

    }

    const getTaskListFromUser = () => {
        fetch(`https://playground.4geeks.com/todo/users/${nameValue}`)
            .then((response) => response.json())
            .then((data) => {
                setTaskList(data.todos)
            })

    }

    const createNewTask = (e) => {
        if (e.key === "Enter") {
            fetch(`https://playground.4geeks.com/todo/todos/${nameValue}`, {
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
                        setTask("")
                    }
                })
        } else {
            return
        }
    }

    const deleteTask = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE"
        })
            .then((response) => {
                console.log(response)
                if (response.ok) {

                    let listaFiltrada = taskList.filter((item) => item.id !== id)
                    setTaskList(listaFiltrada)
                }
            })

    }
    const editTask = () => {

    }


    useEffect(() => {
        getUsersList() // De forma automatica Apenas se ejecuta el componente Home Llama y ejecuta la funcion getUserList y se guarda en una array de un estado local "userList" 
    }, [switchGetList])//useEffect cuando ve que  switchGetList cambia de false a true y de true a false va forzar que obtenga nuevamente la lista


    return (
        <div>
            <h2>Users</h2>
            <input type="text" className="form-control  border-0 fw-light fs-3" placeholder="Add your name" onChange={(e) => {
                setNameValue(e.target.value);
                console.log(e.target.value)
            }} value={nameValue} /> {/*Actualiza nameValue cuando cambia el input  // Imprime el valor actual del input justo cuando ocurre el cambio*/}
            {/* <button onClick={mostrarNameValue}>Mostrar Valor</button> al hacer click llama a mostrarNameValue al hacer clic */}
            <button className="btn btn-secondary" onClick={createUser}>Crear Usuario</button> {/* Al hacer click llama a createUser al hacer clic */}
            <button className="btn btn-secondary" onClick={deleteUser}>Eliminar Usuario</button> {/*Al hacer click llama a deleteUser al hacer clic */}
            <button className="btn btn-secondary" onClick={getTaskListFromUser}>Conseguir Lista de {nameValue}</button> {/*Al hacer click llama a getListr al hacer clic */}
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

            {/* <input onChange={(e) => setTask(e.target.value)} onKeyDown={createNewTask} value={task} /> */}

            {/* <ul>
                {
                    taskList.map((item) => {
                        return (
                            <div key={item.id} >
                                <li>{item.label}</li>
                                <button onClick={() => deleteTask(item.id)} >x</button>
                                <button onClick={() => editTask(item.id)} ><i className="fa fa-pencil-square-o"></i></button>
                            </div>

                        )
                    })
                }
            </ul> */}

            <h1 className="text-center mt-5  fw-light " >Todo List {nameValue}</h1>
            <ul className="list-group rounded-0 shadow-lg  mb-5 bg-body-tertiary fw-light fs-3">
                <li className="list-group-item ">
                    <input type="text" className="form-control  border-0 fw-light fs-3" placeholder="What needs to be done?" onChange={(e) => setTask(e.target.value)} value={task} onKeyDown={createNewTask} />
                </li>
                {taskList.length === 0 ? (
                    <li className="list-group-item text-center  fw-light fs-3 ">No hay tareas, añadir tareas</li>
                ) : (
                    taskList.map((item) => {
                        return (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center fs-2">
                                {item.label}
                                <i className="fas fa-trash-alt icon" style={{ color: "red" }} onClick={() => deleteTask(item.id)}></i>
                            </li>
                        )
                    }))
                }
                <li className="text-start list-group-item" >{taskList.length} Tasks</li>
            </ul>
        </div>
    )
}

export default Home
import React, { useState,useEffect } from "react";


//create your first component
//Funcion flecha 
const Home = () => {
	//Se identifican 3 estados 
	const[inputValue,setInputValue]=useState("");
	const[todos,setTodos]=useState([]);

	//Lugar donde se va a guardar los usuarios 
	const[name,setName]=useState("");
	const[usersList,setUsersList]=useState([])

	// Funcion para crear un usuario
	function crearUsuario(){
		fetch(`https://playground.4geeks.com/todo/users/${name}`,{
			method:'POST'
		})
		.then((response)=>response.json())
		.then((data)=>{
			if(data.id){
				alert("Usuario creado con exito")
				getUsers();// Actualizamos la lista de usuarios después de crear uno nuevo
			}else{
				alert("Algo salio mal")
			}
			
		})
		.catch((error)=>console.log(error))
	}


	//Creamos una funcion para conseguir la lista de usuarios usando usseEfect

	const getUsers=()=>{
		fetch('https://playground.4geeks.com/todo/users')
		//cuando se usa metodo GET como este no es necesario escribirlo
		.then((response)=>response.json())
		.then((data)=>{
			setUsersList(data.users)
		})
		.catch((error)=>console.log(error))

	}
	//Funcion para ver la lista de tareas de un usuario especifico

	const getTodosUser=()=>{
		fetch(`https://playground.4geeks.com/todo/${name}`)
		//cuando se usa metodo GET como este no es necesario escribirlo
		.then((response)=>response.json())
		.then((data)=>{
			setTodos(data)
		})
		.catch((error)=>console.log(error))
	}




	useEffect(()=>{
		// Llamamos a la función para obtener los usuarios al cargar el componente
		getUsers()
	},[])

	return (
		<div className="container text-center w-50 fw-light">
			<input type="text" onChange={(e)=>setName(e.target.value)}/>
			<button onClick={crearUsuario}>Crear usuario</button>
			<label htmlFor="">Lista de Usuarios</label>
			{
				usersList.map((item,index)=>{
					return(
						<h5 key={index}>{item.name}</h5>
					)
				})
			}
			<h1 className="text-center mt-5  fw-light " >Todos</h1>
			<ul className="list-group rounded-0 shadow-lg  mb-5 bg-body-tertiary fw-light fs-3">
				<li className="list-group-item ">
					<input type="text" className="form-control  border-0 fw-light fs-3" placeholder="What needs to be done?"
					onChange={e => setInputValue(e.target.value)}
					value={inputValue}
					//evento para las tareas se agregen cuando el usuario presiona enter en el teclado
					onKeyDown={(e)=>{
						// si La tecla Enter fue presionada  y si después de eliminar los espacios en blanco, el texto no esta vacío ->ejecutar lo sgte
						if (e.key==="Enter"&& inputValue.trim() !== ""){
							setTodos(todos.concat([inputValue]));
							setInputValue("");
						};
					}}/>
				</li>
				{todos.length === 0 ? (
					<li className="list-group-item text-center  fw-light fs-3 ">No hay tareas, añadir tareas</li>
				) : (
					todos.map((item, index) => (
						<li key={index} className="list-group-item d-flex justify-content-between align-items-center fs-2">
							{item}
							<i className="fas fa-trash-alt icon" style={{color:"red"}} onClick={()=>setTodos(todos.filter((t,currentIndex)=> index!=currentIndex))}></i>
						</li>
					))
				)}
				<li className="text-start list-group-item" >{todos.length} Tasks</li>
			</ul>
			
		</div>
	);
};

export default Home;

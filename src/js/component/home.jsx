import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState({ label: "", done: false });
	const [items, setItems] = useState([""]);
	const [count, setCount] = useState(0);

	const postData = async () => {

		try {
			const username = `ferrami`;
			const url = `https://assets.breatheco.de/apis/fake/todos/user/${username}`;

			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(items)
			});

			if (!response.ok) {
				throw new Error('Error');
			}

			const result = await response.json();
			console.log('Result:', result);
		} catch (error) {
			console.log('Error:', error)
		}
	};

	const createUser = async () => {

		try {

			const url = `https://assets.breatheco.de/apis/fake/todos/user/ferrami`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify([])
			});
			if (!response.ok) {
				throw new Error('Error request');
			}
			const data = await response.json();
			console.log('Respuesta', data);
		} catch (error) {
			console.log('Error al crear usuario, ya existe :', error);
		}
	};

	const getData = async () => {
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/ferrami"
			);

			const data = await response.json();
			setItems(data);
		} catch (error) {
			console.log(error);
		}

		useEffect(() => {
			if (!createUser) {
				createUser();
			}
			getData();
		}, [])

		useEffect(() => {
			postData();
		}, [items])
	};

	const addTask = async (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			setItems([...items, { label: inputValue, done: true }]);
			setInputValue({ label: "", done: false });
		} if ((e.key === "Enter" && inputValue.trim() == "") || (e.type === "click" && inputValue.label == "")) {
			alert("Alert")
		}
	}

	useEffect(() => {
		setCount(items.length);
	}, [items]);

	const deleteItems = async (index) => {
		setItems((pItems) => pItems.filter((_, i) => i !== index))
		if (items.length == 0) {
			handleRemoveItem()
		}
	}

	const handleRemoveItem = async () => {
		const newArray = myArray.slice(0, -1);
		setItems(newArray);
	}


	return (
		<div className="notes-body m-4 p-5 rounded bg-secondary">
			<h1 className="text-center m-4">Pending Tasks 📝: <span>{count}</span> </h1>

			<div className="input-group mb-3">
				<input type="text" class="form-control" placeholder="Press 'Enter' to save new note :)" aria-label="what" onKeyUp={addTask} value={inputValue.label} onChange={(e) => setInputValue(e.target.value)} />
				{/* <button onClick={addTask} className="btn btn-success input-group-text"><i class="bi bi-plus-circle"></i></button> */}
			</div>


			<ol className="list-group list-group-numbered pt-2 d-grid gap-2 d-flex">
				{items.length == 0 ? (<li className="list-group-item gap-3 fs-5 rounded d-flex justify-content-between align-items-center">No tasks, add a task</li>) : (items.map((item, index) => (

					<li className="list-group-item gap-3 fs-5 rounded d-flex justify-content-between align-items-center" key={index}>{item.label}<button className="btn btn-outline-danger ms-2 py-0 px-1" onClick={() => deleteItems(index)}>
						<i className="bi bi-x-lg"></i>

					</button>

					</li>
				)))}
			</ol>
		</div>
	);
};

export default Home;

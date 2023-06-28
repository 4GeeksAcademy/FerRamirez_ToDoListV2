import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todoList, settodoList] = useState([]);

	const createUser = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/fernando",
			{
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		console.log(data);
	};

	const gettodoList = async () => {
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/fernando"
			);
			const data = await response.json();
			settodoList(data);
		} catch (error) {
			console.log(error);
		}
	};

	const UpdatetodoList = async () => {
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/fernando",
				{
					method: "PUT",
					body: JSON.stringify(todoList),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			console.log(response.ok); // will be true if the response is successfull
			console.log(response.status); // the status code = 200 or code = 400 etc.
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!createUser) {
			createUser();
		}
	}, []);
	useEffect(() => {
		gettodoList();
	}, []);
	useEffect(() => {
		UpdatetodoList();
	}, [todoList]);

	const addTask = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			settodoList([...todoList, { label: inputValue, done: false }]);
			setInputValue("");
		}
	};

	const deleteTasks = (id) => {
		settodoList(todoList.filter((task, index) => index !== id));
	};

	return (
		<div className="notes-body m-4 p-5 rounded bg-secondary">
			<h1 className="text-center m-4">Pending Tasks 📝: <span>{todoList.length}</span></h1>

			<div className="input-group mb-3">
				<input
					class="form-control"
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyUp={addTask}
					placeholder="Press 'Enter' to save new note :)"
				/>
			</div>

			<ul className="list-group list-group-numbered pt-2 d-grid gap-2 d-flex">
				{todoList.length === 0 ? (
					<li className="list-group-item gap-3 fs-5 rounded d-flex justify-content-between align-items-center">No tasks, lucky!</li>
				) : (
					todoList.map((task, index) => (
						<li className="list-group-item gap-3 fs-5 rounded d-flex justify-content-between align-items-center" key={index}>
							{task.label}{" "}
							<button className="btn btn-outline-danger ms-2 py-0 px-1" type="button" onClick={() => deleteTasks(index)}>
								<i class="bi bi-trash"></i>
							</button>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default Home;
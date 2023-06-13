import React, {useState} from "react";


//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState('');
	const [items, setItems] = useState([]);
	
	const addTask = () => {
		if ( inputValue != ''){
			setItems([...items, inputValue]);
			setInputValue('');
		}
	}

	const deleteTask = () => {

	}


	return (
		<div className="text-center container">
			<h1 className="text-center mt-5">To Do List</h1>
			
			<ul className="list-group">
				<li className="list-group-item pe-2 d-flex justify-content-start">
					<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
					<button className="btn btn-success mx-2" onClick={addTask} >Add Task</button>
					{/* <button className="btn btn-success">Delete Task</button> */}
				</li>
				<ul className="list-group">
					{items.map((item, index) => (
						<li className="list-group-item d-flex justify-content-start" key={index}>{item}</li>
					))} 
				</ul>
				
			</ul>
			
		</div>
	);
};

export default Home;

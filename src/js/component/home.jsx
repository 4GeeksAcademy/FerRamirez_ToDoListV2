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

	const deleteItems = (index) => {
		setItems(items => items.filter((item, i) => i !== index));
	}


	return (
		<div className="m-4 p-5 rounded bg-secondary">
			<h1 className="text-center m-5">Pending Tasks 📝: </h1>

			<div className="input-group mb-3">
  				<button className="btn btn-success input-group-text" onClick={addTask}><i class="bi bi-plus-circle"></i></button>
 				<input type="text" class="form-control" placeholder="What needs to be done?" aria-label="what" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
			</div>
			
			
			<ol className=" list-group list-group-numbered pt-2 d-grid gap-2 d-flex">
				{items.map((item, index) => (
		
					<li className="list-group-item gap-3 fs-5 rounded d-flex justify-content-between align-items-center" key={index}>{item}<button className="btn btn-outline-danger ms-2 py-0 px-1" onClick={() => deleteItems(index)}>
					<i class="bi bi-x-lg"></i>
					
						</button>
						
					</li>
				))} 
			</ol>
				
			
			
		</div>
	);
};

export default Home;

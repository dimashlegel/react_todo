import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3030/';

const RestApiTest = () => {

	const [data, setData] = useState([]);
	const [isPostLoading, setIsPostLoading] = useState(false);
	const {data : contacts, isLoading, error} = useFetch('contacts');

	useEffect(() => {
		setData(contacts);
	},[contacts])

	const addContact = async () => {
		setIsPostLoading(true);
		const payload = {		
			"name": "Solomia",
			"lastName": "Shlegel",
			"about": "from Kyiv"
		}
		const response = await axios.post('contacts', payload);
		setData((prev) => [...prev, response.data]);
		setIsPostLoading(false);
	}

	const deleteContact = async (id) => {
		await axios.delete(`contacts/${id}`);
		setData((prev) => prev.filter((item) => item.id !== id));
	}
	const editContact = async (id) => {
		const payload = {		
			"name": "Gerda",
			"lastName": "Shlegel",
			"about": "from Kyiv"
		}
		const response = await axios.put(`contacts/${id}`, payload);
		setData((prev) => prev.map((item) => {
			if (item.id === id) {
				return response.data
			}
			return item;
		}));
	}

	if (error) {
		return <div>Something went wrong:<br />{error}</div>
	}

	return (<>
		<h1>Phone Book</h1>
		<ul>
			{isLoading ? (<div>Loading...</div>) : (data.map((contact) => (<li key={contact.id}>
					<p>
						{contact.name} {contact.lastName} 
						<button type="button" onClick={() => deleteContact(contact.id)}>Delete</button>
						<button type="button" onClick={() => editContact(contact.id)}>Edit</button>
					</p>

				</li>)))}
		</ul>

<button type="button" disabled={isPostLoading} onClick={addContact}>{isPostLoading ? 'Loading...' : 'Add new'}</button>

	</>)
}

export default RestApiTest;
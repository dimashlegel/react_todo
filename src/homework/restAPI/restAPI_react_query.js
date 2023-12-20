// import { useEffect, useState } from "react";
// import { useFetch } from "./hooks/useFetch";
import {useMutation, useQuery} from '@tanstack/react-query';
import { addContact, getContactsList } from "./api";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3030/';

const RestAPIReactQuery = () => {

	const {data, isFetching, refetch} = useQuery({
		queryKey: ['contactsList'],
		queryFn: getContactsList
	})


	
	const {mutateAsync} = useMutation({
		mutationFn: (payload) => addContact(payload),
	})
	
	const addNewContact = async () => {
		const payload = {		
			"name": "Solia",
			"lastName": "Test",
			"about": "from Kyiv"
		}
		try {
			await mutateAsync(payload);
			await refetch();
		} catch (error) {
			
		}
	}

	// const [data, setData] = useState([]);
	// const [isPostLoading, setIsPostLoading] = useState(false);
	// const {data : contacts, isLoading, error} = useFetch('contacts');

	// useEffect(() => {
	// 	setData(contacts);
	// },[contacts])

	// const addContact = async () => {
	// 	setIsPostLoading(true);
	// 	const payload = {		
	// 		"name": "Solomia",
	// 		"lastName": "Shlegel",
	// 		"about": "from Kyiv"
	// 	}
	// 	const response = await axios.post('contacts', payload);
	// 	setData((prev) => [...prev, response.data]);
	// 	setIsPostLoading(false);
	// }

	// const deleteContact = async (id) => {
	// 	await axios.delete(`contacts/${id}`);
	// 	setData((prev) => prev.filter((item) => item.id !== id));
	// }
	// const editContact = async (id) => {
	// 	const payload = {		
	// 		"name": "Gerda",
	// 		"lastName": "Shlegel",
	// 		"about": "from Kyiv"
	// 	}
	// 	const response = await axios.put(`contacts/${id}`, payload);
	// 	setData((prev) => prev.map((item) => {
	// 		if (item.id === id) {
	// 			return response.data
	// 		}
	// 		return item;
	// 	}));
	// }

	// if (error) {
	// 	return <div>Something went wrong:<br />{error}</div>
	// }

	return (<>
		<h1>Phone Book</h1>
		<ul>
			{isFetching ? (<div>Loading...</div>) : (data.map((contact) => (<li key={contact.id}>
					<p>
						{contact.name} {contact.lastName} 
						<button type="button">Delete</button>
						<button type="button">Edit</button>
					</p>

				</li>)))}
		</ul>

<button type="button" onClick={refetch}>Add new</button>
<button type="button" onClick={addNewContact}>Add new</button>

	</>)
}

export default RestAPIReactQuery;
import { useEffect, useState } from "react";
import { getContactsList } from "./api";

const RestApiTest = () => {

	const [contacts, setContacts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	
	const fetchData = async () => {
		setIsLoading(true);
		const data = await getContactsList();
		setContacts(data);
		setIsLoading(false);
	}

	useEffect(() => {
		// const getContactsList = async () => {
		// 	const response = await axios.get('contacts');
		// 	setContacts(response.data);
		// 	return response.data;
		// }
		// getContactsList();
		fetchData();
	}, [])

	console.log(contacts);

	return (<>
		<h1>Phone Book</h1>
		<ul>
			{isLoading ? (<div>Loading...</div>) : (contacts.map((contact) => (<li key={contact.id}>{contact.name} {contact.lastName}</li>)))}
		</ul>
	</>)
}

export default RestApiTest;
import { useFetch } from "./hooks/useFetch";

const RestApiTest = () => {

	const {data : contacts, isLoading, error} = useFetch('contacts');

	if (error) {
		return <div>Something went wrong:<br />{error}</div>
	}

	return (<>
		<h1>Phone Book</h1>
		<ul>
			{isLoading ? (<div>Loading...</div>) : (contacts.map((contact) => (<li key={contact.id}>{contact.name} {contact.lastName}</li>)))}
		</ul>
	</>)
}

export default RestApiTest;
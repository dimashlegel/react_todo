import { useEffect } from "react";

export const useFetch = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState([false]);

	const fetchData = async () => {
		setIsLoading(true);
		const data = await getContactsList();
		setData(data);
		setIsLoading(false);
	}
	
	useEffect(() => {
	}, []);

  return {data, isLoading}; 

}
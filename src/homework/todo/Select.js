const Select = (props) => {
	
	const handleOptionChange = (e) => {
		// console.log(e.target.value);
		props.setSelectedOption(e.target.value);
	}
	const options = [
		{id: 1, value: 'active', label: 'Active'},
		{id: 2, value: 'finished', label: 'Finished'},
		{id: 3, value: 'all', label: 'All'},
	]

	return (<>
					<p>Todos Filter</p>
					<select className={props.styles.select} name="filterOpt" id="filterOpt" value={props.selectedOption} onChange={handleOptionChange}>
						{options.map((option) => (
							<option key={option.id} value={option.value} >{option.label}</option>
						))}
					</select>
	</>)
}

export default Select;
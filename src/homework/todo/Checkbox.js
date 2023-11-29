const Checkbox = (props) => {
	return (<>
						<input type="checkbox" name={props.name} defaultChecked={props.finished} onClick={() => props.onClickCheckHandler(props.id, props.name)} />
				 </>)
}

export default Checkbox;
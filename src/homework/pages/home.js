import { Link } from "react-router-dom";
import styles from '../todo/TodoStyles.module.scss';

const Home = () => {
	return (<>
		<h1>Ласкаво просимо до вашого todo List</h1>
		<Link className={`${styles.button} ${styles.button_minWidth} ${styles.mb}`} to="/todo" >Start</Link>	
	</>)
}

export default Home;
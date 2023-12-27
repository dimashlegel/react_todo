import { Link, Outlet, NavLink } from 'react-router-dom';

const getActiveLink = ({isActive}) => isActive ? 'active-link' : '';

const Layout = () => {
	return (<>
 			<header className="App-header">
				<NavLink to="/" className={getActiveLink}>Home</NavLink>
				<NavLink to="/todo" className={getActiveLink}>ToDo</NavLink>
				<NavLink to="/about" className={getActiveLink}>About</NavLink>
      </header>
			<main>
				<Outlet />
			</main>
			<footer>By Dima</footer>
	</>)
}

export default Layout
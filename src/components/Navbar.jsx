import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import logo from '../assets/logo/SNSU_Logo-Bg.png';
import { Divider } from '@mui/material';

const Navbar = () => {
	return (
		<nav>
			<div className='left-nav'>
				<div className='logo'>
					<img src={logo} alt='Logo' width={55} height={55} />
				</div>
				<NavLink className='nav-link' to='/humidity'>
					<span style={{ fontWeight: 500, fontSize: 20 }}>
						Humidity
					</span>
				</NavLink>
				<NavLink className='nav-link' to='/soil-moisture'>
					<span style={{ fontWeight: 500, fontSize: 20 }}>
						Soil Moisture
					</span>
				</NavLink>
				<NavLink className='nav-link' to='/temperature'>
					<span style={{ fontWeight: 500, fontSize: 20 }}>
						Temperature
					</span>
				</NavLink>
				<NavLink className='nav-link' to='/light-intensity'>
					<span style={{ fontWeight: 500, fontSize: 20 }}>
						Light Intensity
					</span>
				</NavLink>
			</div>
			<ul>
				<UserMenu />
			</ul>
		</nav>
	);
};

export default Navbar;

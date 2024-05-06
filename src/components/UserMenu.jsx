import { useContext, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import { AuthContext } from '../App'; // import AuthContext
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
	const [logoutAnchor, setLogoutAnchor] = useState(null);
	const [navMenuAnchor, setNavMenuAnchor] = useState(null);
	const [navLiveMenuAnchor, setNavLiveMenuAnchor] = useState(null);

	const logoutOpen = Boolean(logoutAnchor);
	const navMenuOpen = Boolean(navMenuAnchor);
	const navLiveMenuOpen = Boolean(navLiveMenuAnchor);

	const { setIsLoggedIn } = useContext(AuthContext); // use AuthContext
	const navigate = useNavigate();

	const handleClick = (event, name) => {
		if (name === 'logout') setLogoutAnchor(event.currentTarget);
		if (name === 'navMenu') setNavMenuAnchor(event.currentTarget);
		if (name === 'navLiveMenu') setNavLiveMenuAnchor(event.currentTarget);
	};

	const handleClose = (name) => {
		if (name === 'logout') setLogoutAnchor(null);
		if (name === 'navMenu') setNavMenuAnchor(null);
		if (name === 'navLiveMenu') setNavLiveMenuAnchor(null);
	};

	const handleLogout = () => {
		setLogoutAnchor(null);
		setIsLoggedIn(false); // Logout the user
		navigate('/'); // Redirect to login page
	};

	return (
		<>
			<button
				id='navMenu-button'
				aria-controls={navMenuOpen ? 'navMenu-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={navMenuOpen ? 'true' : undefined}
				onClick={(event) => handleClick(event, 'navMenu')}
				className='nav-menu-button'
			>
				<MenuIcon className='icon' />
			</button>

			<button
				id='navMenu-live-button'
				aria-controls={
					navLiveMenuOpen ? 'navMenu-live-menu' : undefined
				}
				aria-haspopup='true'
				aria-expanded={navLiveMenuOpen ? 'true' : undefined}
				onClick={(event) => handleClick(event, 'navLiveMenu')}
				className='nav-live-menu-button'
			>
				<MenuIcon className='icon' />
			</button>

			<button
				id='logout-button'
				aria-controls={logoutOpen ? 'logout-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={logoutOpen ? 'true' : undefined}
				onClick={(event) => handleClick(event, 'logout')}
			>
				<AccountCircleIcon className='icon' fontSize='large' />
			</button>

			{/* Logout Nav Menu */}
			<Menu
				id='logout-menu'
				anchorEl={logoutAnchor}
				open={logoutOpen}
				onClose={() => handleClose('logout')}
				MenuListProps={{
					'aria-labelledby': 'logout-button'
				}}
			>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>

			{/* Mobile Graph Menu */}
			<Menu
				id='navMenu-menu'
				anchorEl={navMenuAnchor}
				open={navMenuOpen}
				onClose={() => handleClose('navMenu')}
				MenuListProps={{
					'aria-labelledby': 'navMenu-button'
				}}
			>
				<MenuItem onClick={() => navigate('/humidity')}>
					<span style={{ fontWeight: 500, fontSize: 18 }}>
						Humidity
					</span>
				</MenuItem>
				<MenuItem onClick={() => navigate('/soil-moisture')}>
					<span style={{ fontWeight: 500, fontSize: 18 }}>
						Soil Moisture
					</span>
				</MenuItem>
				<MenuItem onClick={() => navigate('/temperature')}>
					<span style={{ fontWeight: 500, fontSize: 18 }}>
						Temperature
					</span>
				</MenuItem>
				<MenuItem onClick={() => navigate('/light-intensity')}>
					<span style={{ fontWeight: 500, fontSize: 18 }}>
						Light Intensity
					</span>
				</MenuItem>
			</Menu>

			{/* Live Graph Menu */}
			<Menu
				id='navMenu-live-menu'
				anchorEl={navLiveMenuAnchor}
				open={navLiveMenuOpen}
				onClose={() => handleClose('navLiveMenu')}
				MenuListProps={{
					'aria-labelledby': 'navMenu-live-button'
				}}
			>
				<MenuItem onClick={() => navigate('/humidity-live')}>
					<span style={{ fontWeight: 500, fontSize: 18 }}>
						Humidity Live Graph
					</span>
				</MenuItem>
				<MenuItem onClick={() => navigate('/soil-moisture-live')}>
					<span style={{ fontWeight: 500, fontSize: 18 }}>
						Soil Moisture Live Graph
					</span>
				</MenuItem>
				<MenuItem onClick={() => navigate('/temperature-live')}>
					<span style={{ fontWeight: 500, fontSize: 18 }}>
						Temperature Live Graph
					</span>
				</MenuItem>
				<MenuItem onClick={() => navigate('/light-intensity-live')}>
					<span style={{ fontWeight: 500, fontSize: 18 }}>
						Light Intensity Live Graph
					</span>
				</MenuItem>
			</Menu>
		</>
	);
};

export default UserMenu;

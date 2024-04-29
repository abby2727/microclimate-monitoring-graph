import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import '../styles/Login.css';
import logo from '../assets/logo/SNSU_Logo-Bg.png';

const LoginHeader = () => {
	return (
		<AppBar position='static' sx={{ backgroundColor: '#9370db' }}>
			<Toolbar>
				<Box className='login-header-box login-header-box-sm'>
					<img
						src={logo}
						alt='Logo'
						width={55}
						height={55}
						style={{ marginRight: '10px' }}
					/>
					<Typography variant='h5' className='logo-text'>
						<span style={{ fontWeight: 700, color: '#fff' }}>
							SNSU
						</span>
					</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default LoginHeader;

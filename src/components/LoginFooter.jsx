import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import '../styles/Login.css';
import logo from '../assets/logo/SNSU_Logo-Bg.png';

const LoginFooter = () => {
	return (
		<AppBar position='static' sx={{ backgroundColor: '#9370db' }}>
			<Toolbar className='toolbar'>
				<Box className='outer-box outer-box-sm'>
					<Box className='inner-box inner-box-sm'>
						<img
							src={logo}
							alt='Logo'
							width={65}
							height={65}
							style={{ marginRight: '10px' }}
						/>
						<Typography variant='h4' className='logo-text'>
							<span style={{ fontWeight: 700, color: '#fff' }}>
								SNSU
							</span>
						</Typography>
					</Box>
					<Typography variant='body1' className='footer-text'>
						&copy; 2024 SNSU. All rights reserved.
					</Typography>
					<br className='br-show' />
					<Typography variant='body1' className='footer-text'>
						<span>Provided by:</span>
						<br />
						<span>James Degamon | Vincent Dihayco</span>
					</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default LoginFooter;

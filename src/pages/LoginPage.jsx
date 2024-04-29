import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../components/LoginHeader';
import LoginFooter from '../components/LoginFooter';

const LoginPage = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginFailed, setLoginFailed] = useState(false);

	const { setIsLoggedIn } = useContext(AuthContext);
	const credentials = {
		username: 'researcheradmin',
		password: 'microclimate*research!2024'
	};

	const handleLogin = (event) => {
		event.preventDefault();
		if (
			username === credentials.username &&
			password === credentials.password
		) {
			setIsLoggedIn(true);
		} else {
			setLoginFailed(true);
		}
	};

	useEffect(() => {
		navigate('/');
	}, []);

	return (
		<>
			<LoginHeader />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: 'calc(100vh - 209px)',
					bgcolor: '#e9ecef'
				}}
			>
				<Container
					maxWidth='xs'
					sx={{
						borderRadius: 6,
						backgroundColor: '#fff',
						padding: '3rem 4rem'
					}}
				>
					<Typography
						variant='h4'
						align='center'
						sx={{ marginBottom: 3 }}
					>
						Sign in
					</Typography>
					{loginFailed && (
						<Typography
							variant='h6'
							align='center'
							style={{ color: 'red' }}
							sx={{ fontSize: '1rem' }}
						>
							Invalid username or password
						</Typography>
					)}
					<form onSubmit={handleLogin}>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='username'
							label='Username'
							name='username'
							autoComplete='username'
							autoFocus
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							error={loginFailed}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							error={loginFailed}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							style={{ marginTop: '1rem' }}
						>
							Login
						</Button>
					</form>
				</Container>
			</Box>
			<LoginFooter />
		</>
	);
};

export default LoginPage;

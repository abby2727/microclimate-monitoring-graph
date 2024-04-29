import React, { useState, createContext, useContext, useEffect } from 'react';
import Navbar from './components/Navbar';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

import LoginPage from './pages/LoginPage';

import HumidityGraph from './pages/HumidityGraph';
import SoilMoistureGraph from './pages/SoilMoistureGraph';
import TemperatureGraph from './pages/TemperatureGraph';
import LightIntensityGraph from './pages/LightIntensityGraph';

const queryClient = new QueryClient();

export const AuthContext = createContext();

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		const saved = localStorage.getItem('isLoggedIn');
		const savedTime = localStorage.getItem('savedTime');
		const now = new Date();

		if (savedTime && now.getTime() - savedTime > 6 * 60 * 60 * 1000) {
			// If more than 6 hours has passed, ignore the saved value
			return false;
		} else {
			const initialValue = JSON.parse(saved);
			return initialValue || false;
		}
	});

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (isLoggedIn && location.pathname === '/') {
			navigate('/humidity');
		}
	}, [isLoggedIn, location, navigate]);

	useEffect(() => {
		localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
		localStorage.setItem('savedTime', new Date().getTime());
	}, [isLoggedIn]);

	const routing = useRoutes([
		{
			path: '/humidity',
			element: isLoggedIn ? <HumidityGraph /> : <LoginPage />
		},
		{
			path: '/soil-moisture',
			element: isLoggedIn ? <SoilMoistureGraph /> : <LoginPage />
		},
		{
			path: '/temperature',
			element: isLoggedIn ? <TemperatureGraph /> : <LoginPage />
		},
		{
			path: '/light-intensity',
			element: isLoggedIn ? <LightIntensityGraph /> : <LoginPage />
		},
		{ path: '/', element: <LoginPage /> }
	]);

	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			<QueryClientProvider client={queryClient}>
				{isLoggedIn && <Navbar />}
				<div className='container'>{routing}</div>
			</QueryClientProvider>
		</AuthContext.Provider>
	);
};

export default App;

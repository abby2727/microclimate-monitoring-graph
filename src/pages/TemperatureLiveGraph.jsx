import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const TemperatureLiveGraph = () => {
	const temperatureLiveData = [
		'25',
		'25.2',
		'24.7',
		'25.4',
		'26.1',
		'27.8',
		'28.3',
		'28.5',
		'29.7',
		'28.8'
	];
	// Generate labels for the past 10 minutes
	const temperatureLiveLabels = Array.from({ length: 10 }, (_, i) => {
		const d = new Date();
		d.setMinutes(d.getMinutes() - (10 - i));
		return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	});

	const [data, setData] = useState({
		labels: temperatureLiveLabels,
		datasets: [
			{
				label: 'Temperature Levels (°C)',
				data: temperatureLiveData,
				fill: true,
				backgroundColor: 'rgba(255,215,0,0.4)',
				borderColor: 'rgba(255,215,0,0.9)',
				borderWidth: 1,
				tension: 0.4
			}
		]
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setData((prevData) => {
				const newLabel = new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit'
				});
				const newData = (Math.random() * (35 - 24) + 24).toFixed(2);
				return {
					...prevData,
					labels: [...prevData.labels, newLabel],
					datasets: prevData.datasets.map((dataset) => ({
						...dataset,
						data: [...dataset.data, newData]
					}))
				};
			});
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: 'calc(100vh - 4.5rem)'
			}}
		>
			<div
				style={{
					width: '1000px',
					height: '700px',
					border: '2px solid #9370db',
					borderRadius: '8px'
				}}
			>
				<Line data={data} options={{ maintainAspectRatio: false }} />
			</div>
		</div>
	);
};

export default TemperatureLiveGraph;

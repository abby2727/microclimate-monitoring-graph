import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const HumidityLiveGraph = () => {
	const humidityLiveData = [
		'90',
		'88',
		'85.4',
		'86',
		'84.3',
		'82',
		'79',
		'80.4',
		'78',
		'77'
	];
	// Generate labels for the past 10 minutes
	const humidityLiveLabels = Array.from({ length: 10 }, (_, i) => {
		const d = new Date();
		d.setMinutes(d.getMinutes() - (10 - i));
		return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	});

	const [data, setData] = useState({
		labels: humidityLiveLabels,
		datasets: [
			{
				label: 'Humidity Levels (%)',
				data: humidityLiveData,
				fill: true,
				backgroundColor: 'rgba(74,144,226,0.4)',
				borderColor: 'rgba(74,144,226,0.9)',
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
				const newData = (Math.random() * (92 - 66) + 66).toFixed(2);
				return {
					...prevData,
					labels: [...prevData.labels, newLabel],
					datasets: prevData.datasets.map((dataset) => ({
						...dataset,
						data: [...dataset.data, newData]
					}))
				};
			});
		}, 55000);

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

export default HumidityLiveGraph;

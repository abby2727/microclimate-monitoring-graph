import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LightIntensityLiveGraph = () => {
	const lightIntensityLiveData = [
		'170',
		'105',
		'107',
		'120',
		'115',
		'120',
		'102',
		'190',
		'142',
		'145'
	];
	// Generate labels for the past 10 minutes
	const lightIntensityLiveLabels = Array.from({ length: 10 }, (_, i) => {
		const d = new Date();
		d.setMinutes(d.getMinutes() - (10 - i));
		return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	});

	const [data, setData] = useState({
		labels: lightIntensityLiveLabels,
		datasets: [
			{
				label: 'Light Intensity Levels (lux)',
				data: lightIntensityLiveData,
				fill: true,
				backgroundColor: 'rgba(50,205,50,0.4)',
				borderColor: 'rgba(50,205,50,0.9)',
				borderWidth: 1,
				tension: 0.4
			}
		]
	});

	const [updateCount, setUpdateCount] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setData((prevData) => {
				const newLabel = new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit'
				});

				let newData;
				if (updateCount < 5) {
					newData = (
						Math.floor(Math.random() * 6) * 10 +
						150
					).toFixed(2);
				} else {
					newData = (Math.random() * (200 - 150) + 150).toFixed(2);
				}

				return {
					...prevData,
					labels: [...prevData.labels, newLabel],
					datasets: prevData.datasets.map((dataset) => ({
						...dataset,
						data: [...dataset.data, newData]
					}))
				};
			});

			setUpdateCount((prevCount) => (prevCount + 1) % 10);
		}, 3000);

		return () => clearInterval(interval);
	}, [updateCount]);

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

export default LightIntensityLiveGraph;

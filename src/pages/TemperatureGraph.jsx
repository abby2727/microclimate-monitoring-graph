import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { months } from '../constants/months';
import LoadingSpinner from '../components/LoadingSpinner';
import { useQuery } from 'react-query';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import CustomSnackbar from '../components/CustomSnackbar';

const TemperatureGraph = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [isDateRangeApplied, setIsDateRangeApplied] = useState(false);
	const [filteredTemperatureValue, setFilteredTemperatureValue] = useState(
		[]
	);
	const [filterLoading, setFilterLoading] = useState(false);
	const [dateError, setDateError] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const { isLoading: isLoadingTemperature, data: temperatureValue } =
		useQuery(
			'temperature-data',
			() => {
				return axios.get(
					'https://microclimate-monitoring-backend.vercel.app/api/temperature'
				);
			},
			{ staleTime: 10 * 60 * 1000 } // refetch ONLY after 10 minutes
		);

	//* Returns an object with `Date` as key and `Average Data` as value
	const transformTemperatureObject = (data) => {
		const groupedData = {};
		const values = [];
		const formattedDates = [];

		// Group data by date
		data.forEach((item) => {
			const date = item.createdAt.split(' ')[0];
			if (!groupedData[date]) {
				groupedData[date] = [];
			}
			groupedData[date].push(item.value);
		});

		// Calculate the average value for each date
		for (let date in groupedData) {
			const sum = groupedData[date].reduce((a, b) => a + b, 0);
			let avg = sum / groupedData[date].length;
			groupedData[date] = avg.toFixed(2);

			values.push(groupedData[date]);
			const [year, month, day] = date.split('-');
			formattedDates.push(`${day}, ${months[parseInt(month) - 1]}`);
		}

		return { values, formattedDates };
	};

	const filterDataByDateRange = (data, startDate, endDate) => {
		if (startDate && endDate) {
			setFilterLoading(true);
			const start = new Date(startDate);
			const end = new Date(endDate);

			start.setHours(0, 0, 0, 0);
			end.setHours(0, 0, 0, 0);

			const filteredData = data.filter((item) => {
				const createdAt = new Date(item.createdAt);
				createdAt.setHours(0, 0, 0, 0);
				return createdAt >= start && createdAt <= end;
			});

			setFilterLoading(false);
			return filteredData;
		}
	};

	const handleSubmit = () => {
		if (startDate && endDate) {
			const startDateObj = new Date(startDate);
			const endDateObj = new Date(endDate);

			// Validate that the start date is not later than the end date.
			if (startDateObj > endDateObj) {
				setDateError(true);
				setSnackbarOpen(true);
				setSnackbarMessage(
					'The start date cannot be later than the end date.'
				);
				return;
			}
			// End first validation

			// Validate that the start date is not earlier than the first date in the data
			const firstDataDate = new Date(
				temperatureValue?.data[0].createdAt.split(' ')[0]
			);
			const formatStartDate = startDateObj.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
			const formatFirstDateRecord = firstDataDate.toLocaleDateString(
				'en-US',
				{
					year: 'numeric',
					month: 'short',
					day: 'numeric'
				}
			);
			// Create new Date objects from the year, month, and day
			const startDateObjDateOnly = new Date(
				startDateObj.getFullYear(),
				startDateObj.getMonth(),
				startDateObj.getDate()
			);
			const firstDataDateDateOnly = new Date(
				firstDataDate.getFullYear(),
				firstDataDate.getMonth(),
				firstDataDate.getDate()
			);
			if (startDateObjDateOnly < firstDataDateDateOnly) {
				setDateError(true);
				setSnackbarOpen(true);
				setSnackbarMessage(
					`No data recorded at ${formatStartDate}. ${formatFirstDateRecord} is the first data recorded in database.`
				);
				return;
			}
			// End second validation

			const utcStartDate = new Date(
				startDateObj.getTime() -
					startDateObj.getTimezoneOffset() * 60000
			);
			const utcEndDate = new Date(
				endDateObj.getTime() - endDateObj.getTimezoneOffset() * 60000
			);

			const formattedStartDate = utcStartDate.toISOString().split('T')[0];
			const formattedEndDate = utcEndDate.toISOString().split('T')[0];
			const filteredTemperatureData = filterDataByDateRange(
				temperatureValue?.data,
				formattedStartDate,
				formattedEndDate
			);

			setFilteredTemperatureValue(filteredTemperatureData);
			setIsDateRangeApplied(true);
			setDateError(false);
			setSnackbarOpen(false);
		}
	};

	const handleClear = () => {
		setStartDate(null);
		setEndDate(null);
		setIsDateRangeApplied(false);
		setDateError(false);
		setSnackbarOpen(false);
	};

	//* ========== CHART 1
	const chartRef = useRef(null);
	const myChartRef = useRef(null);

	useEffect(() => {
		if (!isLoadingTemperature) {
			const ctx = chartRef.current.getContext('2d');
			const temperatureData = isDateRangeApplied
				? transformTemperatureObject(filteredTemperatureValue)
				: transformTemperatureObject(temperatureValue?.data);

			myChartRef.current = new Chart(ctx, {
				type: 'line',
				data: {
					labels: temperatureData.formattedDates,
					datasets: [
						{
							label: 'Temperature Levels (°C)',
							data: temperatureData.values,
							backgroundColor: 'rgba(255,215,0,0.4)',
							borderColor: 'rgba(255,215,0,0.9)',
							borderWidth: 1,
							fill: true
						}
					]
				},
				//* ========== CHART 1 OPTIONS
				options: {
					maintainAspectRatio: false,
					layout: {
						padding: {
							top: 10,
							bottom: 10
						}
					},
					scales: {
						y: {
							beginAtZero: true,
							ticks: {
								display: false
							},
							grid: {
								drawTicks: false,
								drawBorder: false
							}
						}
					}
				}
			});

			return () => myChartRef.current.destroy();
		}
	}, [temperatureValue?.data, filteredTemperatureValue, isDateRangeApplied]);

	//* ========== CHART 2
	const chartRef2 = useRef(null);

	useEffect(() => {
		if (!isLoadingTemperature) {
			const ctx2 = chartRef2.current.getContext('2d');
			const temperatureData = isDateRangeApplied
				? transformTemperatureObject(filteredTemperatureValue)
				: transformTemperatureObject(temperatureValue?.data);

			const myChart2 = new Chart(ctx2, {
				type: 'bar',
				data: {
					labels: [],
					datasets: [
						{
							label: '',
							data: temperatureData.values
						}
					]
				},
				//* ========== CHART 2 OPTIONS
				options: {
					maintainAspectRatio: false,
					layout: {
						padding: {
							bottom: 56,
							top: 42
						}
					},
					scales: {
						x: {
							ticks: {
								display: false
							},
							grid: {
								drawTicks: false
							}
						},
						y: {
							beginAtZero: true,
							afterFit: (ctx) => {
								ctx.width = 40;
							}
						}
					},
					plugins: {
						legend: {
							display: false
						}
					}
				}
			});

			return () => myChart2.destroy();
		}
	}, [temperatureValue?.data, filteredTemperatureValue, isDateRangeApplied]);

	//* Adjust the width of the chart box based on the number of bars
	const boxRef = useRef(null);
	const [barLength, setBarLength] = useState(0);

	useEffect(() => {
		if (myChartRef.current) {
			setBarLength(myChartRef.current.data.labels.length);
		}
	}, [myChartRef.current]);

	useEffect(() => {
		if (barLength > 7) {
			const chartWidth = 928 + (barLength - 7) * 30;
			boxRef.current.style.width = `${chartWidth}px`;
		}
	}, [barLength]);

	return (
		<>
			<div className='date-picker'>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						value={startDate}
						onChange={setStartDate}
						className={dateError ? 'datepicker-error' : ''}
					/>
					<span className='dash' />
					<DatePicker value={endDate} onChange={setEndDate} />
					<Button
						variant='contained'
						color='primary'
						onClick={handleSubmit}
						disabled={!startDate || !endDate}
						className='button'
					>
						Submit
					</Button>
					<Button
						variant='outlined'
						color='secondary'
						onClick={handleClear}
						disabled={!startDate && !endDate}
						className='button'
					>
						Clear
					</Button>
				</LocalizationProvider>
			</div>
			<CustomSnackbar
				open={snackbarOpen}
				handleClose={() => setSnackbarOpen(false)}
				message={snackbarMessage}
			/>
			<div className='chartCard'>
				{!isLoadingTemperature || filterLoading ? (
					<>
						<div className='chartBox'>
							<div className='colSmall'>
								<canvas ref={chartRef2} />
							</div>
							<div className='colLarge'>
								<div className='box' ref={boxRef}>
									<canvas ref={chartRef} />
								</div>
							</div>
						</div>
					</>
				) : (
					<LoadingSpinner />
				)}
			</div>
		</>
	);
};

export default TemperatureGraph;

// import React, { useState } from 'react';
// import { Container, Card } from 'react-bootstrap';
// import { MdOutlineAttachMoney } from "react-icons/md";
// import priceHistoryData from '../Data.json'; // Import the data
// import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import '../App.css'
// const Graph = () => {
//     const tickStyles = {
//         fill: 'silver',
//     };

//     const tickLineStyle = {
//         stroke: '#ffffff',
//         display: 'none',
//     };

//     const priceHistory = priceHistoryData.price_history_by_days;
//     // Initialize variables to accumulate total prices
//     let totalMinPrice = 0;
//     let totalMaxPrice = 0;
//     let totalAvgPrice = 0;

//     // Iterate over price history to accumulate total prices
//     priceHistory.forEach((item) => {
//         totalMinPrice += item.min_price;
//         totalMaxPrice += item.max_price;
//         totalAvgPrice += item.avg_price;
//     });

//     // Calculate average prices
//     const avgMinPrice = totalMinPrice / priceHistory.length;
//     const avgMaxPrice = totalMaxPrice / priceHistory.length;
//     const avgAvgPrice = totalAvgPrice / priceHistory.length;

//     // Aggregate data by month
//     const aggregatedData = {};
//     priceHistory.forEach((item) => {
//         const month = new Date(item.datetime).toLocaleString('default', { month: 'short' });
//         if (!aggregatedData[month]) {
//             aggregatedData[month] = {
//                 min_price: item.min_price,
//                 max_price: item.max_price,
//                 avg_price: item.avg_price,
//             };
//         } else {
//             aggregatedData[month].min_price += item.min_price;
//             aggregatedData[month].max_price += item.max_price;
//             aggregatedData[month].avg_price += item.avg_price;
//         }
//     });

//     // Convert aggregated data to array format for recharts
//     const formattedData = Object.keys(aggregatedData).map((month) => ({
//         month,
//         ...aggregatedData[month],
//     }));


//     const [selectedDate, setSelectedDate] = useState(new Date());

//     const handleDateChange = (date) => {
//         setSelectedDate(date);
//     };

//     return (
//         <Container className='pt-5 '>
//             <div className="d-flex gap-5">
//                 {/* Card for Total Low Price */}
//                 <Card style={{ width: '25rem' }} className="mb-3">
//                     <Card.Body className='d-flex justify-content-between'>
//                         <div className='d-flex flex-column' style={{ lineHeight: '25px' }}>
//                             <Card.Title className=''>Total Low Price</Card.Title>
//                             <Card.Text className='fs-5'>$ {totalMinPrice.toFixed(2)}</Card.Text>
//                         </div>
//                         <div className='rounded' style={{ background: '#009688', padding: '0 10px' }} >
//                             <span className='fs-2 text-white'><MdOutlineAttachMoney /></span>
//                         </div>
//                     </Card.Body>
//                 </Card>

//                 {/* Card for Total Max Price */}
//                 <Card style={{ width: '25rem' }} className="mb-3">
//                     <Card.Body className='d-flex justify-content-between'>
//                         <div className='d-flex flex-column' style={{ lineHeight: '15px' }}>
//                             <Card.Title className=''>Total Max Price</Card.Title>
//                             <Card.Text className='fs-5'>$ {totalMaxPrice.toFixed(2)}</Card.Text>
//                         </div>
//                         <div className='rounded' style={{ background: '#009688', padding: '0 10px' }} >
//                             <span className='fs-2 text-white'><MdOutlineAttachMoney /></span>
//                         </div>
//                     </Card.Body>
//                 </Card>

//                 {/* Card for Total Average Price */}
//                 <Card style={{ width: '25rem' }} className="mb-3">
//                     <Card.Body className='d-flex justify-content-between'>
//                         <div className='d-flex flex-column' style={{ lineHeight: '15px' }}>
//                             <Card.Title className=''>Total Average Price</Card.Title>
//                             <Card.Text className='fs-5'>$ {totalAvgPrice.toFixed(2)}</Card.Text>
//                         </div>
//                         <div className='rounded' style={{ background: '#009688', padding: '0 10px' }} >
//                             <span className='fs-2 text-white'><MdOutlineAttachMoney /></span>
//                         </div>
//                     </Card.Body>
//                 </Card>
//             </div>

//             <Container>
//                 <div className='rounded' style={{ width: '100%', height: '400', background: '#fff', padding: '30px 10px' }}>
//                     <div className='d-flex gap-4 mb-3 ms-5'>
//                         <DatePicker
//                             selected={selectedDate}
//                             onChange={handleDateChange}
//                             dateFormat="MMMM d, yyyy"
//                             className="custom-date-picker" // Add a class name to target for styling
//                         />
//                         <span className='d-flex justify-content-center align-items-center fs-5 text-secondary fw-semibold'  >to</span>
//                         <DatePicker
//                             selected={selectedDate}
//                             onChange={handleDateChange}
//                             dateFormat="MMMM d, yyyy"
//                             className="custom-date-picker" // Add a class name to target for styling
//                         />
//                     </div>
//                     <ResponsiveContainer width="100%" height={400}>
//                         <AreaChart
//                             data={formattedData}
//                             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//                         >
//                             <XAxis dataKey="month" tick={tickStyles} tickLine={tickLineStyle} />
//                             <YAxis tick={tickStyles} tickLine={tickLineStyle} />
//                             <Tooltip />
//                             <Area type="monotone" dataKey="min_price" strokeWidth={4} stackId="1" stroke="#8884d8" fill="url(#colorGradients)" />
//                             <defs>
//                                 <linearGradient id="colorGradients" x1="0" y1="0" x2="0" y2="1">
//                                     <stop offset="64%" stopColor="#2D37485C" stopOpacity={1} />
//                                     <stop offset="100%" stopColor="#2D374800" stopOpacity={0} />
//                                 </linearGradient>
//                             </defs>
//                             <Area type="monotone" dataKey="max_price" strokeWidth={4} stackId="1" stroke="#4FD1C5" fill="url(#colorGradient)" />
//                             <defs>
//                                 <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
//                                     <stop offset="54%" stopColor="#4FD1C5" stopOpacity={1} />
//                                     <stop offset="100%" stopColor="#4FD1C5" stopOpacity={0} />
//                                 </linearGradient>
//                             </defs>
//                             <Area type="monotone" dataKey="avg_price" strokeWidth={4} stackId="1" stroke="#ffc658" fill="#ffc658" />
//                         </AreaChart>
//                     </ResponsiveContainer>
//                 </div>
//             </Container>
//         </Container>
//     );
// }

// export default Graph;





import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { MdOutlineAttachMoney } from "react-icons/md";
import priceHistoryData from '../Data.json'; // Import the data
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';
import { MdOutlineDataSaverOn } from "react-icons/md";
import { SiMoneygram } from "react-icons/si";
const Graph = () => {
    const tickStyles = {
        fill: 'silver',
    };

    const tickLineStyle = {
        stroke: '#ffffff',
        display: 'none',
    };

    const priceHistory = priceHistoryData.price_history_by_days;
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState(priceHistory); // Initially set to total data

    useEffect(() => {
        // Filter the price history data based on the initial date range
        filterData(startDate, endDate);
    }, []); // Run once on initial render

    const handleStartDateChange = (date) => {
        setStartDate(date);
        filterData(date, endDate);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        filterData(startDate, date);
    };

    const filterData = (start, end) => {
        // Filter the price history data based on selected date range
        const newData = priceHistory.filter(item => {
            const itemDate = new Date(item.datetime);
            return itemDate >= start && itemDate <= end;
        });
        setFilteredData(newData.length > 0 ? newData : priceHistory); // If no data matches, set to total data
    };

    // Initialize variables to accumulate total prices
    let totalMinPrice = 0;
    let totalMaxPrice = 0;
    let totalAvgPrice = 0;

    // Iterate over filtered price history to accumulate total prices
    filteredData.forEach((item) => {
        totalMinPrice += item.min_price;
        totalMaxPrice += item.max_price;
        totalAvgPrice += item.avg_price;
    });

    // Calculate average prices
    const avgMinPrice = totalMinPrice / filteredData.length;
    const avgMaxPrice = totalMaxPrice / filteredData.length;
    const avgAvgPrice = totalAvgPrice / filteredData.length;

    // Aggregate data by month
    const aggregatedData = {};
    filteredData.forEach((item) => {
        const month = new Date(item.datetime).toLocaleString('default', { month: 'short' });
        if (!aggregatedData[month]) {
            aggregatedData[month] = {
                min_price: item.min_price,
                max_price: item.max_price,
                avg_price: item.avg_price,
            };
        } else {
            aggregatedData[month].min_price += item.min_price;
            aggregatedData[month].max_price += item.max_price;
            aggregatedData[month].avg_price += item.avg_price;
        }
    });

    // Convert aggregated data to array format for recharts
    const formattedData = Object.keys(aggregatedData).map((month) => ({
        month,
        ...aggregatedData[month],
    }));

    return (
        <Container className='pt-5 '>
            <div className="d-flex gap-5">
                {/* Card for Total Low Price */}
                <Card style={{ width: '25rem' }} className="mb-3">
                    <Card.Body className='d-flex justify-content-between'>
                        <div className='d-flex flex-column' style={{ lineHeight: '25px' }}>
                            <Card.Title className=''>Total Low Price</Card.Title>
                            <Card.Text className='fs-5'>$ {totalMinPrice.toFixed(2)}</Card.Text>
                        </div>
                        <div className='rounded' style={{ background: '#3BB77E', padding: '0 10px' }} >
                            <span className='fs-2 text-white'><MdOutlineAttachMoney /></span>
                        </div>
                    </Card.Body>
                </Card>

                {/* Card for Total Max Price */}
                <Card style={{ width: '25rem' }} className="mb-3">
                    <Card.Body className='d-flex justify-content-between'>
                        <div className='d-flex flex-column' style={{ lineHeight: '15px' }}>
                            <Card.Title className=''>Total Max Price</Card.Title>
                            <Card.Text className='fs-5'>$ {totalMaxPrice.toFixed(2)}</Card.Text>
                        </div>
                        <div className='rounded' style={{ background: '#3BB77E', padding: '0 10px' }} >
                            <span className='fs-2 text-white'><MdOutlineDataSaverOn /></span>
                        </div>
                    </Card.Body>
                </Card>

                {/* Card for Total Average Price */}
                <Card style={{ width: '25rem' }} className="mb-3">
                    <Card.Body className='d-flex justify-content-between'>
                        <div className='d-flex flex-column' style={{ lineHeight: '15px' }}>
                            <Card.Title className=''>Total Average Price</Card.Title>
                            <Card.Text className='fs-5'>$ {totalAvgPrice.toFixed(2)}</Card.Text>
                        </div>
                        <div className='rounded' style={{ background: '#3BB77E', padding: '0 10px' }} >
                            <span className='fs-2 text-white'><SiMoneygram /></span>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <Container>
                <div className='rounded' style={{ width: '100%', height: '400', background: '#fff', padding: '30px 10px' }}>
                    <div className='d-flex gap-4 mb-3 ms-5'>
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            dateFormat="MMMM d, yyyy"
                            className="custom-date-picker" // Add a class name to target for styling
                        />
                        <span className='d-flex justify-content-center align-items-center fs-5 text-secondary fw-semibold'  >to</span>
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            dateFormat="MMMM d, yyyy"
                            className="custom-date-picker" // Add a class name to target for styling
                        />
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart
                            data={formattedData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <XAxis dataKey="month" tick={tickStyles} tickLine={tickLineStyle} />
                            <YAxis tick={tickStyles} tickLine={tickLineStyle} />
                            <Tooltip />
                            <Area type="monotone" dataKey="min_price" strokeWidth={4} stackId="1" stroke="#8884d8" fill="url(#colorGradients)" />
                            <defs>
                                <linearGradient id="colorGradients" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="64%" stopColor="#2D37485C" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#2D374800" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="max_price" strokeWidth={4} stackId="1" stroke="#4FD1C5" fill="url(#colorGradient)" />
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="54%" stopColor="#4FD1C5" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#4FD1C5" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="avg_price" strokeWidth={4} stackId="1" stroke="#ffc658" fill="#ffc658" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Container>
        </Container>
    );
}

export default Graph;

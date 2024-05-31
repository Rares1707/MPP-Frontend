import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend
} from 'chart.js';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend
)

export function RatingsLineChart({bookTitles, bookRatings}){
    //const bookTitles = listOfBooks.map( (book) => book.title)
    //const bookRatings = listOfBooks.map( (book) => book.rating)
    //console.log(bookTitles)
    //console.log(bookRatings)
    let data = {
        labels: Array.from(bookTitles),
        datasets: [
            {
                label: 'Ratings',
                data: bookRatings,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    if (sessionStorage.getItem("access_token") === null) {
        return (
            <Navigate to="/" />
        );
    }
    return(
        <Line
        data={data}
    />)
}
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend
)

export function RatingsLineChart({listOfBooks}){
    const bookTitles = listOfBooks.map( (book) => book.title)
    const bookRatings = listOfBooks.map( (book) => book.rating)
    let data = {
        labels: bookTitles,
        datasets: [
            {
                label: 'Ratings',
                data: bookRatings,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return(
        <Line
        data={data}
    />)
}
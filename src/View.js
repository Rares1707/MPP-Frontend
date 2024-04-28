import {Link} from 'react-router-dom';
import {CheckConnection} from './CheckConnection';

export function View({book = {title: 'Title', rating: 0, id: 0}}) {
    return (
        <div className='App'>
            <header className='App-header'>
                <section>Id: {book.id}</section>
                <section>Title: {book.title}</section>
                <section>Rating: {book.rating}</section>
                <button>
                    <Link to='/'>Back</Link>
                </button>
            </header>
        </div>
    );
}

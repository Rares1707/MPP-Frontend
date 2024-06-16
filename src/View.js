import {Link, Navigate} from 'react-router-dom';

export function View({book = {title: 'Title', rating: 0, id: 0}}) {
    if (sessionStorage.getItem("access_token") === null) {
        return (
            <Navigate to="/" />
        );
    }
    return (
        <div className='App'>
            <header className='App-header'>
                <section>Id: {book.id}</section>
                <section>Title: {book.title}</section>
                <section>Rating: {book.rating}</section>
                <button>
                    <Link to='/home'>Back</Link>
                </button>
            </header>
        </div>
    );
}

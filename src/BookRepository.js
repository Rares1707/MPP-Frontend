import axios from 'axios';

export class BookRepository {
    constructor() {
        this.httpRequestConfiguration = {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` }
        };
        this.hostAddress = sessionStorage.getItem('hostAddress');
    }

    async getBooks(page, pageSize, sortBooksByRating=false) {
        const type = sortBooksByRating ? 'sorted' : 'notSorted';
        const url = `${this.hostAddress}/books?type=${type}&page=${page}&pageSize=${pageSize}`;
        const response = await axios.get(url, this.httpRequestConfiguration);
        return response.data;
    }

    async addBook(book) {
        const url = `${this.hostAddress}/books`;
        const response = await axios.post(url, book, this.httpRequestConfiguration);
        return response.data;
    }

    async removeBook(bookId) {
        const url = `${this.hostAddress}/book/${bookId}`;
        const response = await axios.delete(url, this.httpRequestConfiguration);
        return response.data;
    }

    async updateBook(bookId, book) {
        const url = `${this.hostAddress}/book/${bookId}`;
        const response = await axios.put(url, book, this.httpRequestConfiguration);
        return response.data;
    }

    async getTitles() {
        const url = `${this.hostAddress}/books?type=titles`;
        const response = await axios.get(url, this.httpRequestConfiguration);
        return response.data;
    }

    async getRatings() {
        const url = `${this.hostAddress}/books?type=ratings`;
        const response = await axios.get(url, this.httpRequestConfiguration);
        return response.data;
    }
}

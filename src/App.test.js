import {render, screen} from '@testing-library/react';
import View from './View';

test('renders learn react link', () => {
    render(<View />);
    const linkElement = screen.getByText(/back/i);
    expect(linkElement).toBeInTheDocument();
});

// components/Navbar.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Navbar', () => {
  it('renders correctly', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the correct number of links', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Navbar />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('renders links with correct href attributes', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Navbar />);
    const homeLink = screen.getByText('home');
    const aboutLink = screen.getByText('about');
    const projectsLink = screen.getByText('projects');
    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(projectsLink).toHaveAttribute('href', '/projects');
  });

  it('applies active class to the active link', () => {
    (usePathname as jest.Mock).mockReturnValue('/about');
    render(<Navbar />);
    const aboutLink = screen.getByText('about');
    expect(aboutLink).toHaveClass('bg-primary text-mainbg');
  });
});
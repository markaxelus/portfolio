import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MobileNav from '../MobileNav';
import { usePathname } from 'next/navigation';

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('MobileNav', () => {
  it('renders links with correct href attributes', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<MobileNav />);
    
    // Open the Sheet component
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    const homeLink = screen.getByText('home');
    const aboutLink = screen.getByText('about');
    const projectsLink = screen.getByText('projects');
    const contactLink = screen.getByText('contact');
    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(projectsLink).toHaveAttribute('href', '/projects');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('applies active class to the active link', () => {
    (usePathname as jest.Mock).mockReturnValue('/contact');
    render(<MobileNav />);
    
    // Open the Sheet component
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    const contactLink = screen.getByText('contact');
    expect(contactLink).toHaveClass('text-primary border-b-2 border-accent');
  });
});
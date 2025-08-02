import React from 'react';
import { render, screen } from '../../test/test-utils';
import ProfileScreen from '../ProfileScreen';

describe('ProfileScreen', () => {
  it('renders profile screen title', () => {
    render(<ProfileScreen />);
    expect(screen.getByText('Profile')).toBeTruthy();
  });

  it('renders user information', () => {
    render(<ProfileScreen />);
    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('john.doe@example.com')).toBeTruthy();
  });

  it('renders ISA information', () => {
    render(<ProfileScreen />);
    expect(screen.getByText('ISA Information')).toBeTruthy();
    expect(screen.getByText('ISA Number:')).toBeTruthy();
    expect(screen.getByText('ISA-2024-001')).toBeTruthy();
  });

  it('renders settings menu', () => {
    render(<ProfileScreen />);
    expect(screen.getByText('Settings')).toBeTruthy();
    expect(screen.getByText('Edit Profile')).toBeTruthy();
    expect(screen.getByText('Contact Support')).toBeTruthy();
  });
});

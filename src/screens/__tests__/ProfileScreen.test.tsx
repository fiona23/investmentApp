import React from 'react';
import { render, screen } from '../../test/test-utils';
import ProfileScreen from '../ProfileScreen';

describe('ProfileScreen', () => {
  it('renders profile screen title', () => {
    render(<ProfileScreen />);
    expect(screen.getByText('Profile Screen')).toBeTruthy();
  });
});

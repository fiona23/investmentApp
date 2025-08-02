import React from 'react';
import { render, screen } from '../../test/test-utils';
import AccountScreen from '../AccountScreen';

describe('AccountScreen', () => {
  it('renders account screen title', () => {
    render(<AccountScreen />);
    expect(screen.getByText('Account Screen')).toBeTruthy();
  });
});

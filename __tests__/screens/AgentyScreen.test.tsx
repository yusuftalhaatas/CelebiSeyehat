import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AgentyScreen, {AgentyScreenProps} from '../../src/screens/AgentyScreen';

describe('AgentyScreen', () => {
  it('should navigate to UserInputScreen when "USER PROCESSES" button is pressed', () => {
    const mockNavigation = {navigate: jest.fn()} as any;
    const props: any = {navigation: mockNavigation};

    const {getByText} = render(<AgentyScreen {...props} />);
    const userProcessesButton = getByText('USER PROCESSES');

    fireEvent.press(userProcessesButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('UserInputScreen');
  });

  it('should navigate to FirmsScreen when "FIRM PROCESSES" button is pressed', () => {
    const mockNavigation = {navigate: jest.fn()};
    const props: any = {navigation: mockNavigation};

    const {getByText} = render(<AgentyScreen {...props} />);
    const firmProcessesButton = getByText('FIRM PROCESSES');

    fireEvent.press(firmProcessesButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('FirmsScreen');
  });
});

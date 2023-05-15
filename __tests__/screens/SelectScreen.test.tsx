import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SelectScreen from '../../src/screens/SelectScreen';

describe('SelectScreen', () => {
  it('should navigate to TicketBuyScreen when "BUY TRANSPORT TICKET" button is pressed', () => {
    const mockNavigation = {navigate: jest.fn()} as any;
    const props: any = {navigation: mockNavigation};

    const {getByText} = render(<SelectScreen {...props} />);
    const buyTicketButton = getByText('BUY TRANSPORT TICKET');

    fireEvent.press(buyTicketButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('TicketBuyScreen');
  });

  it('should navigate to HotelReserveScreen when "HOTEL RESERVE" button is pressed', () => {
    const mockNavigation = {navigate: jest.fn()};
    const props: any = {navigation: mockNavigation};

    const {getByText} = render(<SelectScreen {...props} />);
    const hotelReserveButton = getByText('HOTEL RESERVE');

    fireEvent.press(hotelReserveButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('HotelReserveScreen');
  });

  it('should navigate to UserTicketsHotelsScreen when "USERS TICKETS/HOTELS" button is pressed', () => {
    const mockNavigation = {navigate: jest.fn()};
    const props: any = {navigation: mockNavigation};
    const {getByText} = render(<SelectScreen {...props} />);
    const userTicketsButton = getByText('USERS TICKETS/HOTELS');

    fireEvent.press(userTicketsButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'UserTicketsHotelsScreen',
    );
  });
});

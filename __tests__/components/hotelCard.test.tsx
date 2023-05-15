import React from 'react';
import {render} from '@testing-library/react-native';
import HotelCard from '../../src/components/hotelCard';

describe('components/HotelCard', () => {
  test('renders correctly', () => {
    const hotelData = {
      firmName: 'Test Hotel',
      city: 'Test City',
      firmType: 'Hotel',
      roomNo: '101',
      date: '2023-05-15',
      name: 'Test Name',
    };

    const {getByText, toJSON} = render(<HotelCard {...hotelData} />);

    // snapshot test
    expect(toJSON()).toMatchSnapshot();

    // Check if all fields are displayed correctly
    expect(getByText(`Name: ${hotelData.name}`)).toBeDefined();
    expect(getByText(`Hotel Name: ${hotelData.firmName}`)).toBeDefined();
    expect(getByText(`Date: ${hotelData.date}`)).toBeDefined();
    expect(getByText(`Room No: ${hotelData.roomNo}`)).toBeDefined();
    expect(getByText(`City: ${hotelData.city}`)).toBeDefined();
  });
});

import React from 'react';
import {render} from '@testing-library/react-native';

import TicketCard from '../../src/components/ticketCard';

describe('components/TicketCard', () => {
  test('renders correctly', () => {
    const ticketData = {
      date: '2023-05-15',
      start: 'Test Start',
      finish: 'Test Finish',
      firmName: 'Test Firm',
      no: 'A101',
      name: 'Test Name',
    };

    const {getByText, toJSON} = render(<TicketCard {...ticketData} />);

    // snapshot test
    expect(toJSON()).toMatchSnapshot();

    // Check if all fields are displayed correctly
    expect(getByText(`Name: ${ticketData.name}`)).toBeDefined();
    expect(getByText(`Firm: ${ticketData.firmName}`)).toBeDefined();
    expect(getByText(`${ticketData.start}-${ticketData.finish}`)).toBeDefined();
    expect(getByText(`Date:${ticketData.date}`)).toBeDefined();
    expect(getByText(`Seat No:${ticketData.no}`)).toBeDefined();
  });
});

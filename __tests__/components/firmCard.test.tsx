import React from 'react';
import {render} from '@testing-library/react-native';
import FirmCard from '../../src/components/firmCard';
import {firm} from '../../src/types/firm';

describe('components/FirmCard', () => {
  test('renders correctly', () => {
    const firm: firm = {
      firmName: 'Test Firm',
      firmType: 'transport',
      discountRate: 20,
    };

    const {getByText, toJSON} = render(<FirmCard {...firm} />);

    // snapshot test
    expect(toJSON()).toMatchSnapshot();

    // props test
    expect(getByText('Test Firm')).toBeDefined();
    expect(getByText('Discount:%20')).toBeDefined();
  });
});

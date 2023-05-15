import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import FirmTypeButton from '../../src/components/firmTypeButton';

describe('components/FirmTypeButton', () => {
  test('renders correctly and responds to onPress', () => {
    const onPressMock = jest.fn();
    const {getByText, toJSON} = render(
      <FirmTypeButton name="Test Button" onPress={onPressMock} />,
    );

    // snapshot test
    expect(toJSON()).toMatchSnapshot();

    // onPress event test
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalled();
  });
});

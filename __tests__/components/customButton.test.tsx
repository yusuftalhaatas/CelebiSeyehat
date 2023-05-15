import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomButton from '../../src/components/customButton';

describe('components/CustomButton', () => {
  test('renders correctly and responds to press events', () => {
    const onPressMock = jest.fn();
    const {getByText, toJSON} = render(
      <CustomButton title="Test Button" onPress={onPressMock} />,
    );

    // snapshot test
    expect(toJSON()).toMatchSnapshot();

    // onPress event test
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  test('renders correctly when disabled', () => {
    const onPressMock = jest.fn();
    const {getByText, toJSON} = render(
      <CustomButton title="Test Button" onPress={onPressMock} disabled />,
    );

    // snapshot test
    expect(toJSON()).toMatchSnapshot();

    // onPress event should not trigger
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});

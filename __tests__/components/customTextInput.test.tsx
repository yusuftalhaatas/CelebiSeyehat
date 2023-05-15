import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomInput from '../../src/components/customTextInput';

describe('components/CustomInput', () => {
  test('renders correctly and responds to text changes', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText, toJSON} = render(
      <CustomInput
        placeHolder="Test Input"
        onChangeText={onChangeTextMock}
        value=""
      />,
    );

    // snapshot test
    expect(toJSON()).toMatchSnapshot();

    // onChangeText event test
    fireEvent.changeText(getByPlaceholderText('Test Input'), 'test');
    expect(onChangeTextMock).toHaveBeenCalledWith('test');
  });
});

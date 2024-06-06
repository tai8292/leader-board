import React, {useCallback, useState} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {isEmpty} from 'lodash';

export type InputProps = {
  inputStyle?: StyleProp<ViewStyle>;
  label?: string;
  disabled?: boolean;
  innerInputComponent?: any;
  readOnly?: boolean;
  leftIcon?: React.ComponentType<any>;
  prefixText?: string;
} & TextInputProps;

export type InputValidateHookOptions = {
  error?: string;
  value?: string;
};

export type InputValidateHook = {
  hasError: boolean;
  isValid: boolean;
  validateIcon: any;
};

const Input: React.FC<InputProps> = React.forwardRef(
  (
    {
      style,
      inputStyle,
      label,
      value,
      disabled,
      innerInputComponent,
      readOnly,
      onFocus,
      onBlur,
      leftIcon,
      prefixText,
      ...props
    },
    ref,
  ) => {
    const hasLeftIcon = !!leftIcon;
    const hasLabel = !isEmpty(label);
    const [focus, setFocus] = useState<boolean>(false);

    const handleOnFocus = useCallback(
      (e: any) => {
        setFocus(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleOnBlur = useCallback(
      (e: any) => {
        setFocus(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    return (
      <View style={[styles.root, style]}>
        {hasLabel && <Text>{label}</Text>}
        <View style={[styles.inputWrapper, focus && styles.focus]}>
          {!!prefixText && <Text style={styles.prefixText}>{prefixText}</Text>}
          {hasLeftIcon && (
            <Image style={styles.leftIcon} source={leftIcon as any} />
          )}
          <TextInput
            {...props}
            style={[
              styles.input,
              disabled && styles.disabled,
              hasLeftIcon && styles.leftIconVisible,
              readOnly && styles.readOnly,
              inputStyle as any,
            ]}
            value={value}
            placeholderTextColor={'#D5D5DC'}
            {...((disabled || readOnly) && {
              editable: false,
            })}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            ref={ref as any}
          />
          {innerInputComponent}
        </View>
      </View>
    );
  },
);

export default Input;

const styles = StyleSheet.create({
  root: {
    marginBottom: 40,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
  input: {
    fontWeight: '400',
    fontSize: 14,
    height: '100%',
    width: '100%',
    color: 'black',
    textAlignVertical: 'center',
  },
  disabled: {
    backgroundColor: '#F8F9FA',
  },
  focus: {
    borderColor: '$FF5A00',
  },
  leftIconVisible: {
    paddingLeft: 48,
  },
  readOnly: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: '#B5B5BE',
    fontSize: 18,
    paddingHorizontal: 0,
    paddingTop: 6,
    paddingBottom: 12,
  },
  prefixText: {
    marginRight: 8,
  },
  leftIcon: {
    position: 'absolute',
    left: 15,
    width: 16,
    height: 16,
  },
});

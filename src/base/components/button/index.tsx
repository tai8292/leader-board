import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  Text,
} from 'react-native';
import Touchable, {TouchableProps} from '../touchable';

export type ButtonProps = {
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ComponentType<any>;
  rightIcon?: React.ComponentType<any>;
  iconSize?: number;
  title?: string;
  loading?: boolean;
  disabled?: boolean;
  touchable?: boolean;
  variant?: 'default' | 'rounded';
} & TouchableProps;

const Button: React.FC<ButtonProps> = ({
  style,
  textStyle,
  iconSize = 24,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  title,
  loading,
  disabled,
  touchable = true,
  children,
  ...props
}) => {
  return (
    <Touchable
      style={[styles.root, style]}
      disabled={!touchable || disabled || loading}
      {...props}>
      {LeftIcon && <LeftIcon width={iconSize} height={iconSize} />}
      {loading && <ActivityIndicator animating size={24} color={'blue'} />}
      {!!title && (
        <Text style={[styles.title, textStyle]} testID={props.testID}>
          {title}
        </Text>
      )}
      {RightIcon && <RightIcon width={iconSize} height={iconSize} />}
      {children}
    </Touchable>
  );
};

export default Button;

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: '#171725',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#171725',
  },
  title: {
    color: 'white',
  },
});

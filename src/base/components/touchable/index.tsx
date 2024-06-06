import React, {ComponentType} from 'react';
import {
  Platform,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {TouchableOpacity as RNGHTouchableOpacity} from 'react-native-gesture-handler';

export type TouchableProps = {
  useGestureHandlerTouchable?: boolean;
} & TouchableOpacityProps;

const Touchable: React.FC<TouchableProps> = React.forwardRef(
  (
    {
      activeOpacity = Platform.OS === 'android' ? 0.7 : undefined,
      useGestureHandlerTouchable,
      ...props
    },
    ref,
  ) => {
    const TouchableOpacity: ComponentType<any> = useGestureHandlerTouchable
      ? RNGHTouchableOpacity
      : RNTouchableOpacity;

    return (
      <TouchableOpacity
        ref={ref as any}
        activeOpacity={activeOpacity}
        {...props}
      />
    );
  },
);

export default Touchable;

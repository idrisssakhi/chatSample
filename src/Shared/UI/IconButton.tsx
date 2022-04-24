import React, {ReactElement} from 'react';
import {
  Image,
  ImageRequireSource,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  icon: ImageRequireSource;
  onPress?: () => void;
  disabled?: boolean;
}

export const IconButton = ({onPress, icon, disabled}: Props): ReactElement => {
  return (
    <TouchableOpacity
      style={styles.defaultStyle}
      accessibilityRole="button"
      onPress={onPress}
      hitSlop={{top: 4, left: 4, right: 4, bottom: 4}}
      disabled={disabled}>
      <Image source={icon} />
    </TouchableOpacity>
  );
};

IconButton.defaultProps = {
  disabled: false,
  noPadding: false,
};

const styles = StyleSheet.create({
  defaultStyle: {
    display: 'flex',
    width: 45,
    height: 45,
    backgroundColor: '#FFFFFF',
    marginLeft: 8,
  },
});

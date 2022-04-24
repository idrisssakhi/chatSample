import React, {PropsWithChildren, ReactElement} from 'react';
import {
  InputAccessoryView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS} from '../Constants';
import {InputComponent} from './InputComponent';

interface Props {
  onNewMessage: (text: string) => void;
}

export const ChatWrapper = ({
  children,
  onNewMessage,
}: PropsWithChildren<Props>): ReactElement => {
  const {top: topInsets, bottom: bottomInsets} = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    paddingTop: topInsets,
    paddingBottom: bottomInsets,
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <View style={[StyleSheet.absoluteFill, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <KeyboardAvoidingView
        style={styles.fullFlex}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        {children}
        <InputComponent onSend={onNewMessage} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
});

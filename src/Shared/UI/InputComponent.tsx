import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import {isIOS} from '../Constants';
import {IconButton} from './IconButton';

interface Props {
  onSend: (value: string) => void;
  testID?: string;
}

export const InputComponent = ({onSend, testID}: Props) => {
  const [text, setText] = useState('');

  const sendButtonDisabled = useMemo(() => !text.trim(), [text]);

  const onTextChange = useCallback((newValue: string) => {
    setText(newValue);
  }, []);

  const onSubmit = useCallback(() => {
    onSend(text.trim());
    setText('');
  }, [onSend, text]);

  return (
    <View testID={testID} style={styles.container}>
      <TextInput
        placeholder={'Entrer un text a envoyer'}
        value={text}
        multiline
        onChangeText={onTextChange}
        style={styles.textInputContainer}
      />
      <IconButton
        noPadding
        onPress={onSubmit}
        icon={
          sendButtonDisabled
            ? require('../../../assets/chat-send-button/disabled-send-button.png')
            : require('../../../assets/chat-send-button/enabled-send-button.png')
        }
        disabled={sendButtonDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  textInputContainer: {
    flex: 1,
    minHeight: 45,
    maxHeight: 121,
    textAlignVertical: 'center',
    paddingTop: isIOS ? 12 : 8.6,
    paddingBottom: isIOS ? 12 : 8.6,
    borderRadius: 24,
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 12,
    color: '#333333',
    overflow: 'hidden',
    fontSize: 16,
    letterSpacing: 0.25,
  },
  sendButton: {
    marginLeft: 8,
  },
});

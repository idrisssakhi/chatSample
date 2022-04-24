import React, {memo, ReactElement, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator,
} from 'react-native';

import {Comment} from '../Shared/Api';
import {myEmail} from '../Shared/Constants';
import {useCommentsLogic} from '../Shared/Logic';
import {activateAwakeMode, deactivateAwakeMode} from '../Shared/Native';
import {ChatWrapper} from '../Shared/UI';

const CommentCard = memo(({comment}: {comment: Comment}) => {
  const isMyEmail = comment.email === myEmail;
  return (
    <View
      style={[
        styles.commentCardContainer,
        isMyEmail && styles.myCommentCardContainer,
      ]}>
      <Text style={styles.textStyle}>{comment.body}</Text>
    </View>
  );
});

export const ChatScreen = (): ReactElement => {
  const {comments, fetchNextPage, hasNextPage, isLoading, addComment} =
    useCommentsLogic();

  useEffect(() => {
    activateAwakeMode();
    return () => {
      deactivateAwakeMode();
    };
  }, []);

  const onNewMessage = useCallback(
    (text: string) => {
      addComment(text);
    },
    [addComment],
  );

  const renderItem = useCallback(({item}: ListRenderItemInfo<Comment>) => {
    return <CommentCard key={`comment-${item.id}`} comment={item} />;
  }, []);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isLoading]);

  return (
    <ChatWrapper onNewMessage={onNewMessage}>
      <FlatList
        inverted
        data={comments}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onEndReachedThreshold={0.01}
        onEndReached={onEndReached}
        {...(isLoading && {
          ListFooterComponent: (
            <ActivityIndicator
              testID={'pageFetchingIndicator'}
              size="large"
              color={'#0085f2'}
              style={styles.activityIndicator}
            />
          ),
        })}
        keyboardDismissMode="on-drag"
      />
    </ChatWrapper>
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingHorizontal: 12,
  },
  commentCardContainer: {
    maxWidth: '80%',
    marginVertical: 2,
    borderRadius: 12,
    backgroundColor: '#333333',
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  myCommentCardContainer: {
    backgroundColor: '#0085f2',
    alignSelf: 'flex-end',
  },
  textStyle: {
    fontSize: 16,
    letterSpacing: 0.25,
    color: 'white',
  },
  activityIndicator: {
    marginTop: 16,
    alignItems: 'center',
    marginBottom: 24,
    transform: [
      {
        scale: 0.85,
      },
    ],
  },
});

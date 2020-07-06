import React from 'react';
import IsMe from './IsMe';
import Other from './Other';

const ChatItem = ({isMe}) => {
  if (isMe === true) {
    return <IsMe />;
  }
  return <Other />;
};

export default ChatItem;

import React from 'react';
import IsMe from './IsMe';
import Other from './Other';

const ChatItem = ({isMe, text, date, photo}) => {
  if (isMe === true) {
    return <IsMe text={text} date={date} />;
  }
  return <Other />;
};

export default ChatItem;

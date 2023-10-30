import styled from '@emotion/styled';
import { MessageWrap, Message } from '../../style/style';

function MessageBox({ chat, isMine }) {
  return (
    <MessageWrap className={isMine ? 'chat-mine' : 'chat-other'}>
      <span>
        <b>{chat.userId}</b>[ {chat.date} ]
      </span>
      <Message>{chat.message}</Message>
    </MessageWrap>
  );
}

export default MessageBox;

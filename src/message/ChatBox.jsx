import styled from '@emotion/styled';

function MessageBox({ chat, isMine }) {
  return (
    <ChatWrap className={isMine ? 'chat-mine' : 'chat-other'}>
      <span>
        <b>{chat.userId}</b>[ {chat.date} ]
      </span>
      <Chat>{chat.message}</Chat>
    </ChatWrap>
  );
}

const ChatWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  &.chat-mine {
    align-items: flex-end;
  }
`;

const Chat = styled.div`
  width: fit-content;
  min-width: 30px;
  max-width: 300px;
  height: 30px;
  background-color: #fef102;
  position: relative;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 7px;
  &:before {
    border: 6px solid transparent;
    border-right-color: #fef102;
    content: '';
    position: absolute;
    top: 8px;
    left: -11px;
  }
`;

export default MessageBox;

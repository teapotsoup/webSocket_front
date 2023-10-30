import styled from '@emotion/styled';

export const ChatWrap = styled.div`
  width: 50%;
  min-width: 500px;
  margin: 0 auto;
  background-color: #535252;

  & input {
    width: 100%;
    height: 24px;
    border: 1px solid #ebebeb;
  }
`;

export const Chatting = styled.div`
  width: 100%;
  height: 640px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  border: 1px solid #ebebeb;
  padding: 5px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #eeeeee;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #d3d3d3;
  }
`;

export const ChatSendWrap = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid #ebebeb;
  & button {
    width: 60px;
    background-color: white;
    border: none;
  }

  & textarea {
    width: 100%;
    height: 60px;
    resize: none;
    border: none;
    border-right: 1px solid #ebebeb;
  }
`;

export const MessageWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  &.chat-mine {
    align-items: flex-end;
  }
`;

export const Message = styled.div`
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

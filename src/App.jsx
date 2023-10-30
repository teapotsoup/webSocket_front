import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import MessageBox from './message/ChatBox.jsx';
import styled from '@emotion/styled';

function App() {
  const ws = useRef(null);

  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [chatList, setChatList] = useState([]);
  const [socketData, setSocketData] = useState();

  useEffect(() => {
    console.log(socketData);
    if (socketData) {
      setChatList(prevState => [...prevState, socketData]);
    }
  }, [socketData]);

  useEffect(() => webSocketLogin(), []);

  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket('ws://localhost:8080/socket/chat');

    ws.current.onmessage = message => {
      const dataSet = JSON.parse(message.data);
      setSocketData(dataSet);
    };
  }, []);

  const send = () => {
    if (message.trim() === '') {
      alert('메세지를 입력해 주세요.');
      document.getElementById('message').focus();
      return;
    }

    if (ws.current === null) {
      alert('웹소켓을 연결해 주세요.');
      return;
    }

    const sendData = JSON.stringify({
      userId: userId ?? '익명',
      message,
      date: new Date().toLocaleString(),
    });

    if (ws.current.readyState === 0) {
      ws.current.onopen = () => ws.current.send(sendData);
    } else {
      ws.current.send(sendData);
    }

    setMessage('');
  };

  return (
    <ChatWrap>
      <Chatting>
        <div className="talk-shadow"></div>
        {chatList.map((chat, i) => {
          return <MessageBox key={chat.date + i} chat={chat} isMine={chat.userId === userId} />;
        })}
      </Chatting>
      <input
        placeholder="아이디"
        id="userId"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      />
      <ChatSendWrap>
        <textarea
          id="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') send();
          }}
        ></textarea>
        <button onClick={send}>✅</button>
      </ChatSendWrap>
    </ChatWrap>
  );
}

const ChatWrap = styled.div`
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

const Chatting = styled.div`
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

const ChatSendWrap = styled.div`
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

export default App;

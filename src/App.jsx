import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import MessageBox from './message/ChatBox.jsx';
import styled from '@emotion/styled';
import { ChatWrap, Chatting, ChatSendWrap } from '../style/style';
function App() {
  const ws = useRef(null);

  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [chatList, setChatList] = useState([]);
  const [socketData, setSocketData] = useState();

  useEffect(() => {
    // console.log(socketData);
    if (socketData) {
      setChatList(prevState => [...prevState, socketData]);
    }
  }, [socketData]);

  useEffect(() => {
    webSocketLogin(); // 켰을 때 한번만
  }, []);

  const webSocketLogin = useCallback(() => {
    console.log('!');
    ws.current = new WebSocket('ws://localhost:8080/socket/chat');
    // websocket은 웹 API에서 지원해주기 때문에 별도의 써드파티 API나 라이브러리를 가져올 필요 없음
    // console.log('ws.current : ', ws.current);
    // {onclose,onerror,onmessage,url....}
    ws.current.onmessage = message => {
      // 백엔드에서 데이터를 보내주고 해당 부분만 실행
      // webSocketLogin 함수 전체가 실행 되는 것이 아니다.
      console.log(' message : ', message);
      const dataSet = JSON.parse(message.data);
      // {date: "",message:"",userId:""}
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
      // 2. 발동하게 하는 법
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

export default App;

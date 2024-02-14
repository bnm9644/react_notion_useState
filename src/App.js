import { useState } from 'react';
import './App.css';

const heavyWork = () => {
  console.log("렌더링");
  return ["a","b"];
}

function App() {
  // 초기 값을 가져오기 위해 작업을 해야 한다면 바로 안에 값이 아닌 Callback 함수로 return 한다. 
  const [words , setWords] = useState(() => { 
    return heavyWork();
  });
  const [input , setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  }  

  const handleUpload = () => {
    // 콜백을 줌... 단 인자로는 아까 사용 했던 list 를 준다.
    setWords((prevState) => {
      console.log(`이전 state : ` + prevState);
      return(
        [input, ...prevState]
      );    
    });
  }

  return (
    <div>
      <input type= "text" value={input} onChange={handleChange}/>
      <button onClick = {handleUpload}>Upload</button>
      {words.map((words ,idx) =>{
        return <p key={idx}>{words}</p>
      })}
    </div>       
  );
}

export default App;


/* 
  useState : 리액트 제일 기본, state(상태)
  - const [state , setState] = useState(초기값)
  - setState로 state 변경할때 마다 컴포넌트가 Update 하고 렌더링

  // state 변경 할때 새로 변경될 state 값이 이전 state 값과 연결이 되어 있다면 setState 인자로 새로운 state를 return하는 callback 함수를 주면 됨

  // useState 를 사용하여 초기값 받아 올때 무거운 작업을 해야 할 경우는 useState의 인자로 callback 함수를 주면 맨 처음 렌더링이 될 때만 실행

  setState((prevState) => {
    return newState;
  })


  function App() {

  const [time, setTime] = useState(1);

  const handleClick = () => {
    let hour;
    if(time >= 12) {
      hour = 1;      
    } else {
      hour = time + 1;
    }
    setTime(hour);
    //setState 하는 순간 Update 하고 렌더링
  };

  return (
    <div>
      <span>현재 시각 : {time} 시</span>
      <button onClick={handleClick}>
        Update
      </button>
    </div>
  );
}


 */

import {useState, useRef} from 'react';
import ResultModal from './ResultModal.jsx'

export default function TimerChallenge ({ title, targetTime }) {

  const [timeRemaning, setTimeRemaning] = useState(targetTime * 1000);

  const timer = useRef();
  const dialog = useRef();

  const timeIsActive = timeRemaning > 0 && timeRemaning < targetTime * 1000;

  if(timeRemaning <= 0) {
    clearInterval(timer.current);
    setTimeRemaning(targetTime * 1000);
    dialog.current.open();
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaning((prevTimeRemaning) => prevTimeRemaning - 10)
    }, 10 );

    setTimerStarted(true);
  }

  function handleClear() {
    clearInterval(timer.current)
    dialog.current.open();
  }
  
  return {
    <>
      {timeRemaning && <ResultModal ref={dialog} result="lost" targetTime={targetTime} />}
    <section className="challenge">
      <h2>{title}</h2>
      {timeRemaning && <p>You lost</p>}
      <p className="challenge-time">
        {targetTime} second {targetTime > 1 ? 's' : ''}
      </p>
      <p>
        <button onClick={handleStart}>
          { timeRemaning ? 'Stop' : 'Start' } Challenge
        </button>
      </p>
      <p className={timerExpired ? 'active' : undefined}>
        {timeRemaning ? 'Time is running...' : 'Timer inactive'}
      </p>
    </section>
    </>
  }

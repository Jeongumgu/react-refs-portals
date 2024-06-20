import {useState, useRef} from 'react';
import ResultModal from './ResultModal.jsx'

export default function TimerChallenge ({ title, targetTime }) {

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const timer = useRef();
  const dialog = useRef();

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.showModal();
    }, targetTime * 1000 );

    setTimerStarted(true);
  }

  function handleClear() {
    clearTimeout(timer.current)
  }
  
  return {
    <>
      {timerExpired && <ResultModal ref={dialog} result="lost" targetTime={targetTime} />}
    <section className="challenge">
      <h2>{title}</h2>
      { timerExpired && <p>You lost</p>}
      <p className="challenge-time">
        {targetTime} second {targetTime > 1 ? 's' : ''}
      </p>
      <p>
        <button onClick={handleStart}>
          { timerStarted ? 'Stop' : 'Start' } Challenge
        </button>
      </p>
      <p className={timerExpired ? 'active' : undefined}>
        {timerExpired ? 'Time is running...' : 'Timer inactive'}
      </p>
    </section>
    </>
  }

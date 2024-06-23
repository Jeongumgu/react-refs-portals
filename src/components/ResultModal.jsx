import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ result, targetTime, remaningTime, onReset}, ref) {
  const dialog = useRef();

  const userLost = remaningTime <= 0;

  const formattedRemaningTime = (remaningTime / 1000).toFixed(2);
  const score = Math.round((1 - remaningTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    }
  });
  
  return (
    <dialog ref={ref} className="result-modal">
      {userLost && <h2>You {result} </h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{ targetTime }</strong> seconds.
      </p>
      <p>
        You stopped the timer with <strong>{formattedRemaningTime}</strong> seconds left.
      </p>
      <form method="dialog" onSubmit={onReset} onClose={onReset}>
        <button>close</button>
      </form>
    </dialog>
    )
})

export default ResultModal;

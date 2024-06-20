import { forwardRef, useImperativeHandle, useRef } from 'react';

const ResultModal = forwardRef(function ResultModal({ targetTime, remaningTime}, ref) {
  const dialog = useRef();

  const userLost = remaningTime <= 0;

  const formattedRemaningTime = (remaningTime / 1000).toFixed(2);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    }
  });
  
  return (
    <dialog ref={ref} className="result-modal">
      {userLost && <h2>You lost </h2>}
      <p>
        The target time was <strong>{ targetTime }</strong> seconds.
      </p>
      <p>
        You stopped the timer with <strong>{formattedRemaningTime}</strong> seconds left.
      </p>
      <form method="dialog">
        <button>close</button>
      </form>
    </dialog>
    )
})

export default ResultModal;

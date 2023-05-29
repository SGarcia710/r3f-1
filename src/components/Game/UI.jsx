import { useKeyboardControls } from '@react-three/drei';
import React, { useRef } from 'react';
import useGame from './stores/useGame';
import { addEffect } from '@react-three/fiber';
import { useEffect } from 'react';

const UI = () => {
  const restartGame = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  // We are going to update the timer without re-render the component
  const timerRef = useRef();

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    const unsubEffect = addEffect(() => {
      const state = useGame.getState();

      let elapseTime = 0;

      if (state.phase === 'playing') {
        elapseTime = Date.now() - state.startTime;
      } else if (state.phase === 'ended') {
        elapseTime = state.endTime - state.startTime;
      }

      elapseTime /= 1000;
      elapseTime = elapseTime.toFixed(2);

      if (timerRef.current) {
        timerRef.current.textContent = elapseTime;
      }
    });

    return () => {
      unsubEffect();
    };
  }, []);

  return (
    <div className="ui">
      <p ref={timerRef} className="timer">
        0.00
      </p>

      {phase === 'ended' && (
        <div onClick={restartGame} className="restartButton">
          RESTART
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key${forward ? ' active' : ''}`}></div>
        </div>
        <div className="raw">
          <div className={`key${leftward ? ' active' : ''}`}></div>
          <div className={`key${backward ? ' active' : ''}`}></div>
          <div className={`key${rightward ? ' active' : ''}`}></div>
        </div>
        <div className="raw">
          <div className={`key large${jump ? ' active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export default UI;

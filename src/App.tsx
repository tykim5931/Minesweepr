import React from 'react';
import './App.css';
import {Settings, Board, Status} from './containers';
import { Canvas, Wrapper, Title } from './style';


function App() {
  return (
    <Canvas>
      <Wrapper>
        <Title>MineSweeper</Title>
        <Settings></Settings>
        <Board></Board>
        <Status></Status>
      </Wrapper>
    </Canvas>
  );
}

export default App;

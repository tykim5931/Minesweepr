import React, { Component } from 'react';
import './App.css';
import Board from './components/gameboard/Board';
import { Canvas, Wrapper, Title } from './style';


class App extends Component {
  render(): React.ReactNode {
    return (
      <Canvas>
        <Wrapper>
          <Title>MineSweeper</Title>
          <Board></Board>
        </Wrapper>
      </Canvas>
    );
  }
}

export default App;

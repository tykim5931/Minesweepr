import React, { Component } from 'react';
import './App.css';
import {Board, OptionBar} from './components';
import { Canvas, Wrapper, Title } from './AppStyle';


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

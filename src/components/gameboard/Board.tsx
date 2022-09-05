import React, { Component } from "react";
import { Container } from "../style";
import {MINE} from '../../constants'
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { CellContainer , BoardContainer} from "../style";

interface Cell {
  text: string,
  classList: string,
  isFirst: boolean,
  state: number,
}

const Board = () => {
  const dispatch = useDispatch()

  const boardObj = useSelector((state:RootState) => state.board)

  const renderObj = () => {
    let cellarray = Object.keys(boardObj.cells).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    return cellarray.map((key) => {
      return (
        <CellContainer 
          id={key} 
          className='cell'
          key={key}
          onClick={() => {console.log("clicked")}}
        >
          {boardObj.cells[key].state}
        </CellContainer>
      )
    })
  }
  return (
      <BoardContainer rowCount={8}>
          {renderObj()}
      </BoardContainer>
  );
};

export default Board;
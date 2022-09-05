import React, { Component } from "react";
import { Container } from "../style";
import {MINE} from '../../constants'
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { CellContainer , BoardContainer} from "../style";
import { cellClicked, createMines } from "./boardSlice";

interface Cell {
  text: string,
  classList: string,
  isFirst: boolean,
  state: number,
}

const Board = () => {
  const dispatch = useDispatch()

  const boardObj = useSelector((state:RootState) => state.board)
  
  const onCellClicked = (e:any) => {
    if(boardObj.isInit === true) {
      dispatch(createMines({level: boardObj.level, thisKey: e.target.id}));
    }
    dispatch(cellClicked( e.target.id ));
  }

  const renderObj = () => {
    let cellarray = Object.keys(boardObj.cells).sort((a, b) => {
      const [a_row, a_col] = a.split(",");
      const [b_row, b_col] = b.split(",");
      if(a_row !== b_row){
        return parseInt(a_row,10) - parseInt(b_row);
      } else return parseInt(a_col,10) - parseInt(b_col);
    });
    return cellarray.map((key) => {
      return (
        <CellContainer 
          id={key} 
          className={boardObj.cells[key].cellType}
          key={key}
          onClick={onCellClicked}
        >
          {boardObj.cells[key].text}
        </CellContainer>
      )
    })
  }
  return (
      // rowWidth = number of columns
      <BoardContainer rowCount={boardObj.level[1]}>
          {renderObj()}
      </BoardContainer>
  );
};

export default Board;
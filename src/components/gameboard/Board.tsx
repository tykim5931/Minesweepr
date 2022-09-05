import React, { Component, useState } from "react";
import { Container } from "../style";
import {MINE} from '../../constants'
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { CellContainer , BoardContainer} from "../style";
import { cellClicked, createMines, toggleFlag, setStartTime, setGameOver} from "./boardSlice";

import OptionBar from "../optionbar/OptionBar";
import 'moment/locale/ko';
import {useInterval} from 'react-use';

import "../style.css"


const Board = () => {
  const dispatch = useDispatch()

  const boardObj = useSelector((state:RootState) => state.board)
  let nowTime = boardObj.startTime;

  const onCellClicked = (e:any) => {
    if(boardObj.gameEnd === true) {
      // inform that game has ended, do nothing.
      nowTime = seconds; // stop timer
      return;
    }
    if(boardObj.isInit === true) {
      dispatch(setStartTime(seconds)); // set game started time!
      dispatch(createMines({level: boardObj.level, thisKey: e.target.id}));
    }
    dispatch(cellClicked( e.target.id ));
  }

  const onFlagSet = (e:any) => {
    e.preventDefault();
    if(boardObj.isInit === true || boardObj.gameEnd === true) return;
    const key = e.target.id;
    if (boardObj.cells[key].cellType === 'openedCell') return;
    else dispatch(toggleFlag( key ));
  }

  // align Cells
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
          onContextMenu={onFlagSet}
        >
          {boardObj.cells[key].text}
        </CellContainer>
      )
    })
  }


  // Timer
  const [seconds, setSeconds] = useState(Date.now());
  useInterval(() => {
    setSeconds(Date.now());
  }, 1000);

  function fillZero(width:number, str:string){  // time formatter
    return str.length >= width ? str:new Array(width-str.length+1).join('0')+str;
  }
  const getPlayTime = () => {
    if (boardObj.opened===0){ // game has not started yet!
      return "00:00";
    }
    
    if (boardObj.gameEnd === true){
      const nowSecs = Math.round((boardObj.gameOverTime - boardObj.startTime) / 1000);
      const nowMinute = Math.round(nowSecs / 60);
      const nowSec = Math.round(nowSecs % 60);
      return `${fillZero(2, String(nowMinute))}:${fillZero(2, String(nowSec))}`
    }
    else{
      const nowSecs = Math.round((seconds - boardObj.startTime) / 1000);
      const nowMinute = Math.round(nowSecs / 60);
      const nowSec = Math.round(nowSecs % 60);
      if(nowMinute > 60){
        dispatch(setGameOver(Date.now()))
      }
      return `${fillZero(2, String(nowMinute))}:${fillZero(2, String(nowSec))}`
    }
  }

   
  return (
    <div>
      <OptionBar time={getPlayTime()}></OptionBar>
      <BoardContainer rowCount={boardObj.level[1]}>
          {renderObj()}
      </BoardContainer>
    </div>
  );
};

export default Board;
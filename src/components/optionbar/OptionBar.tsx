import { OptionWrapper } from "../style";
import {LEVEL} from '../../constants'
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { createDummy, setGameOver } from "../gameboard/boardSlice";
import moment from 'moment';
import 'moment/locale/ko';
import {useInterval} from 'react-use';

import "../style.css"
import { useState } from "react";


const OptionBar = ({time}:{time:string})  => {
  const dispatch = useDispatch()
  const boardObj = useSelector((state:RootState) => state.board)

  // GameOption
  const onLevelChange = (e:any) => {
    if(e.target.value === 'B') dispatch(createDummy(LEVEL.BEGINNER));
    else if(e.target.value === 'I') dispatch(createDummy(LEVEL.INTERMEDIATE));
    else if(e.target.value === 'E') dispatch(createDummy(LEVEL.EXPERT));
  }

  // GameState
  const onClickIcon = () => {
    dispatch(createDummy(boardObj.level));  // reset Game
  }
  let stateIcon = boardObj.gameEnd? '😓': '😶';
  if (boardObj.opened >= boardObj.level[0]*boardObj.level[1]-boardObj.level[2]-1) { // if opened >= row*col - mines
    dispatch(setGameOver(Date.now()))
    stateIcon = '😄';
  }

  return (
      <OptionWrapper rowCount={boardObj.level[1]}>
          <p>Level</p>
          <select onChange={(e) =>onLevelChange(e)}>
            <option value='B'>Beginner</option>
            <option value='I'>Intermediate</option>
            <option value='E'>Expert</option>
          </select>
        
        <p className="stateIcon" onClick={onClickIcon}>{stateIcon}</p>

        <p className="timer">{time}</p>
      </OptionWrapper>
  );
};

export default OptionBar;
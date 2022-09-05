import React, { Component } from "react";
import { Container } from "../style";
import {MINE} from '../../constants'
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { createDummy } from "../gameboard/boardSlice";

const OptionBar = () => {
  const dispatch = useDispatch()

  const boardObj = useSelector((state:RootState) => state.board)
  
  const onLevelChange = (e:any) => {
    if(e.target.id === 'B') dispatch(createDummy({rowSize:8, colSize:8, mineCount:10}));
    else if(e.target.id === 'I') dispatch(createDummy({rowSize:16, colSize:16, mineCount:40}));
    else if(e.target.id === 'E') dispatch(createDummy({rowSize:32, colSize:16, mineCount:99}));
  }
  return (
      <div>
          <button id='B' onClick={onLevelChange}>Begineer</button>
          <button id='I' onClick={onLevelChange}>Intermediate</button>
          <button id='E' onClick={onLevelChange}>Expert</button>
          <p>😶😓😄</p>
      </div>
  );
};

export default OptionBar;
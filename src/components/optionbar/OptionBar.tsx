import React, { Component } from "react";
import { Container } from "../style";
import {LEVEL} from '../../constants'
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { createDummy } from "../gameboard/boardSlice";

const OptionBar = () => {
  const dispatch = useDispatch()

  const boardObj = useSelector((state:RootState) => state.board)
  
  const onLevelChange = (e:any) => {
    if(e.target.id === 'B') dispatch(createDummy(LEVEL.BEGINNER));
    else if(e.target.id === 'I') dispatch(createDummy(LEVEL.INTERMEDIATE));
    else if(e.target.id === 'E') dispatch(createDummy(LEVEL.EXPERT));
  }
  return (
      <div>
          <button id='B' onClick={onLevelChange}>Beginener</button>
          <button id='I' onClick={onLevelChange}>Intermediate</button>
          <button id='E' onClick={onLevelChange}>Expert</button>
          <p>😶😓😄</p>
      </div>
  );
};

export default OptionBar;
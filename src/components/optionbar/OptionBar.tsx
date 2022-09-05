import { OptionWrapper } from "../style";
import {LEVEL} from '../../constants'
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { createDummy } from "../gameboard/boardSlice";
import "../style.css"

const OptionBar = ()  => {
  const dispatch = useDispatch()
  const boardObj = useSelector((state:RootState) => state.board)

  const onLevelChange = (e:any) => {
    if(e.target.value === 'B') dispatch(createDummy(LEVEL.BEGINNER));
    else if(e.target.value === 'I') dispatch(createDummy(LEVEL.INTERMEDIATE));
    else if(e.target.value === 'E') dispatch(createDummy(LEVEL.EXPERT));
  }
  const onClickIcon = () => {
    // reset Game
    dispatch(createDummy(boardObj.level));
  }
  let stateIcon = boardObj.gameEnd? '😓': '😶';
  if (boardObj.opened >= boardObj.level[0]*boardObj.level[1]-boardObj.level[2]-1) { // if opened >= row*col - mines
    stateIcon = '😄';
  }

  return (
      <OptionWrapper>
        <div className="flexBox">
          <p>Level:&nbsp;&nbsp;</p>
          <select onChange={(e) =>onLevelChange(e)}>
            <option value='B'>Beginner</option>
            <option value='I'>Intermediate</option>
            <option value='E'>Expert</option>
          </select>
        </div>
        
        <p className="stateIcon" onClick={onClickIcon}>{stateIcon}</p>

        <p className="timer"></p>
      </OptionWrapper>
  );
};

export default OptionBar;
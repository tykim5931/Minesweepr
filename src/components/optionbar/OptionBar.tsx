import { OptionWrapper } from "../style";
import { LEVEL } from '../../constants'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { createDummy } from "../gameboard/boardSlice";
import 'moment/locale/ko';
import "../style.css"
import Timer from "./Timer";


const OptionBar = ()  => {
  const dispatch = useDispatch()
  const boardObj = useSelector((state:RootState) => state.board)

  // GameOption
  const onLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value === 'B') dispatch(createDummy(LEVEL.BEGINNER));
    else if(e.target.value === 'I') dispatch(createDummy(LEVEL.INTERMEDIATE));
    else if(e.target.value === 'E') dispatch(createDummy(LEVEL.EXPERT));
  }

  // GameState
  const onClickIcon = () => {
    dispatch(createDummy(boardObj.level));  // reset Game
  }
  
  let stateIcon : '😄'|'😓'|'😶';
  if (boardObj.opened >= boardObj.level[0]*boardObj.level[1]-boardObj.level[2]) { 
    stateIcon = '😄';
  }
  else if (boardObj.gameEnd) stateIcon = '😓';
  else stateIcon = '😶';

  return (
      <OptionWrapper rowCount={boardObj.level[1]}>
        <div className="blockItems">          
          <select onChange={(e) =>onLevelChange(e)}>
            <option value='B'>Beginner</option>
            <option value='I'>Intermediate</option>
            <option value='E'>Expert</option>
          </select>
          <p id="flagCountText">{`🚩${boardObj.flagCount}/${boardObj.level[2]}`}</p>
        </div>
        <p className="stateIcon" onClick={onClickIcon}>{stateIcon}</p>
        <Timer></Timer>
      </OptionWrapper>
  );
};

export default OptionBar;
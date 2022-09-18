import { OptionWrapper } from "../style";
import { BoardProps, CellState, LEVEL, MINE } from '../../constants'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { initGameBoard } from "../gameboard/boardSlice";
import 'moment/locale/ko';
import "../style.css"
import Timer from "./Timer";


const OptionBar = ()  => {
  const dispatch = useDispatch()
  const boardObj = useSelector((state:RootState) => state.board)

  // ================= Event Handler ======================
  const onLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {  // reset level
    if(e.target.value === 'B') dispatch(initGameBoard(LEVEL.BEGINNER));
    else if(e.target.value === 'I') dispatch(initGameBoard(LEVEL.INTERMEDIATE));
    else if(e.target.value === 'E') dispatch(initGameBoard(LEVEL.EXPERT));
  }
  const onClickIcon = () => {
    dispatch(initGameBoard(boardObj.level));  // reset Game
  }

  return (
      <OptionWrapper rowCount={boardObj.level[1]}>
        
        <div className="blockItems">          
          <select onChange={(e) =>onLevelChange(e)}>
            <option value='B'>Beginner</option>
            <option value='I'>Intermediate</option>
            <option value='E'>Expert</option>
          </select>
          <p id="flagCountText">
            {`🚩${boardObj.flagCount}/${boardObj.level[2]}`}
          </p>
        </div>

        <p className="stateIcon" onClick={onClickIcon}>
          {getStateIcon({opened: boardObj.opened, level: boardObj.level, gameEnd: boardObj.gameEnd})}
        </p>
        <Timer></Timer>
      </OptionWrapper>
  );
};


function getStateIcon (gameInfo : Pick<BoardProps,'opened'|'level'|'gameEnd'>) {
  const [row, col, minecount] = gameInfo.level;
  if (gameInfo.opened >= row*col - minecount){
    return '😄';
  }
  else if (gameInfo.gameEnd) {
    return  '😓';
  }
  else {
    return '😶';
  }
}

export default OptionBar;
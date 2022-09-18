import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { CellContainer , BoardContainer} from "../style";
import { cellClicked, createMines, toggleFlag, setStartTime, setGameOver} from "./boardSlice";

import OptionBar from "../optionbar/OptionBar";
import 'moment/locale/ko';

import "../style.css"
import { BoardProps, CellKey, CellState, createMineProp, MINE } from "../../constants";


const Board = () => {
  const dispatch = useDispatch()

  // ================== board Rendering ====================
  const boardObj = useSelector((state:RootState) => state.board)

  // ==================== Event Handler ==========================
  const onCellClicked = (e:React.MouseEvent<HTMLDivElement>) => {
    const clickedCellKey = (e.target as HTMLButtonElement).id as CellKey;
    // 특수 조건 처리
    if(boardObj.gameEnd) return;  // not on game mode
    else if(boardObj.isInit === true) {  // game start, set mine map
      dispatch(setStartTime(Date.now()));
      dispatch(createMines({level: boardObj.level, thisKey: clickedCellKey} as createMineProp));
    }
    // click 일반 동작
    dispatch(cellClicked( clickedCellKey ));
    // 게임 종료조건
    if (isGameEnd({level:boardObj.level, opened:boardObj.opened}, boardObj.cells[clickedCellKey].state)) {  
      dispatch(setGameOver(Date.now()))
    }
  }

  const onFlagSet = (e:React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if(boardObj.isInit === true || boardObj.gameEnd === true){  // not on game mode 
      return;
    }

    const clickedCellKey = (e.target as HTMLButtonElement).id as CellKey;
    if (boardObj.cells[clickedCellKey].cellType === 'openedCell'){ // no flag on opened Key
      return;
    } else {
      dispatch(toggleFlag( clickedCellKey ));
    }
  }

  // ======================== Render Each Cells ============================
  const renderObj = () => {
    let cellarray = Object.keys(boardObj.cells).sort((a, b) => {  // sort cell by row, col
        const [a_row, a_col] = a.split(",");
        const [b_row, b_col] = b.split(",");
        if(a_row !== b_row){
          return parseInt(a_row,10) - parseInt(b_row);
        } else return parseInt(a_col,10) - parseInt(b_col);
    })
    return cellarray.map((key) => {
      return (
        <CellContainer 
          id={key} 
          className={boardObj.cells[key as CellKey].cellType}
          key={key}
          onClick={onCellClicked}
          onContextMenu={onFlagSet}
        >
          {boardObj.cells[key as CellKey].text}
        </CellContainer>
      )
    })
  }
  return (
    <div>
      <OptionBar></OptionBar>
      <BoardContainer rowCount={boardObj.level[1]}>
          {renderObj()}
      </BoardContainer>
    </div>
  );
};


function isGameEnd (gameInfo : Pick<BoardProps,'opened'|'level'>, clickedCellState:CellState) {
  const openedCellCount = gameInfo.opened;
  const [row, col, minecount] = gameInfo.level;
  if (openedCellCount >= row*col - minecount || clickedCellState === MINE) { // game clear!
    return true;
  }
  return false;
}

export default Board;
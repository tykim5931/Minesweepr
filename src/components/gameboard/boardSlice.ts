import {createSlice} from "@reduxjs/toolkit"
import {dummyMines, setRandomMines, setClickedCells} from "./utils";
import {LEVEL, EMPTYTEXT, BoardProps, createMineProp, CellKey} from '../../constants'

const initialState: BoardProps= {
    isInit: true,
    level: LEVEL.BEGINNER,
    opened: 0,
    cells: dummyMines(8, 8),
    gameEnd: false,
    startTime: 0,
    gameOverTime: 0,
    flagCount:0,
};

export const boardSlice = createSlice ({
    name: 'board',
    initialState,
    reducers:{
        initGameBoard(state, action){
            state.level = action.payload;
            const [rowSize, colSize, mineCount] = state.level
            const newCells = dummyMines(rowSize, colSize);
            state.cells = newCells;
            state.gameEnd = false;
            state.isInit = true;
            state.opened = 0;
            state.startTime= 0;
            state.gameOverTime= 0;
            state.flagCount = 0;
        },
        createMines(state, action) {
            const {level, thisKey} = action.payload as createMineProp;
            const [rowSize, colSize, mineCount] = state.level
            const newCells = setRandomMines(rowSize, colSize, mineCount, thisKey);
            state.cells = newCells;
            state.level = level;
            state.isInit = false;
        },
        cellClicked(state, action){
            const key = action.payload as CellKey;
            const {cellObj, opened} = setClickedCells(state.cells, key, state.opened);
            state.cells = cellObj;

            const [rowSize, colSize, mineCount] = state.level
            let openedCount = 0;
            for (const [key, obj] of Object.entries(cellObj)){
                if(obj.cellType === 'openedCell') openedCount++;
            }
            
            if(opened < 0) {    // game over!
                state.gameEnd = true;
                return
            }else if (openedCount >= rowSize*colSize-mineCount) { // game clear!
                state.gameEnd = true;
                state.gameOverTime =Date.now()
            }
            state.opened = openedCount;
        },
        toggleFlag(state, action){
            const key = action.payload;
            if(state.cells[key].text === EMPTYTEXT) {
                state.cells[key].text = '🚩';
                state.flagCount++;
            }
            else {
                state.cells[key].text = EMPTYTEXT;
                state.flagCount--;
            }
        },
        setStartTime(state, action){
            state.startTime = action.payload;
        },
        setGameOver(state, action){
            state.gameEnd = true;
            state.gameOverTime = action.payload;
        }
    }
})

export const {createMines, cellClicked, initGameBoard, toggleFlag, setStartTime, setGameOver} = boardSlice.actions;

export default boardSlice.reducer;
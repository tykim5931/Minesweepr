import {createSlice, nanoid} from "@reduxjs/toolkit"
import {dummyMines, setRandomMines, getCellValue, setClickedCells} from "./utils";
import {LEVEL, EMPTYTEXT} from '../../constants'

interface Cell {
    text: string,
    cellType: string,
    isFirst: boolean,
    state: number,
}
interface BoardProps {
    isInit: boolean,
    level: number[],
    opened: number,
    cells: {[key:string]:Cell},
    gameEnd: boolean,
}
const initialState: BoardProps= {
    isInit: true,
    level: LEVEL.BEGINNER,
    opened: 0,
    cells: dummyMines(8, 8, 10), //setRandomMines(8, 8, 10),
    gameEnd: false,
};

export const boardSlice = createSlice ({
    name: 'board',
    initialState,
    reducers:{
        createDummy(state, action){
            state.level = action.payload;
            const [rowSize, colSize, mineCount] = state.level
            const newCells = dummyMines(rowSize, colSize, mineCount);
            state.cells = newCells;
            state.gameEnd = false;
            state.isInit = true;
            state.opened = 0;
        },
        createMines(state, action) {
            const {level, thisKey} = action.payload;
            const [rowSize, colSize, mineCount] = state.level
            const newCells = setRandomMines(rowSize, colSize, mineCount, thisKey);
            state.cells = newCells;
            state.level = level;
            state.isInit = false;
        },
        cellClicked(state, action){
            const key = action.payload;
            const {cellObj, opened} = setClickedCells(state.cells, key, state.opened);
            state.cells = cellObj;
            if(opened < 0) state.gameEnd = true;
            let openedCount = 0;
            for (const [key, obj] of Object.entries(cellObj)){
                if(obj.cellType === 'openedCell') openedCount++;
            }
            state.opened = openedCount;
        },
        toggleFlag(state, action){
            const key = action.payload;
            if(state.cells[key].text === EMPTYTEXT) state.cells[key].text = '🚩';
            else state.cells[key].text = EMPTYTEXT
        }
    }
})

export const {createMines, cellClicked, createDummy, toggleFlag} = boardSlice.actions;

export default boardSlice.reducer;
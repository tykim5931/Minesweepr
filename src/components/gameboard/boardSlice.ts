import {createSlice, nanoid} from "@reduxjs/toolkit"
import {dummyMines, setRandomMines, getCellValue, setClickedCells} from "./utils";
import {MINE} from '../../constants'

interface Cell {
    text: string,
    cellType: string,
    isFirst: boolean,
    state: number,
}
interface BoardProps {
    opened: number,
    cells: {[key:string]:Cell},
    isStopGame: boolean,
}
const initialState: BoardProps= {
    opened: 0,
    cells: setRandomMines(8, 8, 10),//dummyMines(8, 8, 10),
    isStopGame: false,
};

export const boardSlice = createSlice ({
    name: 'board',
    initialState,
    reducers:{
        createBoard(state, action) {
            const {rowSize, colSize, mineCount} = action.payload;
            const newCells = setRandomMines(rowSize, colSize, mineCount);
            state.cells = newCells;
        },
        cellClicked(state, action){
            const key = action.payload;
            const {cellObj, opened} = setClickedCells(state.cells, key, state.opened);
            state.cells = cellObj;
            state.opened = opened;
        }
    }
})

export const {createBoard, cellClicked} = boardSlice.actions;

export default boardSlice.reducer;
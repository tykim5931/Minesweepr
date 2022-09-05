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
    rowSize: number,
    opened: number,
    cells: {[key:string]:Cell},
    isStopGame: boolean,
}
const initialState: BoardProps= {
    rowSize: 8,
    opened: 0,
    cells: dummyMines(8, 8, 10), //setRandomMines(8, 8, 10),
    isStopGame: false,
};

export const boardSlice = createSlice ({
    name: 'board',
    initialState,
    reducers:{
        createDummy(state, action){
            const {rowSize, colSize, mineCount} = action.payload;
            const newCells = dummyMines(rowSize, colSize, mineCount);
            state.rowSize = rowSize
            state.cells = newCells;
        },
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

export const {createBoard, cellClicked, createDummy} = boardSlice.actions;

export default boardSlice.reducer;
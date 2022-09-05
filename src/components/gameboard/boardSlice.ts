import {createSlice, nanoid} from "@reduxjs/toolkit"
import {dummyMines, setRandomMines} from "./utils";

interface Cell {
    text: string,
    classList: string,
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
    cells: dummyMines(8, 8, 10),
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
        }
    }
})

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
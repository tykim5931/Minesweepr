// Game Settings
export const MIN_WIDTH = 8;
export const MIN_HEIGHT = 8;
export const MIN_MINES = 10;

// Design Settings
export const CELL_SIZE = 42;
export const CELL_MARGIN = 2;

// Cell Settings
export const MINE = -1;
export const EMPTYTEXT = "\u00a0";
export const LEVEL = {
	BEGINNER : [8,8,4],
	INTERMEDIATE : [16,16,40],
	EXPERT : [16,32,99]
}

// Types
export type CellState = -1|0|1|2|3|4|5|6|7|8;
export type CellText = "\u00a0" |'🔥'|'🚩'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'; 
type CellType = "openedCell"|"closedCell";
export type CellKey = `${number},${number}`
export type CellObj = {[key:CellKey]:Cell};

export interface createMineProp{
	level: number[], 
	thisKey: CellKey,
}

// Cell Interface
export interface Cell {
    text: CellText,		// Cell 위에 표시되는 텍스트. Cell 상태를 표시
    cellType: CellType,	// Cell 이 opened 인지, closed 인지
    state: CellState,
};

// Board Interface
export interface BoardProps {
    isInit: boolean,		// indicates if game is started or not
    level: number[],		// game Level [row, col, mineCount]
    opened: number,			// number of opened Cells
    cells: {[key:CellKey]:Cell},	// key: 좌표(`$row,$col`) value: Cell object
    gameEnd: boolean,		// indicates if game has ended. (true when game over or game clear)
    startTime: number,		// start time of game
    gameOverTime: number,	// end time of game
    flagCount: number,		// counts of flags
}
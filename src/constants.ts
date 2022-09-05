// Cell States
export const CODES = {
	OPENED: 0,
	NOTHING: -1,
	FLAG: -2,
	QUESTION: -3,
	MINE: -4,
	MINE_FLAG: -5,
	MINE_QUESTION: -6
};

// Game States
export const GAME = {
    READY: 'ready',
    RUN: 'run',
    WIN: 'win',
    LOSE: 'lose'
}

// Game Settings
export const MIN_WIDTH = 8;
export const MIN_HEIGHT = 8;
export const MIN_MINES = 10;

// Design Settings
export const CELL_SIZE = 42;
export const CELL_MARGIN = 2;


export const MINE = -1;
import {MINE, EMPTYTEXT, CellText, CellObj, Cell, CellKey} from '../../constants'


const getCellState = (obj : CellObj, row:number, col:number) => {
    const key = `${row},${col}` as CellKey
    if(obj[key] === undefined) return 'out-of-range';
    else return obj[key].state;
}

export const dummyMines = (row:number, col:number) => {
    // ---- create & return mine map object without any mines ----

    let obj: {[key:string]:Cell} = {};   // minemap. will be held in utils file
    for (let i=0; i<row; i++){
        for (let j=0; j<col; j++)
            obj[`${i},${j}`] = {text:EMPTYTEXT, cellType:'closedCell', state: 0} as Cell;
    }
    return obj;
}

export const setRandomMines = (row:number, col:number, mineCount: number, thisKey: string) => {
    // ------ create & return mine map object with random mines ------

    let obj = dummyMines(row, col)

    const keyList = Object.keys(obj).filter(item => item !== thisKey) // 지뢰 배치할 key list. 첫 클릭키 제외.
    const mineList = []
    while(keyList.length >= row*col-mineCount){
        let mineKey = keyList.splice(Math.floor(Math.random() * keyList.length),1)[0];
        mineList.push(mineKey);
        obj[mineKey].state = MINE;
    }

    // Cell State setting
    for (let i=0; i < row; i++){
        for (let j=0; j<col; j++){
            // Mine인 경우 주변 탐색 후 숫자 업데이트
            if(obj[`${i},${j}`].state === MINE){
                for(let ii=-1; ii<=1; ii++){
                    for(let jj=-1; jj<=1; jj++){
                      if(ii!==0 || jj!==0){ // 자신 제외
                        if(getCellState(obj, i+ii,j+jj) !== MINE && 
                            getCellState(obj, i+ii,j+jj) !== 'out-of-range'){
                            obj[`${i+ii},${j+jj}`].state++;
                        }
                      }
                    }
                }
            }
        }
    }
    return obj;
}


export const setClickedCells = (obj:CellObj, key:CellKey, opened: number) => {
    // ------ show state of clicked cell ------

    const cellObj = obj;
    const row = parseInt(key.split(',')[0], 10);
    const col = parseInt(key.split(',')[1], 10);
    
    // if cell state == number : expose number when clicked
    if(cellObj[key].cellType !== 'openedCell'){
        switch(cellObj[key].state){
            case MINE:
                cellObj[key].text = "🔥";
                for (const [key, obj] of Object.entries(cellObj)){
                    if(obj.state === MINE) obj.text = "🔥";
                }
                opened = -1;    // this means the game is over! handeled in boardSlice.ts
                return {cellObj, opened};
            case 0:
                cellObj[key].cellType = 'openedCell';
                if (cellObj[key].text !== EMPTYTEXT) cellObj[key].text = EMPTYTEXT // 빈칸
                opened++;
                for (let i = -1; i <=1; i++){ // open cells recursively
                    for(let j = -1; j<=1; j++){
                        if(i!==0 || j!==0){
                            const cellVal = getCellState(cellObj, row+i, col+j)
                            if (cellVal !== MINE && cellVal !== 'out-of-range'){
                                setClickedCells (cellObj,`${row+i},${col+j}`, opened)
                            }
                        }
                    }
                }
                return {cellObj, opened};
            default:
                cellObj[key].cellType = 'openedCell';
                cellObj[key].text = String(cellObj[key].state) as CellText; // 탐색범위 내 mine 개수 
                opened++;
                return {cellObj, opened};
        }
    }
    return {cellObj, opened};
}
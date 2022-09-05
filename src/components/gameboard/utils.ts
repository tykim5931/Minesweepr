export interface Cell {
    text: string,
    classList: string,
    isFirst: boolean,
    state: number,
}
const MINE = -1;

export const getCellValue = (obj:{[key:string]:Cell}, row:number, col:number) => {
    const key = `${row}${col}`
    if(obj[key] === undefined) return 'out-of-range';
    else return obj[key].state;
}

export const dummyMines = (row:number, col:number, mineCont: number) => {
    // map 생성
    let obj: {[key:string]:Cell} = {};   // minemap. will be held in utils file
    for (let i=0; i<row; i++){
        for (let j=0; j<col; j++){
            obj[`${i}${j}`] = {text:'', classList:'cell', isFirst: true, state: 0} as Cell;
        }
    }
    return obj;
}

export const setRandomMines = (row:number, col:number, mineCont: number) => { // 8*8, 16*16, 
    let obj: {[key:string]:Cell} = {};   // minemap. will be held in utils file
    // map 생성
    for (let i=0; i<row; i++){
        for (let j=0; j<col; j++){
            obj[`${i}${j}`] = {text:'', classList:'cell', isFirst: true, state: 0} as Cell;
        }
    }

    
    // mineCount 만큼의 지뢰를 random 좌표에 뿌림.
    let placedMines = 0;
    let randomRow, randomCol;
    while(placedMines < mineCont){
        randomRow = Math.floor(Math.random() * row);
        randomCol = Math.floor(Math.random() * col);
        if (obj[`${randomRow}${randomCol}`].state === 0){
            obj[`${randomRow}${randomCol}`].state = MINE;
            placedMines++;
        }
    }

    // MineMap 설정
    for (let i=0; i < row; i++){
        for (let j=0; j<col; j++){
            // Mine인 경우 주변 탐색 후 숫자 업데이트
            if(obj[`${i}${j}`].state === MINE){
                for(let ii=-1; ii<=1; ii++){
                    for(let jj=-1; jj<=1; jj++){
                      if(ii!==0 || jj!==0){ // 자신 제외
                        if(getCellValue(obj, i+ii,j+jj) !== MINE && getCellValue(obj, i+ii,j+jj) !== 'out-of-range'){
                          obj[`${i+ii}${j+jj}`].state++;
                        }
                      }
                    }
                }
            }
        }
    }
    console.log (obj);
    return obj;
}
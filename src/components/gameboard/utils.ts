export interface Cell {
    text: string,
    cellType: string,
    isFirst: boolean,
    state: number,
}
const MINE = -1;

export const getCellValue = (obj:{[key:string]:Cell}, row:number, col:number) => {
    const key = `${row},${col}`
    if(obj[key] === undefined) return 'out-of-range';
    else return obj[key].state;
}

export const dummyMines = (row:number, col:number, mineCont: number) => {
    // map 생성
    let count = 0
    let obj: {[key:string]:Cell} = {};   // minemap. will be held in utils file
    for (let i=0; i<row; i++){
        for (let j=0; j<col; j++){
            obj[`${i},${j}`] = {text:'', cellType:'closedCell', isFirst: true, state: 0} as Cell;
            count++;
        }
    }
    console.log(count)
    return obj;
}

export const setRandomMines = (row:number, col:number, mineCont: number, thisKey: string) => { // 8*8, 16*16, 
    const thisIndex = thisKey.split(',').map(n=>{return parseInt(n)});   // 처음 클릭 인덱스. 이것을 피해서 mine생성해야 함.

    // map 생성
    let obj: {[key:string]:Cell} = {};   // minemap. will be held in utils file
    for (let i=0; i<row; i++){
        for (let j=0; j<col; j++){
            obj[`${i},${j}`] = {text:'', cellType:'closedCell', isFirst: true, state: 0} as Cell;
        }
    }

    // mineCount 만큼의 지뢰를 random 좌표에 뿌림.
    let placedMines = 0;
    let randomRow, randomCol;
    while(placedMines < mineCont){
        randomRow = Math.floor(Math.random() * row);
        randomCol = Math.floor(Math.random() * col);
        if (randomRow !== thisIndex[0] && randomCol !== thisIndex[1] && 
            obj[`${randomRow},${randomCol}`].state === 0)
        {
            obj[`${randomRow},${randomCol}`].state = MINE;
            placedMines++;
        }
    }

    // MineMap 설정
    for (let i=0; i < row; i++){
        for (let j=0; j<col; j++){
            // Mine인 경우 주변 탐색 후 숫자 업데이트
            if(obj[`${i},${j}`].state === MINE){
                for(let ii=-1; ii<=1; ii++){
                    for(let jj=-1; jj<=1; jj++){
                      if(ii!==0 || jj!==0){ // 자신 제외
                        if(getCellValue(obj, i+ii,j+jj) !== MINE && getCellValue(obj, i+ii,j+jj) !== 'out-of-range'){
                          obj[`${i+ii},${j+jj}`].state++;
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

export const setClickedCells = (obj:{[key:string]:Cell}, key:string, opened: number) => {
    const cellObj = obj;
    const row = parseInt(key.split(',')[0], 10);
    const col = parseInt(key.split(',')[1], 10);
    console.log(key);
    
    // if cell state == number : expose number when clicked
    if(cellObj[key].cellType !== 'openedCell'){

        if (cellObj[key].state > 0){
            cellObj[key].cellType = 'openedCell';
            cellObj[key].text = String(cellObj[key].state);
            opened++;
        }
        // if cell state == 0 : open all related cells without mines
        else if (cellObj[key].state === 0 ){
            cellObj[key].cellType = 'openedCell';
            // text still blank because state 0 means...
            opened++;
                
            for (let i = -1; i <=1; i++){ // open cells recursively
                for(let j = -1; j<=1; j++){
                    if(i!==0 || j!==0){
                        const cellVal = getCellValue(cellObj, row+i, col+j)
                        if (cellVal !== MINE && cellVal !== 'out-of-range'){
                            setClickedCells (cellObj,`${row+i},${col+j}`, opened)
                        }
                    }
                }
            }
        }
        // if cell state == MINE
        else {
            cellObj[key].text = String("🔥");
            opened++;
        }
    }
    return {cellObj, opened};
}
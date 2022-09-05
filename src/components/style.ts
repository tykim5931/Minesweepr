import styled from 'styled-components';

const CELL_SIZE = 10;
const CELL_MARGIN = 10;
export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px auto 0 auto;
    width: 60%;
`;
export const CellContainer = styled.div`
    display: inline-block;
    flex-wrap: wrap;
    justify-content: center;
	text-align: center;
	align-items: center;
    padding: ${CELL_MARGIN/2}px ${CELL_MARGIN}px ${CELL_MARGIN/2}px ${CELL_MARGIN}px;
    width: ${CELL_SIZE}px;
    height: ${CELL_SIZE*2}px;
	border: solid 1px white;
`;
export const BoardContainer = styled.table <{rowCount:number}>`
	display: inline-block;
	felx-wrap: wrap;
	justify-content: center;
	margin: 10px auto 0 auto;
	width: ${({rowCount}) => rowCount*(5+ CELL_SIZE + CELL_MARGIN * 2)}px
`;
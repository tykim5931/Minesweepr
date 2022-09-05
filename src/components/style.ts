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
    margin: ${CELL_MARGIN}px ${CELL_MARGIN}px 0 ${CELL_MARGIN}px;
    width: ${CELL_SIZE}px;
`;
export const BoardContainer = styled.div <{rowCount:number}>`
	display: block;
	felx-wrap: wrap;
	justify-content: center;
	margin: 10px auto 0 auto;
	width: ${({rowCount}) => rowCount*(CELL_SIZE + CELL_MARGIN * 2)}px
`;
import styled from 'styled-components';

const CELL_SIZE = 25;
const CELL_MARGIN = 1;
export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px auto 0 auto;
    width: 60%;
    cursor: default;
`;
export const OptionWrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
margin: 10px auto 0 auto;
`;
export const CellContainer = styled.div`
    display: inline-block;
    flex-wrap: wrap;
    justify-content: center;
	text-align: center;
	align-items: center;
	margin: ${CELL_MARGIN}px;
    width: ${CELL_SIZE}px;
    height: ${CELL_SIZE}px;
	border: solid 1px white;
    cursor: pointer;
`;
export const BoardContainer = styled.div <{rowCount:number}>`
	display: inline-block;
	felx-wrap: wrap;
	justify-content: center;
	margin: 10px auto 0 auto;
	width: ${({rowCount}) => rowCount*( CELL_SIZE + (CELL_MARGIN+1) * 2)}px;
    cursor: pointer;
`;
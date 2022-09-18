import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setGameOver } from "../gameboard/boardSlice";
import 'moment/locale/ko';
import "../style.css"
import { useState } from "react";
import { useInterval } from "react-use";


const Timer = ()  => {
    const dispatch = useDispatch()
    const boardObj = useSelector((state:RootState) => state.board)

    const [seconds, setSeconds] = useState(Date.now());
    useInterval(() => {
        setSeconds(Date.now());
    }, 1000);

    const getPlayTime = () => {
        if (boardObj.opened===0){ // no opened class. game not started
            return "00:00";
        }
        if (boardObj.gameEnd){  // if game has ended
            return getTimeString(boardObj.startTime, boardObj.gameOverTime)
        }
        else{       // game running
            const timestring = getTimeString(boardObj.startTime, seconds)
            if(timestring === undefined){   // game end when time >= 60
                dispatch(setGameOver(Date.now()))
            }
            return timestring;
        }
    }

    return (
        <p className="timer">{getPlayTime()}</p>
    );
}

function fillZero(width:number, str:string){  // time formatter
    return str.length >= width ? str:new Array(width-str.length+1).join('0')+str;
}

function getTimeString(startTime:number, endTime:number){   // change time to time format string
    const nowSecs = Math.round((endTime - startTime) / 1000);
    const nowMinute = Math.floor(nowSecs / 60);
    const nowSec = Math.max(Math.round(nowSecs % 60),0);
    console.log(nowSecs)
    console.log(nowMinute)
    if(nowMinute > 60) return undefined;
    return `${fillZero(2, String(nowMinute))}:${fillZero(2, String(nowSec))}`;
}

export default Timer;
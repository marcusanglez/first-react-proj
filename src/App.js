import React from "react";
import { useState } from 'react';

// with {propName1, propName2} params are props with names : [paramPropName1, ... paraPropNameM]
// and we must call <Square paramPropName1=val1 ... paramPropNameM=valM> and so on
function Square({value, onSquareClick}){
    return (
        <button className='square' onClick={onSquareClick}>
            {value}
        </button>
    );
}
function Board({xIsNext, squares, onPlay}) {
    /**
     * Sets square[i] value
     * @param i
     */
    function handleClick(i){
        // early return for already populated square in squares[i] or when there is already a winner
        if ( calculateWinner(squares)
            ||squares[i]) return;

        // we make a copy of the all the squares state before and then we modify
        const nextSquares = squares.slice();
        nextSquares[i] = (xIsNext) ? 'X':'O';
        // save state
        onPlay(nextSquares);
    }

    const isWinner = calculateWinner(squares);
    const status = getStatus(isWinner, xIsNext);
    console.log("isWinner: " + isWinner + "\nstatus: " + status);

    // construct board
    return (
        <>
            <div className='status'>{status}</div>
            <div className='board-row'>

                <Square value={squares[0]} onSquareClick={()=> handleClick(0)} />
                <Square value={squares[1]} onSquareClick={()=> handleClick(1)} />
                <Square value={squares[2]} onSquareClick={()=> handleClick(2)} />
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onSquareClick={()=> handleClick(3)} />
                <Square value={squares[4]} onSquareClick={()=> handleClick(4)} />
                <Square value={squares[5]} onSquareClick={()=> handleClick(5)} />
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onSquareClick={()=> handleClick(6)} />
                <Square value={squares[7]} onSquareClick={()=> handleClick(7)} />
                <Square value={squares[8]} onSquareClick={()=> handleClick(8)} />
            </div>
        </>
    );
}


export default function Game(){
    // the history is initialized with an array containing another array of length 9 elements
    // with inner values that are nulls
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    //console.log(`currentSquares`, currentSquares)

    /**
     * Preserves the state by setting the state variables history (setHistory) and xIsNext (setXIsNext)
     * @param nextSquares
     */
    function handleStateForMove(nextSquares){
        // adding the nextSquares produced by the click on square
        const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
        //console.log("next History:  ");
        //console.log( nextHistory);
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length-1);
    }

    function jumpTo(nextMove){
        //console.log("jumpTo: " + nextMove)
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        const description = 'You are at ' +
            (move > 0 ? ' move #' + move
                : ' game start');
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
             </li>
        );
    });

    return(
    <div className='game'>
        <div className='game-board'>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handleStateForMove}/>
        </div>
        <div className='game-info'>
            <ol>{moves}</ol>
        </div>
    </div>)
}


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        //console.log('a', a, ' b', b, ' c:', c)
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]
    }
    return null;
}

// params by value
function getStatus(winnerStat, xNext){
    return winnerStat ? 'Winner: ' + winnerStat
        : 'Next Player: ' + (xNext ? 'X' : 'O');
}
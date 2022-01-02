import React, {useEffect, useState} from 'react'
import { render } from 'react-dom'
import { Cell, TCell, TCoords } from '../cell/Cell'


import './board.css'

type Coordinate = ([x: number, y: number])

interface BoardProps {
    rows: number,
    cols: number,
    qtyMines: number,
}

export const Board = (props: BoardProps) => {
    let boardInitialState:TCell[][] = [[]]
    const [board , setBoard] = useState(boardInitialState)
    const [gameRunning , setGameRunning] = useState(false)
    const [clicks, setClicks] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [winState, setWinState] = useState(false)

    const handlePlayAgain = () => {
        newBoard()
        setGameRunning(true)
        setGameOver(false)   
        setWinState(false)
    }

    const createNewCell = (coords:TCoords):TCell => {
        return {
            hidden: true,
            hasMine: false,
            minesAround: 0,
            markedMine: false,
            coords: coords
        }
    }

    function newBoard() {
        let tempBoard:TCell[][] = []
        const {rows, cols, qtyMines} = props
        const minCellSize = Math.max(window.innerWidth/rows,window.innerHeight/cols)/2.5
        document.documentElement.style.setProperty('--cellSize', minCellSize + "px" );

        for (let i=0; i<rows; i++){
            tempBoard.push([])
            for (let j=0; j<cols; j++){

                tempBoard[i].push(createNewCell({x:i, y:j}))
            }
        }
        tempBoard = placeMines(tempBoard, qtyMines)
        setBoard(tempBoard)
    }

    const validCell = (row:number, col:number):boolean => {
        return row >= 0 && row <= props.rows &&  col >= 0 && col <= props.cols
    }

    const addMinesAroundCounter = (row:number, col: number, board:TCell[][]):TCell[][] => {
        for (let i = row-1; i <= row+1; i++) {
            for (let j = col - 1; j <= col + 1; j++){
                try {if (validCell(i,j)) board[i][j].minesAround++;}
                catch {}
            }
        }
        return board
    }

    const placeMines = (board: TCell[][], qtyMines: number): TCell[][] => {
        const rows = board.length
        const cols = board[0].length
        let minesCounter = 0
        let rowIndex = 0
        let colIndex = 0

        while (minesCounter < qtyMines) {
            rowIndex = Math.floor(Math.random()*rows)
            colIndex = Math.floor(Math.random()*cols)
            if (!board[rowIndex][colIndex].hasMine) {
                board[rowIndex][colIndex].hasMine = true
                minesCounter++

                addMinesAroundCounter(rowIndex, colIndex, board)

            }
        }

        return board
    }

    const hasEmptyAround = (row:number, col:number):boolean => {
        let counter = 0
        for (let i = row-1; i <= row+1; i++) {
            for (let j = col - 1; j <= col + 1; j++){
                try{if (validCell(i,j) && board[i][j].minesAround === 0 && !board[i][j].hasMine) {
                    counter++
                }}
                catch {}
            }
        }

        return counter>0
    }

    const revealAround = (row:number, col:number, board:TCell[][]):TCell[][] => {
        for (let i = row-1; i <= row+1; i++) {
            for (let j = col - 1; j <= col + 1; j++){
                try{if (validCell(i,j) && hasEmptyAround(i,j) && board[i][j].hidden && !board[i][j].hasMine) {
                    board[i][j].hidden = false
                    revealAround(i,j,board)
                }}
                catch {}
            }
        }

        
        return board
    }

    const handleCellClick = (coords: TCoords) => {
        let tempBoard = board
        const cell = tempBoard[coords.x][coords.y]
        cell.hidden = false
        if (!cell.hasMine) {
            let tempBoard = board
            tempBoard = revealAround(coords.x, coords.y, tempBoard)
        } else {
            tempBoard.map(row=> {
                row.map(cell=> {
                    if (cell.hasMine) cell.hidden= false
                })
            })
        setGameOver(true)   
        }
        
        setBoard(tempBoard) 
        setClicks(clicks + 1)
    }
    
    const handleMarkCell = (coords: TCoords) => {
        let tempBoard = board
        tempBoard[coords.x][coords.y].markedMine = !tempBoard[coords.x][coords.y].markedMine
        setBoard(tempBoard) 
        setClicks(clicks + 1)
    }

    const newGame = () => {
            newBoard()
    }
    
    useEffect(() => {
        let revealedSafeCells  = 0
        board.map(row => {
            row.map(cell => {
                if (!cell.hidden && !cell.hasMine) revealedSafeCells++
            })
        })
        if (revealedSafeCells === props.cols*props.rows - props.qtyMines) setWinState(true)
    }, [clicks])


    // Render
    if (!board) {
        return <div>Loading...</div>
    } else {

        if (!gameRunning) {
            return <h3 onClick={handlePlayAgain}>Play</h3>
        } else {
            return (<div className="board">{board.map((row:TCell[], rowIndex:number) => {
                return (
                <div className={`row ${winState || gameOver ? "unclickable" : ""}`}>
                    {row.map((cell:TCell, colIndex:number) => {
                            return <Cell key={`r${rowIndex}c${colIndex}${cell.hidden?"h":""}`} cellInfo={cell} coordinates={cell.coords} handleCellClick={handleCellClick} handleMarkCell={handleMarkCell}/>
                        })}
                </div>
                )
            })}
            <div className="bottomBoardText">
            {gameOver ? "Game Over! 😂" : ""}<br/>
            {gameOver ? "Try not to step on a bomb next time..." : ""}
            {winState? "✨You Won!! Well done 🥳" : ""}
            </div>
            <h3 onClick={handlePlayAgain}>{gameOver || winState ? "Play Again!" : "Reset"}</h3>
            </div>)
        }
        
    }
 
}

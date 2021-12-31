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
    const [completed , setCompleted] = useState(true)
    const [clicks, setClicks] = useState(0)

    const handlePlayAgain = () => {
        setCompleted(false)
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
        tempBoard[coords.x][coords.y].hidden = false
        tempBoard = revealAround(coords.x, coords.y, tempBoard)
        setBoard(tempBoard) 
        setClicks(clicks + 1)
        console.log("validCell:"+  validCell(coords.x, coords.y))
        console.log("hasEmptyAround:"+  hasEmptyAround(coords.x, coords.y))

    }
    
    useEffect(() => {
        if (!completed) {
            newBoard()
        }
    },[completed])


    if (!board) {
        return <div>Loading...</div>
    }

    if (completed) {
        return <h3 onClick={handlePlayAgain}>Play again</h3>
    } else {
        return (<>{board.map((row:TCell[], rowIndex:number) => {
            return (
            <div className="row">
                {row.map((cell:TCell, colIndex:number) => {
                        return <Cell key={`r${rowIndex}c${colIndex}${cell.hidden?"h":""}`} cellInfo={cell} coordinates={cell.coords} handleCellClick={handleCellClick}/>
                    })}
            </div>
            )
        })}</>)
    }
    

}

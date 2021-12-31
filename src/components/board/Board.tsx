import React, {useEffect, useState} from 'react'
import { Cell, TCell, TCoords } from '../cell/Cell'

import './board.css'

type Coordinate = ([x: number, y: number])

interface BoardState {
    completed: boolean,
    board: TCell[][],
}

interface BoardProps {
    rows: number,
    cols: number,
    qtyMines: number,
}

export const Board = (props: BoardProps) => {
    let boardInitialState:TCell[][] = [[]]
    const [board , setBoard] = useState(boardInitialState)
    const [completed , setCompleted] = useState(true)

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

    const validCell = (row:number, col:number) => {
        return row >= 0 && row <= props.rows &&  col >= 0 && col <= props.cols
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

                for (let i = rowIndex-1; i <= rowIndex+1; i++) {
                    for (let j = colIndex - 1; j <= colIndex + 1; j++){
                        if (validCell(i,j)) {
                            board[i][j].minesAround++
                        }
                    }
                }

            }
        }


        return board
    }

    const handleCellClick = (coords: TCoords) => {
        const tempBoard = board
        tempBoard[coords.x][coords.y].hidden = false
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
                        return <Cell key={`r${rowIndex}c${colIndex}`} cellInfo={cell} coordinates={cell.coords} handleCellClick={handleCellClick}/>
                    })}
            </div>
            )
        })}</>)
    }
    

}

import React, {useEffect, useState} from 'react'
import { Cell, TCell } from '../cell/Cell'

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
    const [completed , setCompleted] = useState(false)

    const handlePlayAgain = () => {
        setCompleted(false)
    }

    const createNewCell = (coords:[number,number]):TCell => {
        return {
            hidden: true,
            hasMine: false,
            minesAround: 0,
            markedMine: false,
            coords: coords
        }
    }

    useEffect(() => {
        function newBoard(rows: number, cols:number) {
            const tempBoard:TCell[][] = []
    
            for (let i=0; i<rows; i++){
                tempBoard.push([])
                for (let j=0; j<cols; j++){
                    tempBoard[i].push(createNewCell([i,j]))
                }
            }
            setBoard(tempBoard)
    
        }
        newBoard(props.rows, props.cols)
    },[])


    if (!board) {
        return <div>Loading...</div>
    }

    return (<>{board.map((row:TCell[], rowIndex:number) => {
        return (
        <div className="row">
            {row.map((cell:TCell, colIndex:number) => {
                    return <Cell key={`${rowIndex}${colIndex}`} coordinates={cell.coords} />
                })}
        </div>
        )
    })}</>)

}

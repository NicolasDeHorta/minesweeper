import React, {useState} from "react";
import './cell.css'

export type TCell = {
    hidden: boolean;
    hasMine: boolean;
    minesAround: number;
    markedMine: boolean;
    coords: TCoords
}

export type TCoords = {
    x: number;
    y: number;
}

interface CellProps {
    cellInfo: TCell;
    coordinates: TCoords;
    handleCellClick: (coords: TCoords) => void
}

export const Cell = (props: CellProps) => {
    const [hidden, setHidden ] = useState(true)

    const handleClick = () => {
        props.handleCellClick(props.coordinates)
        setHidden(false)
    }

    return (<div className={`mainCell ${!props.cellInfo.hidden ? "revealed" : ""}`} onClick={handleClick} >
        {props.cellInfo.hasMine ? "M": (props.cellInfo.minesAround === 0 ? "" : props.cellInfo.minesAround)}
        
    </div>)
} 
import React, {useState} from "react";
import './cell.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons'

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
    handleCellClick: (coords: TCoords) => void;
    handleMarkCell: (coords:TCoords) => void;
    flagMode: boolean;
}

export const Cell = (props: CellProps) => {
    const handleRightClick = () => {
        props.handleMarkCell(props.coordinates)
    }

    const handleClick = () => {
        if (props.flagMode) {
            props.handleMarkCell(props.coordinates)
        }
        if (!props.cellInfo.markedMine) {
            props.handleCellClick(props.coordinates)
        }

    }

    const cellText = props.cellInfo.markedMine ? "🚩"
                        :props.cellInfo.hasMine ? <FontAwesomeIcon icon={faBomb} />
                            : (props.cellInfo.minesAround === 0 ? "" : props.cellInfo.minesAround)
        

    return (<div className={`cell ${props.cellInfo.markedMine ? "marked" : ""} ${!props.cellInfo.hasMine ? "normalCell" : "mineCell"} ${!props.cellInfo.hidden ? "revealed" : ""}`} onClick={handleClick} onContextMenu={handleRightClick} >
        {cellText}
    </div>)
} 
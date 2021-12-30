import React, {useState} from "react";
import './cell.css'

export type TCell = {
    hidden: boolean;
    hasMine: boolean;
    minesAround: number;
    markedMine: boolean;
    coords: [number,number]
}

interface CellProps {
    coordinates: [x:number, y:number];
}

export const Cell = (props: CellProps) => {
    const [clicked, setClicked ] = useState(false)

    const handleClick = () => {
        setClicked(!clicked)
    }

    return (<div className={`mainCell ${clicked ? "clicked" : ""}`} onClick={handleClick} >
        
    </div>)
}
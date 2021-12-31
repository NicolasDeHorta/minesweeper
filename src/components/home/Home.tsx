import React, {useState, useEffect} from 'react';
import { Board } from '../board/Board';

import './home.css';

export const Home = () => {
const [rows, setRows] = useState(10)
const [cols, setCols] = useState(10)
const [qtyMines, setQtyMines] = useState(5)


    const handleRowsInput = (e:any) => {
        setRows(e.target.value)
    }

    const handleColsInput = (e:any) => {
        setCols(e.target.value)
    }
    
    const handleMinesInput = (e:any) => {
        setQtyMines(e.target.value)
    }

  return (
    <div className="wrapper">
<h2>Minesweeper</h2>
<div className="inputs">
    Rows <input type="number" value={rows} min={1} onChange={handleRowsInput}/>
    Columns <input type="number" value={cols} min={1} onChange={handleColsInput}/>
    Mines <input type="number" value={qtyMines} min={1} onChange={handleMinesInput}/>
</div>

    <Board key={`r${rows}c${cols}m${qtyMines}`} rows={rows} cols={cols} qtyMines={qtyMines}/>
    </div>
  );
}

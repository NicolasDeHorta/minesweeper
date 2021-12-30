import React, {useState, useEffect} from 'react';
import { Board } from '../board/Board';

import './home.css';

export const Home = () => {
const [rows, setRows] = useState(5)
const [cols, setCols] = useState(5)

    const handleRowsInput = (e:any) => {
        setRows(e.target.value)
    }

    const handleColsInput = (e:any) => {
        setCols(e.target.value)
    }

  return (
    <div className="wrapper">
<h2>Minesweeper</h2>
<div className="inputs">
    <input type="number" value={rows} min={1} onChange={handleRowsInput}/>
    <input type="number" value={cols} min={1} onChange={handleColsInput}/>
</div>

    <Board key={`${rows}${cols}`} rows={rows} cols={cols} qtyMines={5}/>
    </div>
  );
}

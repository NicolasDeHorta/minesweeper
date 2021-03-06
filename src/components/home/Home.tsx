import React, {useState, useEffect} from 'react';
import { Board } from '../board/Board';
import {BrowserView, MobileView} from 'react-device-detect'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import './home.css';

library.add(faFacebook)

export const Home = () => {
const [rows, setRows] = useState(10)
const [cols, setCols] = useState(10)
const [qtyMines, setQtyMines] = useState(20)
const [flagMode, setFlagMode] = useState(false)


    const handleRowsInput = (e:any) => {
        setRows(e.target.value)
    }

    const handleColsInput = (e:any) => {
        setCols(e.target.value)
    }
    
    const handleMinesInput = (e:any) => {
        setQtyMines(e.target.value)
    }


    const handleFlagMode = () => {
        setFlagMode(!flagMode)
    }

  return (<>
    <div className="wrapper">
        <div>
            <h1>Minesweeper</h1>
            <div className="inputs">
                <div className="singleInput">Rows <input type="number" value={rows} min={1} onChange={handleRowsInput}/></div> 
                <div>Columns <input type="number" value={cols} min={1} onChange={handleColsInput}/></div> 
                <div>Mines <input type="number" value={qtyMines} min={1} onChange={handleMinesInput}/></div> 
                
            </div>
            <MobileView>            
                <p className={`hintText flagText  ${flagMode ? "flagModeOn" : ""}`} onClick={handleFlagMode}>
                    {flagMode ? "Placing flags ..." + "🚩" : "Flag mode OFF"}
                    </p>
            </MobileView>
            <BrowserView>            
                <p className="hintText">*right click to place a flag</p>
            </BrowserView>

        </div>
    <Board key={`r${rows}c${cols}m${qtyMines}`} rows={rows} cols={cols} qtyMines={qtyMines} flagMode={flagMode}/>
    </div>

    <footer>
        <div>
            <a href="https://www.linkedin.com/in/nicolas-de-horta-b37a48141/"><FontAwesomeIcon className="footerIcon" icon={faLinkedin} /></a>
            <a href="https://github.com/NicolasDeHorta/minesweeper"> <FontAwesomeIcon className="footerIcon" icon={faGithub} /></a>
            <p>Nicolás De Horta &copy; {new Date().getFullYear()}</p>
        </div>
    </footer>
    </>
  );
}

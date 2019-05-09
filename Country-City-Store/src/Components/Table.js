import React from 'react'
import '../CSS/Table.css'

const Table = props => {
    return (
        <div className="tableContainer">
            <center>
                <h2 style={{borderBottom: "0.5px solid black"}}>{props.title}</h2>
                <ul className="overflowHandle">
                    {props.contect}
                </ul>
            </center>
        </div>
    )
}

export default Table

//rafcp

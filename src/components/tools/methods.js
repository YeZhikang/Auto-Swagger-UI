import React from "react";


export default function MethodCard({ method }) {
    return (
        <div style={{
            padding: '2px 4px',
            borderRadius: '5px',
            textAlign: 'center',
            color: "white"
        }} className={`board-document__body__method--${method}`}>{ method.toUpperCase() }</div>
    )
}

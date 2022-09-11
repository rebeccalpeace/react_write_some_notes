import React from 'react'
import DragMove from './DragMove'
import { useEffect, useState } from 'react'

export default function CreateWord(props) {

    const [translate, setTranslate] = useState({
        x: 0,
        y: 0
    });

    const handleDragMove = (e) => {
        setTranslate({
            x: translate.x + e.movementX,
            y: translate.y + e.movementY
        });
    };

    return (
        <>
            <DragMove onDragMove={handleDragMove}>
                <div style={{transform: `translateX(${translate.x}px) translateY(${translate.y}px)`}}>
                    <div className="play-word">{props.word}</div>
                </div>
            </DragMove>
        </>
        
    )
}

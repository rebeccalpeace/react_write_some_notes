import React from 'react'
import { useState } from 'react'

export default function DragMove(props) {

    const {
        onPointerDown,
        onPointerUp,
        onPointerMove,
        onDragMove,
        children,
        style,
        className
    } = props;

    const [isDragging, setIsDragging] = useState(false);

    const handlePointerDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        onPointerDown(e);
    }

    const handlePointerUp = (e) => {
        e.preventDefault();
        setIsDragging(false);
        onPointerUp(e);
    }

    const handlePointerMove = (e) => {
        if (isDragging) onDragMove(e);

        onPointerMove(e)
    }

    
    return (
        <div onPointerDown={handlePointerDown} 
        onPointerUp={handlePointerUp} 
        onPointerMove={handlePointerMove} 
        style={style} 
        className={className}>
            {children}
        </div>
    )
}

DragMove.defaultProps = {
    onPointerDown: () => {},
    onPointerUp: () => {},
    onPointerMove: () => {}
}


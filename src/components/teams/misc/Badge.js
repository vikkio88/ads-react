import React from 'react';
import './Badge.css';

const Badge = ({colours}) => (
    <div className="badge">
        <div className="leftBadge" style={{backgroundColor: colours[0]}}>
        </div>
        <div className="rightBadge" style={{backgroundColor: colours[1]}}>
        </div>
    </div>
);

export {Badge};
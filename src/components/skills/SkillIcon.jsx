import React, { useState } from 'react';

export function SkillIcon({ iconClass }) {
    const [colored, setColored] = useState(false);

    return (
        <div
        className="slide"
        onMouseOver={() => setColored(true)}
        onMouseOut={() => setColored(false)}
        >
        <i className={iconClass + (colored ? ' colored' : '')}></i>
        </div>
    );
}

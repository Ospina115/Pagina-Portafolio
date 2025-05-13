import React from 'react';
import { SkillIcon } from './SkillIcon';
import './skills.css';

export function SkillGroup({ titleEs, titleEn, iconSrc, icons }) {
    // Duplicate icons array to create infinite scroll effect
    const duplicatedIcons = [...icons, ...icons];

    return (
        <div className={"skill-group " + titleEs.toLowerCase().replace(/\s+/g, '-')}>
        <div className="titulo">
            <img src={iconSrc} alt={titleEs} />
            <h2 data-lang-en={titleEn} data-lang-es={titleEs}>{titleEs}</h2>
        </div>
        <div className="slider">
            <div className="slide-track">
            {duplicatedIcons.map((iconClass, index) => (
                <SkillIcon key={index} iconClass={iconClass} />
            ))}
            </div>
        </div>
        </div>
    );
}

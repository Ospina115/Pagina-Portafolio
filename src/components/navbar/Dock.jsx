"use client";

import {motion, useMotionValue, useSpring, useTransform, AnimatePresence,} from "framer-motion";
import { Children, cloneElement, useEffect, useMemo, useRef, useState, useCallback, memo} from "react";

import "./NavBar.css";

const DockItem = memo(function DockItem({children, className = "", onClick, mouseX, spring, distance, magnification, baseItemSize,}) {
    const ref = useRef(null);
    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, (val) => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize,
        };
        return val - rect.x - baseItemSize / 2;
    });

    const targetSize = useTransform(
        mouseDistance, 
        [-distance, 0, distance], 
        [baseItemSize, magnification, baseItemSize]
    );

    const size = useSpring(targetSize, {
        ...spring,
        restDelta: 0.001,
        restSpeed: 0.001
    });

    const handleClick = useCallback(() => {
        onClick?.();
    }, [onClick]);

    const handleHoverStart = useCallback(() => {
        isHovered.set(1);
    }, [isHovered]);

    const handleHoverEnd = useCallback(() => {
        isHovered.set(0);
    }, [isHovered]);

    return (
        <motion.div
            ref={ref}
            style={{
                width: size, 
                height: size,
                transformOrigin: "bottom center"
            }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            onFocus={handleHoverStart}
            onBlur={handleHoverEnd}
            onClick={handleClick}
            className={`dock-item ${className}`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
            transition={{
                type: "spring",
                ...spring,
                restDelta: 0.001,
                restSpeed: 0.001
            }}
        >
            {Children.map(children, (child) => cloneElement(child, { isHovered }))}
        </motion.div>
    );
});

const DockLabel = memo(function DockLabel({ children, className = "", ...rest }) {
    const { isHovered } = rest;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = isHovered.on("change", (latest) => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.8 }}
                    animate={{ opacity: 1, y: 5, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.8 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        mass: 0.5,
                        duration: 0.15
                    }}
                    className={`dock-label ${className}`}
                    role="tooltip"
                    style={{ x: "-50%" }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
});

const DockIcon = memo(function DockIcon({ children, className = "" }) {
    return <div className={`dock-icon ${className}`}>{children}</div>;
});

export default function Dock({
    items, 
    className = "", 
    spring = { 
        mass: 0.1, 
        stiffness: 200, 
        damping: 15,
        restDelta: 0.001,
        restSpeed: 0.001
    }, 
    magnification = 70, 
    distance = 180, 
    panelHeight = 68, 
    dockHeight = 256, 
    baseItemSize = 50,
}) {
    const mouseX = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    const maxHeight = useMemo(() => 
        Math.max(dockHeight, magnification + magnification / 2 + 4), 
        [magnification, dockHeight]
    );
    
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, {
        ...spring,
        stiffness: 300,
        damping: 25
    });

    const handleMouseMove = useCallback(({ pageX }) => {
        isHovered.set(1);
        mouseX.set(pageX);
    }, [isHovered, mouseX]);

    const handleMouseLeave = useCallback(() => {
        isHovered.set(0);
        mouseX.set(Infinity);
    }, [isHovered, mouseX]);

    return (
        <motion.div 
            style={{ height: panelHeight, scrollbarWidth: "none" }} 
            className="dock-outer"
        >
            <motion.div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`dock-panel ${className}`} 
                style={{ height: panelHeight }} 
                role="toolbar" 
                aria-label="Application dock"
                layout
                transition={{
                    type: "spring",
                    ...spring
                }}
            >
                {items.map((item, index) => (
                    <DockItem 
                        key={item.id || index}
                        onClick={item.onClick} 
                        className={item.className} 
                        mouseX={mouseX} 
                        spring={spring} 
                        distance={distance} 
                        magnification={magnification} 
                        baseItemSize={baseItemSize}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    );
}

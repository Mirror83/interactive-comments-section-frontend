import React from 'react';
import Image from "next/image";

type IconButtonProps = {
    label: string;
    iconPath: string;
    height?: number;
    width?: number;
    onClick?: () => void;
    iconHeight?: number;
    iconWidth?: number;
    labelClassName?: string;
}

function IconButton({onClick, label, height, width, iconPath, labelClassName}: IconButtonProps) {
    return (
        <button className={"flex items-center gap-2"} onClick={onClick}>
            <Image src={iconPath} alt={""} height={height ?? 15} width={width ?? 15}/>
            <span className={`font-[500] ${labelClassName ? labelClassName : ""}`}>{label}</span>
        </button>
    );
}

export default IconButton;
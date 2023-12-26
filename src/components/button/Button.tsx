import React, {KeyboardEventHandler} from "react";

type ButtonType = {
    name: string;
    callback: ()=> void;
    className: string
}
export const Button:React.FC<ButtonType> = ({name,
                                                callback,
                                                className})=>{

    const onClickHandler = ()=> {
        callback()
    }

    return <>
        <button onClick={onClickHandler} className={className}>{name}</button>
    </>
}
import React, {ChangeEvent, KeyboardEvent} from "react";

type InputTypes = {
    callback: (title: string)=> void;
    onKeyDownCallback: (title: string)=> void;
    title: string;
    className: string;
}
export const Input:React.FC<InputTypes> = ({callback,
                                               title,
                                               onKeyDownCallback,
                                               className}) => {


    const onChangeHAndler = (event: ChangeEvent<HTMLInputElement>)=>{
        title = event.currentTarget.value
        callback(title)

    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>)=> {
        if (event.key === 'Enter')  onKeyDownCallback(title)

    }
    return <>

        <input onChange={onChangeHAndler} value={title} onKeyDown={onKeyDownHandler} className={className}/>
    </>
}
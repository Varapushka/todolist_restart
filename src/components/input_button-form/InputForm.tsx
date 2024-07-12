import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, Input, TextField} from "@mui/material";
import {AddCircleOutlineOutlined} from "@mui/icons-material";


type InputFormTypes = {
    callback: (newTitle: string) => void;


}
export const InputForm: React.FC<InputFormTypes> = ({
                                                        callback,

                                                    }) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState('')


    const onClickHandler = () => {
        if (title.trim() === '') {
            setError('Title is required')
            return
        }
        callback(title)
        setTitle('')
        setError('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)


    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') onClickHandler()


    }
    return <>

        <TextField onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   value={title} variant={"outlined"}
                   label={'Enter the title'}
                   color={'primary'}
                   error={!!error}
                   helperText={error}
                   size={"small"}/>
        <IconButton onClick={onClickHandler} color={'primary'}>
            <AddCircleOutlineOutlined/>
        </IconButton>

    </>
}
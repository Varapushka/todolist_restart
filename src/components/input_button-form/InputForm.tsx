import React, {ChangeEvent, KeyboardEvent, useState} from "react";


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
        setTitle (event.currentTarget.value)


    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') onClickHandler()


    }
    return <>
        <input onChange={onChangeHandler} onKeyDown={onKeyDownHandler}  value={title} className={error ? 'error' : ''}/>
        <button onClick={onClickHandler}>+</button>
        <div className={error ? 'error-message' : ''}>{error}</div>
    </>
}
import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string;
    className: string
    onChangeTitle: (newTitle: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = ({
                                                                  title,
                                                                  className,
                                                                  onChangeTitle
                                                              }) => {

    let [editMode, setEditMode] = useState(false)
    let [localTitle, setLocalTitle] = useState('')
    const toActivatedEdit = () => {
        setEditMode(true)
        setLocalTitle(title)
    }
    const toActivatedView = () => {
        setEditMode(false)
        onChangeTitle(localTitle)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)


    }
    return editMode
        ? <input value={localTitle} onBlur={toActivatedView} autoFocus onChange={onChangeTitleHandler}/>
        : <span className={className} onDoubleClick={toActivatedEdit}>{title} </span>
}
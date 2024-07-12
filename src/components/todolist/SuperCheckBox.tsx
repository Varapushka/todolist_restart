import React, {ChangeEvent} from "react";
import {Checkbox} from "@mui/material";


type CheckBoxType = {
    isDone: boolean,
    callback: () => void
}


export const SuperCheckBox: React.FC<CheckBoxType> = ({
                                                          isDone, callback

                                                      }) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback()
    }
    return <Checkbox
        checked={isDone}
        color={"primary"}
        onChange={onChangeHandler}
    />
}
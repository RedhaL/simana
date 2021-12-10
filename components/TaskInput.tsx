import React, { FC } from 'react';

type Props = {

};

const TaskInput: FC<Props> = (props) => {
    return (
        <div className="flex flex-col">
            <input type="text" />
        </div>
    )
}

export default TaskInput;
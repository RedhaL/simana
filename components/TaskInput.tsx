import React, { FC, FocusEvent, MouseEvent, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { ITask, Dispatch } from '../types';
import { TrashIcon, CheckIcon } from '@heroicons/react/outline'

type Props = {
    task?: ITask
    dispatch: Dispatch
    timestamp: number
    index?: number
};

const TaskWrapper = styled.div`
    ${tw`
        flex
        flex-row
        border-b
        focus:border-indigo-600
        hover:border-indigo-600
    `}
    border-color: rgba(68, 68, 68, .2);
    height: 38px;
`

const StyledInput = styled.input`
    ${tw`
        appearance-none
        outline-none
        px-2
    `}
`

const TaskInput: FC<Props> = (props) => {
    const task: ITask = props.task || {
        id: "",
        title: "",
        description: "",
        done: false,
        timestamp: props.timestamp,
        color: "",
        order: 0
    };
    const [title, setTitle] = useState(task.title);

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const value = title;
        if (value && !props.task) {
            task.title = value;
            props.dispatch({
                type: 'ADD_TASK',
                data: task
            });
            setTitle("");
        }
    }

    const handleCheck = (e: MouseEvent<HTMLButtonElement>) => {
        props.dispatch({
            type: 'TOGGLE_DONE',
            data: {
                task,
                index: props.index
            }
        });
    }
    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        console.log('Delete: ', props.index, ', ', props.task && props.task.title, ', ', props.timestamp)
        props.dispatch({
            type: 'DELETE_TASK',
            data: {
                task,
                index: props.index
            }
        });
    }
    if (props.index || props.index == 0) {
        console.log('index: ', props.index, 'item:', props.task && props.task.title, 'droppable: ', props.timestamp)
    }
    return (
        <TaskWrapper>
            <StyledInput
                type="text"
                value={title}
                readOnly={props.task && true}
                disabled={task.done} // to delete
                onBlur={handleBlur}
                onChange={e => setTitle(e.target.value)}
            />
            {props.task &&
                <>
                    <div className="p-2">
                        <button onClick={handleCheck}>
                            <CheckIcon className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                    <div className="p-2">
                        <button onClick={handleDelete}>
                            <TrashIcon className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                </>
            }
        </TaskWrapper>
    )
}

export default TaskInput;
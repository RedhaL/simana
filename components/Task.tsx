import React, { FC, MouseEvent, useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { ITask, Dispatch } from '../types';
import { TrashIcon, CheckIcon } from '@heroicons/react/outline'

type Props = {
    task: ITask
    dispatch: Dispatch
    index: number
};

const TaskWrapper = styled.div`
    ${tw`
        flex
        flex-row
        border-b
        focus:border-indigo-600
        hover:border-indigo-600
        w-full
        max-w-full
        cursor-pointer
        
    `}
    border-color: rgba(68, 68, 68, .2);
    height: 38px;
    
`

const Title = styled.span`
    ${tw`
        px-2
        w-full
        h-full
        overflow-ellipsis
    `}
`

const Task: FC<Props> = (props) => {
    const handleCheck = (e: MouseEvent<HTMLButtonElement>) => {
        props.dispatch({
            type: 'TOGGLE_DONE',
            data: {
                task: props.task,
                index: props.index
            }
        });
    }
    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        props.dispatch({
            type: 'DELETE_TASK',
            data: {
                task: props.task,
                index: props.index
            }
        });
    }

    // const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    //     props.dispatch({
    //         type: 'EDIT_TASK',
    //         data: {
    //             task: props.task,
    //             index: props.index
    //         }
    //     });
    // }


    return (
        <TaskWrapper>
            {props.task.done ? 
            <div className="flex-1 line-through opacity-30">
                <Title>{props.task.title}</Title>
            </div>
            : 
            <div className="flex-1">
                <Title>{props.task.title}</Title>
            </div>
            }
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
        </TaskWrapper>
    )
}

export default Task;
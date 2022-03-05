import React, { FC, MouseEvent } from "react";
import tw, { styled } from "twin.macro";
import { ITask, Dispatch } from "../types";
import { TrashIcon, CheckIcon } from "@heroicons/react/outline";
import Modal from "./Modal";

type Props = {
  task: ITask;
  dispatch: Dispatch;
  index: number;
};

const TaskWrapper = styled.div`
  ${tw`
        flex
        flex-row
        border-b
        focus:border-indigo-600
        hover:border-indigo-600
        cursor-pointer  
        w-full   
    `}
  border-color: rgba(68, 68, 68, .2);
  height: 38px;
`;

const Task: FC<Props> = (props) => {
  const handleCheck = (e: MouseEvent<HTMLButtonElement>) => {
    props.dispatch({
      type: "TOGGLE_DONE",
      data: {
        task: props.task,
        index: props.index,
      },
    });
  };
  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    props.dispatch({
      type: "DELETE_TASK",
      data: {
        task: props.task,
        index: props.index,
      },
    });
  };

  return (
    <TaskWrapper>
      <Modal dispatch={props.dispatch} task={props.task} index={props.index} />
      <div className="w-1/4 flex flex-1">
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
      </div>
    </TaskWrapper>
  );
};

export default Task;

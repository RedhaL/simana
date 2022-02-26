import React, { FC, MouseEvent, useState } from "react";
import { ITask, Dispatch } from "../types";
import Popup from "reactjs-popup";
import dayjs from "dayjs";
import {
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline";
import tw, { styled } from "twin.macro";

type Props = {
  task: ITask;
  dispatch: Dispatch;
  index: number;
};

const StyledPopup = styled(Popup)`
  &-overlay {
    ${tw`
        bg-indigo-200
        rounded
        border-2
        p-4
    `}
    margin: auto;
    width: 50%;
    height: 50%;
  }
  &-content {
    ${tw`
       flex
       h-full
       w-full
       
    `}
  }
`;

const Title = styled.span`
  ${tw`
        px-2
        w-full
        h-full
        overflow-ellipsis
    `}
`;

const Modal: FC<Props> = (props) => {
  const [title, setTitle] = useState(props.task.title);

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = title;
      if (value) {
        props.dispatch({
          type: "EDIT_TASK",
          data: {
            task: { ...props.task, title: value },
            index: props.index,
          },
        });
      }
    }
  };

  return (
    <div className="flex-1">
      <StyledPopup
        trigger={<Title>{props.task.title}</Title>}
        modal
        closeOnDocumentClick
      >
        <div className="w-full">
          <div className="flex justify-between">
            <div className="">{dayjs.unix(props.task.timestamp).format()}</div>
            <div className="">
              <button onClick={handleDelete}>
                <TrashIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          <span className="pt-20 border-b-2 border-black flex font-bold justify-between">
            <input
              value={title}
              type="text"
              className="outline-none bg-indigo-200 w-full font-extrabold"
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              defaultValue={props.task.title}
            ></input>
            <button onClick={handleCheck}>
              <CheckCircleIcon className="h-5 w-5 text-gray-600" />
            </button>
          </span>
        </div>
      </StyledPopup>
    </div>
  );
};

export default Modal;

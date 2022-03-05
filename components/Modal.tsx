import React, { FC, MouseEvent, useState } from "react";
import { ITask, Dispatch } from "../types";
import Popup from "reactjs-popup";
import dayjs from "dayjs";
import {
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import tw, { styled } from "twin.macro";
import { CirclePicker } from "react-color";

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
        rounded-lg
        truncate
        `}
  text-overflow: ellipsis;
  overflow: hidden;
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

  const handleChangeColor = (color: { hex: string }) => {
    props.dispatch({
      type: "EDIT_TASK",
      data: {
        task: { ...props.task, color: color.hex },
        index: props.index,
      },
    });
  };

  return (
    <div className="flex w-3/4 p-1">
      <StyledPopup
        trigger={
          <Title
            className={
              !props.task.done
                ? props.task.color == "#4caf50"
                  ? "bg-Igreen"
                  : props.task.color == "#f44336"
                  ? "bg-Ired"
                  : props.task.color == "#ffeb3b"
                  ? "bg-Iyellow"
                  : props.task.color == "#ff9800"
                  ? "bg-Iorange"
                  : props.task.color == "#9c27b0"
                  ? "bg-Ipink"
                  : props.task.color == "#673ab7"
                  ? "bg-Iviolet text-white"
                  : props.task.color == "#795548"
                  ? "bg-Ibrown"
                  : props.task.color == "#2196f3"
                  ? "bg-Iblue"
                  : "null"
                : props.task.color == "#4caf50"
                ? "bg-Igreen flex-1 line-through opacity-30"
                : props.task.color == "#f44336"
                ? "bg-Ired flex-1 line-through opacity-30"
                : props.task.color == "#ffeb3b"
                ? "bg-Iyellow flex-1 line-through opacity-30"
                : props.task.color == "#ff9800"
                ? "bg-Iorange flex-1 line-through opacity-30"
                : props.task.color == "#9c27b0"
                ? "bg-Ipink flex-1 line-through opacity-30"
                : props.task.color == "#673ab7"
                ? "bg-Iviolet flex-1 line-through opacity-30 text-white"
                : props.task.color == "#795548"
                ? "bg-Ibrown flex-1 line-through opacity-30"
                : props.task.color == "#2196f3"
                ? "bg-Iblue flex-1 line-through opacity-30"
                : "flex-1 line-through opacity-30"
            }
          >
            {props.task.title}
          </Title>
        }
        modal
        nested
        closeOnDocumentClick
      >
        <div className="w-full">
          <div className="flex justify-between">
            <div className="">
              {props.task.timestamp
                ? dayjs.unix(props.task.timestamp).format()
                : props.task.columnId}
            </div>
            <div className="">
              <button onClick={handleDelete}>
                <TrashIcon className="h-5 w-5 text-gray-600 cursor-pointer" />
              </button>
              <Popup
                trigger={
                  <button>
                    <PencilIcon className="h-5 w-5 text-gray-600 cursor-pointer" />
                  </button>
                }
                position="bottom right"
                on="hover"
                closeOnDocumentClick
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                contentStyle={{ padding: "0px", border: "none" }}
                arrow={false}
                nested
              >
                <CirclePicker
                  width={"200px"}
                  colors={[
                    "#f44336",
                    "#9c27b0",
                    "#673ab7",
                    "#2196f3",
                    "#4caf50",
                    "#ffeb3b",
                    "#ff9800",
                    "#795548",
                  ]}
                  onChange={handleChangeColor}
                />
              </Popup>
            </div>
          </div>
          <span className="pt-20 border-b-2 border-black flex font-bold justify-between">
            <input
              type="text"
              className={
                props.task.done
                  ? "flex-1 line-through opacity-30 outline-none bg-indigo-200 w-full font-extrabold"
                  : "outline-none bg-indigo-200 w-full font-extrabold"
              }
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

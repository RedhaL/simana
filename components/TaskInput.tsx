import React, { FC, FocusEvent, useState } from "react";
import tw, { styled } from "twin.macro";
import { ITask, Dispatch } from "../types";

type Props = {
  dispatch: Dispatch;
  columnId: string;
  timestamp: number;
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
`;

const StyledInput = styled.input`
  ${tw`
        appearance-none
        outline-none
        px-2
        w-full
        h-full
    `}
`;
var localUser = { _id: "" };
const TaskInput: FC<Props> = (props) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("user");
    localUser = JSON.parse(saved ? saved : "{}");
  }

  const task: ITask = {
    userId: localUser._id,
    title: "",
    description: "",
    done: false,
    timestamp: props.timestamp ? props.timestamp : null,
    columnId: props.columnId,
    color: "",
  };

  const [title, setTitle] = useState(task.title);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = title;
    if (value) {
      task.title = value;
      props.dispatch({
        type: "ADD_TASK",
        data: { task },
      });
      setTitle("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = title;
      if (value) {
        task.title = value;
        props.dispatch({
          type: "ADD_TASK",
          data: { task },
        });
        setTitle("");
      }
    }
  };

  return (
    <TaskWrapper>
      <StyledInput
        type="text"
        value={title}
        onBlur={handleBlur}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </TaskWrapper>
  );
};

export default TaskInput;

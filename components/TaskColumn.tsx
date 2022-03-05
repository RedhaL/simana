import React, { FC } from "react";
import tw, { styled } from "twin.macro";
import { capitalizeFirstLetter } from "../common/utils";
import { InitialColumnSize } from "../common/constants";
import TaskInput from "./TaskInput";
import Task from "./Task";
import { Dispatch, ITask } from "../types";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

type Props = {
  element: any;
  size: InitialColumnSize;
  taskDispatch: Dispatch;
  tasks: ITask[];
};

interface ColumnProps {
  size?: InitialColumnSize;
}

const ColumnBG = styled.div<ColumnProps>`
  ${tw`
        flex
        flex-col
        flex-1
    `}
  height: ${(p: ColumnProps) =>
    p.size == InitialColumnSize.Half ? "190px" : "456px"};
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%27100%25%27%20height%3D%2738%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%0A%20%20%3Cline%20x1%3D%270%27%20y1%3D%2737.5%27%20x2%3D%27100%25%27%20y2%3D%2737.5%27%20stroke%3D%27%23444444%27%20stroke-opacity%3D%27.2%27%2F%3E%0A%3C%2Fsvg%3E");
`;

const TodoColumn: FC<Props> = ({ element, size, taskDispatch, tasks }) => {
  const title = element.hasOwnProperty("timestamp")
    ? `${capitalizeFirstLetter(element.dayName)} ${element.day}/${
        element.monthName
      }`
    : capitalizeFirstLetter(element.title);
  return (
    <div className="px-2">
      <h2 className="border-b-2 border-black pt-3">{title}</h2>
      <ColumnBG size={size}>
        {tasks &&
          tasks.map((element, index) => (
            <Draggable
              key={element._id}
              draggableId={element._id ? element._id : ""}
              index={index}
            >
              {(
                providedDraggable: DraggableProvided,
                snapshotDraggable: DraggableStateSnapshot
              ) => (
                <div
                  ref={providedDraggable.innerRef}
                  {...providedDraggable.draggableProps}
                  {...providedDraggable.dragHandleProps}
                >
                  <Task
                    dispatch={taskDispatch}
                    task={element}
                    key={element._id}
                    index={index}
                  />
                </div>
              )}
            </Draggable>
          ))}
        <Draggable
          key={`${element._id}_0`}
          draggableId={`${element._id}_0`}
          isDragDisabled={true}
          index={tasks ? tasks.length : 0}
        >
          {(
            providedDraggable: DraggableProvided,
            snapshotDraggable: DraggableStateSnapshot
          ) => (
            <div
              ref={providedDraggable.innerRef}
              {...providedDraggable.draggableProps}
              {...providedDraggable.dragHandleProps}
            >
              <TaskInput
                dispatch={taskDispatch}
                columnId={element._id}
                timestamp={element.timestamp}
              />
            </div>
          )}
        </Draggable>
      </ColumnBG>
    </div>
  );
};

export default TodoColumn;

import React, { FC, useEffect, useState } from "react";
import { styled } from "twin.macro";
import TaskColumn from "./TaskColumn";
import { InitialColumnSize } from "../common/constants";
import { getWeekDays } from "../common/utils";
import { IAction, TaskState, CategoryState, CalendarState } from "../types";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";

interface Props {
  tasks: TaskState;
  categoryStore?: CategoryState;
  calendarStore?: CalendarState;
  taskDispatch: (action: IAction) => void;
}

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "white",
  width: "100%",
});

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 16.66666%);
`;

const TaskContainer: FC<Props> = ({
  taskDispatch,
  tasks,
  categoryStore,
  calendarStore,
}) => {
  // Make Sure the window object is ready before loading up CalendarWrapper. [Bug 1] : https://www.notion.so/BUG-1-Tasks-in-first-line-can-t-be-moved-22a81bca43e94811b01216899699c04b
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  const columns = [];
  let items: any = [];
  if (calendarStore) {
    items = getWeekDays(calendarStore);
  } else {
    items = categoryStore;
  }
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    const columnTasks = tasks[element._id];
    let columnSize = InitialColumnSize.Half;
    if (calendarStore) {
      columnSize = i < 5 ? InitialColumnSize.Full : InitialColumnSize.Half;
    }
    columns.push(
      <Droppable key={element._id} droppableId={element._id}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <TaskColumn
              element={element}
              size={columnSize}
              taskDispatch={taskDispatch}
              tasks={columnTasks}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }

  return (
    <>
      {winReady ? (
        <CalendarWrapper className="flex flex-1">
          {calendarStore ? (
            <>
              {columns.slice(0, 5)}
              <div>{columns.slice(-2)}</div>
            </>
          ) : (
            columns
          )}
        </CalendarWrapper>
      ) : null}
    </>
  );
};

export default TaskContainer;

import React, { FC } from 'react';
import tw, { styled } from 'twin.macro';
import { capitalizeFirstLetter } from '../common/utils';
import { InitialColumnSize } from '../common/constants'
import TaskInput from './TaskInput';
import { IDate } from '../types';

type Props = {
    date: IDate,
    size: InitialColumnSize,
};

interface ColumnProps {
    size?: InitialColumnSize;
}

const ColumnBG = styled.div<ColumnProps>`
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D'480'%20height%3D'38'%20fill%3D'none'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%0A%20%20%3Cline%20x1%3D'0'%20y1%3D'37.5'%20x2%3D'100%25'%20y2%3D'37.5'%20stroke%3D'%23444444'%20stroke-opacity%3D'.2'%2F%3E%0A%3C%2Fsvg%3E");
    width:100%;
    height: ${(p: ColumnProps) =>
        p.size == InitialColumnSize.Half ? '190px' : '456px'
    };
`

const DayColumn: FC<Props> = (props) => {
    return (
        <div>
            <h2 className="border-b-2 border-black pt-3">
                {`${capitalizeFirstLetter(props.date.dayName)} ${props.date.day}/${props.date.monthName}`}
            </h2>
            <ColumnBG size={props.size}>
                <TaskInput />
            </ColumnBG>
        </div>
    );
}

export default DayColumn;
import React, { FC } from 'react';
import tw, { styled } from 'twin.macro';
type Props = {

};

const StyledInput = styled.input`
    ${tw`
        appearance-none
        outline-none
        px-2
        border-b
        focus:border-indigo-600
    `}
    border-color: rgba(68, 68, 68, .2);
    height: 38px;
`

const TaskInput: FC<Props> = (props) => {
    return (
        <div className="flex flex-col">
            <StyledInput type="text" />
        </div>
    )
}

export default TaskInput;
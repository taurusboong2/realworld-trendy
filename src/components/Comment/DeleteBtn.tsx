import React, { FC } from 'react';
import { FaTrash } from 'react-icons/fa';

type Props = {
  removeComment: () => Promise<void>;
};

const DeleteBtn: FC<Props> = ({ removeComment }) => {
  return (
    <span className="mod-options">
      <i className="fa-solid fa-trash-can" onClick={removeComment}>
        <FaTrash />
        삭제
      </i>
    </span>
  );
};

export default DeleteBtn;

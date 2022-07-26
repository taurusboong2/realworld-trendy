import React, { FC, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';

type Props = {
  tagList: string[];
  pushTag: (newTag: string) => void;
  deleteTag: (index: number) => void;
};

const EnterKeyCode = 13;

const TagInput: FC<Props> = ({ tagList, pushTag, deleteTag }) => {
  const tagInput = useRef<HTMLInputElement>(null);

  const handleTagInputkeyDown = e => {
    switch (e.keyCode) {
      case EnterKeyCode:
        pushTag(tagInput.current?.value as string);
        tagInput.current!.value = '';
    }
  };

  const handleremoveTags = index => {
    deleteTag(index);
  };

  return (
    <>
      <fieldset className="form-group">
        <input
          ref={tagInput}
          className="form-control"
          type="text"
          placeholder="Enter tags"
          onKeyDown={handleTagInputkeyDown}
        />

        <div className="tag-list">
          {tagList?.map((tag, index) => (
            <span className="tag-default tag-pill" key={index}>
              {tag}
              <FaTrash onClick={() => handleremoveTags(index)} />
            </span>
          ))}
        </div>
      </fieldset>
    </>
  );
};

export default TagInput;

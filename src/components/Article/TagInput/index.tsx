import React, { FC, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import { UseFormRegister } from 'react-hook-form';
import { NewArticleData } from '../../../types/article';

type Props = {
  tagList: string[];
  tagInput: UseFormRegister<NewArticleData>;
  pushTag: (newTag: string) => void;
  deleteTag: (index: number) => void;
};

const EnterKeyCode = 13;

const TagInput: FC<Props> = ({ tagList, pushTag, deleteTag, tagInput }) => {
  const tagRef = useRef<HTMLInputElement>(null);

  const handleTagInputkeyDown = e => {
    switch (e.keyCode) {
      case EnterKeyCode:
        pushTag(tagInput as any);
        tagInput = '';
    }
  };

  const handleremoveTags = index => {
    deleteTag(index);
  };

  return (
    <>
      <fieldset className="form-group">
        <input
          {...tagInput('article.tagList')}
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

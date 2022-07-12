import React, { LegacyRef, forwardRef, ForwardRefExoticComponent } from 'react';

type Props = {
  input: boolean;
  placeholder: string;
  ref: any;
};

const ArticleInput: ForwardRefExoticComponent<Props> = forwardRef(
  (props, ref: LegacyRef<HTMLInputElement | HTMLTextAreaElement | undefined>) => {
    return (
      <>
        {props.input ? (
          <fieldset className="form-group">
            <input type="text" className="form-control form-control-lg" placeholder={props.placeholder} ref={ref} />
          </fieldset>
        ) : (
          <fieldset className="form-group">
            <textarea className="form-control" rows={8} placeholder={props.placeholder} ref={ref} />
          </fieldset>
        )}
      </>
    );
  }
);

export default ArticleInput;

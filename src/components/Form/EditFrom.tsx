import React, { FC, useRef } from 'react';
import { useCreateNewArticle } from '../../hooks/article.hook';

type Props = {
  isCreatePage: boolean;
};

const EditFrom: FC<Props> = ({ isCreatePage }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);

  const { mutate: createNewArticle, isLoading: isCreating } = useCreateNewArticle();

  const handleSubmitCreate = async () => {
    const newArticleData = {
      article: {
        title: titleRef.current?.value as string,
        description: descriptionRef.current?.value as string,
        body: bodyRef.current?.value as string,
        tagList: [],
      },
    };
    await createNewArticle(newArticleData);
  };

  const handleSubmitUpdate = () => {
    console.log('업데이트');
  };

  return (
    <>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="제목을 입력해주세요."
                      ref={titleRef}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="내용을 입력해주세요."
                      ref={descriptionRef}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="바디를 입력해주세요."
                      ref={bodyRef}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    onClick={isCreatePage ? handleSubmitCreate : handleSubmitUpdate}
                    disabled={isCreating}>
                    {isCreatePage ? 'Publish' : 'Update'} Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditFrom;

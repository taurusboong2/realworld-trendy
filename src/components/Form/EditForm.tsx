import React, { FC, useEffect, useRef, useState } from 'react';
import TagInput from '../Article/TagInput';
import { useParams } from 'react-router';
import { useCreateNewArticle, useFetchArticle, useUpdateArticle } from '../../hooks/article.hook';

type Props = {
  isCreatePage: boolean;
};

const EditForm: FC<Props> = ({ isCreatePage }) => {
  const { slug } = useParams();

  const [tagList, setTagList] = useState<string[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);

  const { mutate: createNewArticle, isLoading: isCreating } = useCreateNewArticle();
  const { mutate: updateCurrentArticle } = useUpdateArticle();
  const { data } = useFetchArticle(slug as string);

  const articleData = data?.data.article;

  useEffect(() => {
    if (isCreatePage) return;
    if (articleData && !isCreatePage) {
      if (typeof window !== 'undefined') {
        titleRef.current!.value = articleData!.title as string;
        descriptionRef.current!.value = articleData!.description as string;
        bodyRef.current!.value = articleData!.body as string;
        setTagList(articleData.tagList);
      }
    }
  }, []);

  const handleSubmitCreate = async () => {
    const newArticleData = {
      article: {
        title: titleRef.current?.value as string,
        description: descriptionRef.current?.value as string,
        body: bodyRef.current?.value as string,
        tagList: tagList,
      },
    };
    await createNewArticle(newArticleData);
  };

  const handleSubmitUpdate = async () => {
    const changedData = {
      article: {
        title: titleRef.current?.value as string,
        description: descriptionRef.current?.value as string,
        body: bodyRef.current?.value as string,
        tagList: tagList,
      },
    };
    await updateCurrentArticle({
      props: {
        slug: slug as string,
        newData: changedData,
      },
    });
  };

  const pushTag = (newTag: string): void => {
    setTagList([...tagList, newTag]);
  };

  const deleteTag = (index: number): void => {
    const filtered = tagList.filter((tag, tagIndex) => tagIndex !== index);

    setTagList(filtered);
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
                  <TagInput tagList={tagList} pushTag={pushTag} deleteTag={deleteTag} />
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

export default EditForm;

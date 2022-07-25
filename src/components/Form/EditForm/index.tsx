import React, { FC, useEffect, useRef, useState } from 'react';
import TagInput from '../../Article/TagInput';
import { useParams } from 'react-router';
import { useCreateNewArticle, useFetchArticle, useUpdateArticle } from '../../../hooks/article.hook';
import { useForm } from 'react-hook-form';
import { NewArticleData } from '../../../types/article';
import { ErrorMessage, ERROR_BORDER, REQUIRED_Msg } from '../../../commons/errorStyles';

type Props = {
  isCreatePage: boolean;
};

const EditForm: FC<Props> = ({ isCreatePage }) => {
  const { slug } = useParams();

  const [tagList, setTagList] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NewArticleData>();
  const articleError = errors.article;

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

  const handleSubmitCreate = async (register: NewArticleData) => {
    await createNewArticle(register);
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
    setValue('article.tagList', [...tagList, newTag]);
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
                      {...register('article.title', {
                        required: REQUIRED_Msg,
                      })}
                      style={articleError && ERROR_BORDER}
                      placeholder={articleError?.title ? '' : 'title'}
                      type="text"
                      className="form-control form-control-lg"
                    />
                    {articleError?.title && <ErrorMessage>{articleError?.title.message}</ErrorMessage>}
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      {...register('article.description', {
                        required: REQUIRED_Msg,
                      })}
                      style={articleError && ERROR_BORDER}
                      placeholder={articleError?.description ? '' : 'description'}
                      className="form-control"
                      rows={8}
                    />
                    {articleError?.description && <ErrorMessage>{articleError?.description.message}</ErrorMessage>}
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      {...register('article.body', {
                        required: REQUIRED_Msg,
                      })}
                      style={articleError && ERROR_BORDER}
                      placeholder={articleError?.body ? '' : 'body'}
                      type="text"
                      className="form-control form-control-lg"
                    />
                    {articleError?.body && <ErrorMessage>{articleError?.body.message}</ErrorMessage>}
                  </fieldset>
                  <TagInput tagList={tagList} pushTag={pushTag} deleteTag={deleteTag} register={register} />
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    onClick={isCreatePage ? handleSubmit(handleSubmitCreate) : handleSubmitUpdate}
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

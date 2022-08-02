import React, { FC, useEffect, useState } from 'react';
import TagInput from '../../Article/TagInput';
import { useParams } from 'react-router';
import { useCreateNewArticle, useFetchArticle, useUpdateArticle } from '@/hooks/article.hook';
import { useForm } from 'react-hook-form';
import { NewArticleData } from '@/types/article';
import { ErrorMessage } from '@/commons/errorStyledComponents';
import * as messages from '@/constants/messages';
import classnames from 'classnames';
import axios from 'axios';
import { ErrorCode } from '@/constants/errorCodes';
import { createToast } from '@/components/common/Toast';

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
    reset,
    setError,
  } = useForm<NewArticleData>({
    defaultValues: {
      article: {
        tagList: [''],
      },
    },
  });
  const articleError = errors.article;

  const { mutate: createNewArticle, isLoading: isCreating } = useCreateNewArticle();

  const { mutate: updateCurrentArticle } = useUpdateArticle();

  const { data } = useFetchArticle(slug as string, !!slug);

  const articleData = data?.data.article;

  useEffect(() => {
    if (isCreatePage) return;
    if (articleData && !isCreatePage) {
      reset({
        article: {
          title: articleData.title,
          description: articleData.description,
          body: articleData.body,
        },
      });
      setTagList(articleData.tagList);
    }
  }, [articleData]);

  const handleSubmitCreate = async (register: NewArticleData) => {
    await createNewArticle(register, {
      onError: error => {
        if (!axios.isAxiosError(error)) {
          throw error;
        }
        const errorCode: number = error?.response?.status as number;
        if (errorCode === ErrorCode.FailValidation) {
          setError('article.title', { message: messages.UNIQUE_title }, { shouldFocus: true });
          createToast({
            message: messages.ARTICLE_failValidate,
            type: 'error',
          });
        }
      },
    });
  };

  const handleSubmitUpdate = async (register: NewArticleData) => {
    await updateCurrentArticle({
      props: {
        slug: slug as string,
        newData: register,
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
                        required: messages.REQUIRED_message,
                      })}
                      placeholder={articleError?.title ? '' : 'title'}
                      type="text"
                      className={classnames('form-control form-control-lg', { is_error: articleError?.title })}
                    />
                    {articleError?.title && <ErrorMessage>{articleError?.title.message}</ErrorMessage>}
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      {...register('article.description', {
                        required: messages.REQUIRED_message,
                      })}
                      placeholder={articleError?.description ? '' : 'description'}
                      className={classnames('form-control form-control-lg', { is_error: articleError?.description })}
                      rows={8}
                    />
                    {articleError?.description && <ErrorMessage>{articleError?.description.message}</ErrorMessage>}
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      {...register('article.body', {
                        required: messages.REQUIRED_message,
                      })}
                      placeholder={articleError?.body ? '' : 'body'}
                      type="text"
                      className={classnames('form-control form-control-lg', { is_error: articleError?.body })}
                    />
                    {articleError?.body && <ErrorMessage>{articleError?.body.message}</ErrorMessage>}
                  </fieldset>
                  <TagInput tagList={tagList} pushTag={pushTag} deleteTag={deleteTag} />
                  <button
                    className={classnames('btn btn-lg pull-xs-right btn-primary', { is_error: articleError })}
                    type="button"
                    onClick={isCreatePage ? handleSubmit(handleSubmitCreate) : handleSubmit(handleSubmitUpdate)}
                    disabled={isCreating || !!articleError}>
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

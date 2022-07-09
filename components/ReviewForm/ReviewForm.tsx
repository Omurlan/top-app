import React, { useState } from 'react';
import cn from 'classnames';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import UserIcon from './user.svg';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import { API } from '../../helpers/api';

export function ReviewForm({
  productId, isOpened, className, ...props
}:ReviewFormProps): JSX.Element {
  const {
    register, control, handleSubmit, formState: { errors },
    reset,
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>('');

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError('Что-то пошло не так');
      }
    } catch (e) {
      setIsError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', { required: { value: true, message: 'Заполните имя' } })}
          error={errors.name}
          placeholder="Имя"
          tabIndex={isOpened ? 0 : -1}
        />
        <Input
          {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
          error={errors.title}
          placeholder="Заголовок письма"
          className={styles.title}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={styles.rating}>
          <span>Оценка</span>
          <Controller
            control={control}
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
            name="rating"
            render={({ field }) => (
              <Rating
                tabIndex={isOpened ? 0 : -1}
                error={errors.rating}
                isEditable
                setRating={field.onChange}
                ref={field.ref}
                rating={field.value}
              />
            )}
          />

        </div>
        <Textarea
          {...register('description', { required: { value: true, message: 'Заполние описание' } })}
          error={errors.description}
          placeholder="Текст"
          className={styles.description}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={styles.submit}>
          <Button
            appearance="primary"
            type="submit"
            tabIndex={isOpened ? 0 : -1}
          >
            Отправить

          </Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>
            Спасибо, ваш отзыв будет опубликован после проверки.
          </div>
          <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)} />
        </div>

      )}
      {isError && (
        <div className={cn(styles.error, styles.panel)}>
          Что-то пошло не так, попробуйте обновить страницу
          <CloseIcon className={styles.close} onClick={() => setIsError('')} />
        </div>
      )}

    </form>

  );
}

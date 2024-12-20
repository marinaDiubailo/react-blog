import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Text as TextDeprecated,
  TextAlign,
  TextSize,
  TextTheme,
} from '@/shared/ui/deprecated/Text';
import {
  Skeleton as SkeletonRedesigned,
  Text,
  AppImage,
  HStack,
  VStack,
} from '@/shared/ui';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import {
  getArticleData,
  getArticleError,
  getArticleIsLoading,
} from '../../model/selectors/getArticleSelectors';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleReducer } from '../../model/slices/articleSlice';
import { renderArticleBlock } from './renderArticleBlock';
import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  article: articleReducer,
};

const Deprecated = () => {
  const article = useSelector(getArticleData);
  return (
    <>
      <HStack justify="center" max>
        <AvatarDeprecated
          size={200}
          src={article?.img}
          className={cls.avatar}
        />
      </HStack>
      <VStack gap="4" max data-testid="ArticleDetails.Info">
        <TextDeprecated
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <HStack gap="8">
          <Icon Svg={EyeIcon} />
          <TextDeprecated text={String(article?.views)} />
        </HStack>
        <HStack gap="8">
          <Icon Svg={CalendarIcon} />
          <TextDeprecated text={article?.createdAt} />
        </HStack>
      </VStack>
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

const Redesigned = () => {
  const article = useSelector(getArticleData);
  return (
    <>
      <Text title={article?.title} size={'l'} bold />
      <Text title={article?.subtitle} />
      <AppImage
        fallback={
          <SkeletonRedesigned width={'100%'} height={420} border={'16px'} />
        }
        className={cls.img}
        src={article?.img}
      />
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleIsLoading);
  const error = useSelector(getArticleError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  const Skeleton = SkeletonRedesigned;
  if (isLoading) {
    content = (
      <>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border={'50%'}
        />
        <Skeleton width={300} height={32} />
        <Skeleton width={600} height={24} />
        <Skeleton width={'100%'} height={200} />
        <Skeleton width={'100%'} height={200} />
      </>
    );
  } else if (error) {
    content = (
      <TextDeprecated
        theme={TextTheme.ERROR}
        title={t('An error occured')}
        align={TextAlign.CENTER}
      />
    );
  } else {
    content = <Redesigned />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack gap="16" max className={classNames(cls.article, {}, [className])}>
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});

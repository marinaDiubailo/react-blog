/* eslint-disable react/jsx-props-no-spreading */
import { lazy, Suspense } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { ArticleRatingProps } from './ArticleRating';

const ArticleRatingLazy = lazy(() => import('./ArticleRating'));
export const ArticleRatingAsync = (props: ArticleRatingProps) => {
    return (
        <Suspense
            fallback={
                <Skeleton
                    width='100%'
                    height={120}
                />
            }
        >
            <ArticleRatingLazy {...props} />
        </Suspense>
    );
};

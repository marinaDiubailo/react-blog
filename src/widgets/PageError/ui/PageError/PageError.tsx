import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}

export const PageError: FC<PageErrorProps> = ({ className }) => {
    const { t } = useTranslation();

    const reloadPagehandler = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(cls['page-error'], {}, [className])}>
            <p>{t('Ошибка')}</p>
            <Button onClick={reloadPagehandler} theme={ButtonTheme.CLEAR}>
                {t('Обновить страницу')}
            </Button>
        </div>
    );
};

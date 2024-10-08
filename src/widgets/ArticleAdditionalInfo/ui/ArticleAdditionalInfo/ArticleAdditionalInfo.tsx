import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
// import { Button } from '@/shared/ui/redesigned/Button';
import { ArticleEditButton } from '@/features/ArticleEditButton';

interface ArticleAdditionalInfoProps {
    className?: string;
    author: User;
    createdAt: string;
    views: number;
    canEdit: boolean;
}

export const ArticleAdditionalInfo = memo(
    (props: ArticleAdditionalInfoProps) => {
        const { className, author, createdAt, canEdit, views } = props;
        const { t } = useTranslation('article');

        return (
            <VStack gap="32" className={className}>
                <HStack gap="8">
                    <Avatar src={author.avatar} size={32} />{' '}
                    <Text text={author.username} bold />
                    <Text text={createdAt} />
                </HStack>
                {/* <Button>{t('Edit')}</Button> */}
                {canEdit && <ArticleEditButton />}
                <Text text={t('{{count}} views', { count: views })} />
            </VStack>
        );
    },
);

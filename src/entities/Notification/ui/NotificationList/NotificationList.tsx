import { memo } from 'react';
// import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton, VStack } from '@/shared/ui';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import cls from './NotificationList.module.scss';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;
  // const { t } = useTranslation();
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls['notification-list'], {}, [className])}
      >
        <Skeleton width={'100%'} border="8px" height={80} />
        <Skeleton width={'100%'} border="8px" height={80} />
        <Skeleton width={'100%'} border="8px" height={80} />
      </VStack>
    );
  }

  return (
    <VStack
      gap="16"
      max
      className={classNames(cls['notification-list'], {}, [className])}
    >
      {data?.map((item) => <NotificationItem key={item.id} item={item} />)}
    </VStack>
  );
});

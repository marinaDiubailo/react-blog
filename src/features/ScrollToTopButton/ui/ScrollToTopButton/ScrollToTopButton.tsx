import { memo } from 'react';
import { Icon } from '@/shared/ui';
import CircleIcon from '@/shared/assets/icons/redesigned/circle-up.svg';

interface ScrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
  const { className } = props;

  const onClickHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Icon
      Svg={CircleIcon}
      clickable
      onClick={onClickHandler}
      width={32}
      height={32}
      className={className}
    />
  );
});

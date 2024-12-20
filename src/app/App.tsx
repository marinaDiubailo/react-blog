import { memo, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { NavBar } from '@/widgets/NavBar';
import { getUserMounted, initAuthData } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppRouter } from './providers/Router';
import { useAppToolbar } from './lib/useAppToolbar';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import { Header } from '@/widgets/Header';
import { PageLoader } from '@/widgets/PageLoader';

const App = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const mounted = useSelector(getUserMounted);
  const toolbar = useAppToolbar();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mounted) {
      dispatch(initAuthData()).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  if (isLoading) {
    return (
      <div id="app" className={classNames('app-redesigned', {}, [theme])}>
        <PageLoader />
      </div>
    );
  }

  return (
    <div id="app" className={classNames('app-redesigned', {}, [theme])}>
      <Suspense fallback="">
        <MainLayout
          navbar={<NavBar />}
          content={<AppRouter />}
          header={<Header />}
        />
      </Suspense>
    </div>
  );
});

export default withTheme(App);

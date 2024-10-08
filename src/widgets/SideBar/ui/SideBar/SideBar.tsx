import { memo, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/redesigned/arrow-bottom.svg';
import SideBarItem from '../SideBarItem/SideBarItem';
import { useSideBarItems } from '../../model/selectors/getSideBarItems';
import cls from './SideBar.module.scss';

interface SideBarProps {
    className?: string;
}

export const SideBar = memo(({ className }: SideBarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sideBarItemsList = useSideBarItems();

    const toggleHandler = () => {
        setCollapsed((prevState) => !prevState);
    };

    const itemsList = useMemo(
        () =>
            sideBarItemsList.map((item) => (
                <SideBarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
            )),
        [collapsed, sideBarItemsList],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <aside
                    data-testid="sidebar"
                    className={classNames(
                        cls['sidebar-redesigned'],
                        { [cls['collapsed-redesigned']]: collapsed },
                        [className],
                    )}
                >
                    <AppLogo
                        size={collapsed ? 30 : 50}
                        className={cls['app-logo']}
                    />
                    <VStack className={cls.items} gap="8" role="navigation">
                        {itemsList}
                    </VStack>
                    <Icon
                        data-testid="sidebar-toggle"
                        type="button"
                        onClick={toggleHandler}
                        className={cls.arrow}
                        Svg={ArrowIcon}
                        clickable
                    />
                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher className={cls.lang} />
                    </div>
                </aside>
            }
            off={
                <aside
                    data-testid="sidebar"
                    className={classNames(
                        cls.sidebar,
                        { [cls.collapsed]: collapsed },
                        [className],
                    )}
                >
                    <Button
                        data-testid="sidebar-toggle"
                        type="button"
                        onClick={toggleHandler}
                        className={cls.arrow}
                        theme={ButtonTheme.CLEAR}
                    >
                        <span
                            className={
                                collapsed
                                    ? cls['arrow-right']
                                    : cls['arrow-left']
                            }
                        />
                    </Button>
                    <VStack className={cls.items} gap="8" role="navigation">
                        {itemsList}
                    </VStack>
                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher className={cls.lang} />
                    </div>
                </aside>
            }
        />
    );
});

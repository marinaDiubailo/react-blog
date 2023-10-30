/* eslint-disable react/jsx-props-no-spreading */
import { memo, ReactNode, useCallback, useEffect } from 'react';
import {
    AnimationProvider,
    useAnimationLibs,
} from '@/shared/lib/components/AnimationProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Portal } from '../../redesigned/Portal/Portal';
import { Overlay } from '../../redesigned/Overlay/Overlay';
import cls from './Drawer.module.scss';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    lazy?: boolean;
    onClose?: () => void;
}

const height = window.innerHeight - 100;

export const DrawerContent = memo((props: DrawerProps) => {
    const { Spring, Gesture } = useAnimationLibs();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
    const { theme } = useTheme();

    const { className, children, isOpen, onClose, lazy } = props;

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);

    useEffect(() => {
        if (isOpen) {
            openDrawer();
        }
    }, [api, isOpen, openDrawer]);

    const close = (velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring.config.stiff, velocity },
            onResolve: onClose,
        });
    };

    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -70) cancel();

            if (last) {
                if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    close();
                } else {
                    openDrawer();
                }
            } else {
                api.start({ y: my, immediate: true });
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    );

    if (!isOpen) {
        return null;
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    // const mods: Mods = {
    //     [cls.opened]: isOpen,
    //     [cls['is-closing']]: isClosing,
    // };

    // const { isClosing, isMounted, close } = useModal({
    //     onClose,
    //     isOpen,
    //     animationDelay: 300,
    // });

    // if (lazy && !isMounted) {
    //     return null;
    // }

    // return (
    //     <Portal>
    //         <div className={classNames(cls.drawer, mods, [className])}>
    //             <Overlay onClick={close} />
    //             <div className={cls.content}>{children}</div>
    //         </div>
    //     </Portal>
    // );

    return (
        <Portal>
            <div
                className={classNames(cls.drawer, {}, [
                    className,
                    theme,
                    'app-drawer',
                ])}
            >
                <Overlay onClick={close} />
                <Spring.a.div
                    className={cls.sheet}
                    style={{
                        display,
                        bottom: `calc(-100vh + ${height - 100}px)`,
                        y,
                    }}
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    );
});

const DrawerAsync = (props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
};

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Drawer = (props: DrawerProps) => {
    return (
        <AnimationProvider>
            <DrawerAsync {...props} />
        </AnimationProvider>
    );
};
/* eslint-disable react/jsx-props-no-spreading */
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
// import { Select } from 'shared/ui/Select/Select';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popup';
import { ListBox } from '@/shared/ui/redesigned/Popup';
import { Country } from '../../model/types/country';
import { ToggleFeatures } from '@/shared/lib/features';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

export const CountrySelect = memo((props: CountrySelectProps) => {
    const { className, value, onChange, readonly } = props;
    const { t } = useTranslation('profile');

    const options = useMemo(
        () => [
            { value: Country.Belarus, content: t(Country.Belarus) },
            { value: Country.Kazakhstan, content: t(Country.Kazakhstan) },
            { value: Country.Russia, content: t(Country.Russia) },
            { value: Country.Ukraine, content: t(Country.Ukraine) },
        ],
        [t],
    );

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country);
        },
        [onChange],
    );

    const listBoxProps = {
        className,
        onChange: onChangeHandler,
        items: options,
        value,
        defaulValue: t('Country'),
        readonly,
        direction: 'top right' as const,
        label: t('Country'),
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<ListBox {...listBoxProps} />}
            off={<ListBoxDeprecated {...listBoxProps} />}
        />
    );

    // return (
    //     <Select
    //         className={classNames('', {}, [className])}
    //         label={t('Страна')}
    //         options={options}
    //         value={value}
    //         onChange={onChangeHandler}
    //         readonly={readonly}
    //     />
    // );
});

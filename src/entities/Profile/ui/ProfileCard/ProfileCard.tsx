/* eslint-disable react/jsx-props-no-spreading */
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '../../model/types/profile';

import {
  ProfileCardRedesigned,
  ProfileCardRedesignedSkeleton,
  ProfileCardRedesignedError,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value: string) => void;
  onChangeAge?: (value: string) => void;
  onChangeCity?: (value: string) => void;
  onChangeCountry?: (country: Country) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeUsername?: (value: string) => void;
  onChangeAvatar?: (value: string) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { error, isLoading } = props;

  if (isLoading) {
    return <ProfileCardRedesignedSkeleton />;
  }

  if (error) {
    return <ProfileCardRedesignedError />;
  }

  return <ProfileCardRedesigned {...props} />;
};

import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { RatingCard } from './RatingCard';

const meta = {
  title: 'entities/RatingCard',
  component: RatingCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    title: 'title',
    feedbackTitle: 'feedbackTitle',
    hasFeedback: true,
  },
} as Meta<typeof RatingCard>;

export default meta;
type Story = StoryObj<typeof RatingCard>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

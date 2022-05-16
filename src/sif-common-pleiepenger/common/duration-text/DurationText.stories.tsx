import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withIntlProvider from '../../../storybook/decorators/withIntlProvider';
import DurationText from './DurationText';

export default {
    title: 'Example/DurationText',
    component: DurationText,
    decorators: [withIntlProvider],
} as ComponentMeta<typeof DurationText>;

const Template: ComponentStory<typeof DurationText> = (args) => <DurationText {...args} />;

export const Default = Template.bind({});
Default.args = {
    duration: { hours: '2', minutes: '20' },
};
Default.parameters = {
    formik: {
        initialValues: {
            DurationText1: true,
        },
    },
};

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DurationText from './DurationText';
import StoriesFormikWrapper from '../../../storybook/decorators/StoriesFormikWrapper';

export default {
    title: 'Example/DurationText',
    component: DurationText,
    decorators: [(Story, args) => <StoriesFormikWrapper Story={Story} {...args} />],
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

import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import withIntlProvider from '../../decorators/withIntlProvider';
import DurationText from '../../../sif-common-pleiepenger/common/duration-text/DurationText';

export default {
    title: 'Komponenter/DurationText',
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

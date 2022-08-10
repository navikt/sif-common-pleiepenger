import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { DateDurationMap, Weekday } from '@navikt/sif-common-utils/lib';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { TidFasteUkedagerInput } from '../../../sif-common-pleiepenger';
import { TidFasteUkedagerInputProps } from '../../../sif-common-pleiepenger/tid/tid-faste-ukedager-input/TidFasteUkedagerInput';

import withIntlProvider from '../../decorators/withIntlProvider';

export default {
    title: 'Delskjema/TidFasteUkedagerInput',
    component: TidFasteUkedagerInput,
    decorators: [withIntlProvider],
} as ComponentMeta<typeof TidFasteUkedagerInput>;

const Template: ComponentStory<typeof TidFasteUkedagerInput> = (args) => <TidFasteUkedagerInput {...args} />;

const defaultFormProps: TidFasteUkedagerInputProps = {
    name: 'tid',
    validateDag: (dag) => `Feil på ${dag}`,
};

const defaultInitialValues: DateDurationMap = {
    monday: { hours: '1', minutes: '10' },
    tuesday: { hours: '2', minutes: '20' },
    wednesday: { hours: '3', minutes: '30' },
    thursday: { hours: '4', minutes: '40' },
    friday: { hours: '5', minutes: '50' },
};

enum Fields {
    'tid' = 'tid',
}
interface FormValues {
    tid: DateDurationMap;
}
const { FormikWrapper, Form } = getTypedFormComponents<Fields, FormValues>();

const renderStoryWrapper = (Story: any, intialValues: FormValues) => (
    <FormikWrapper
        initialValues={intialValues}
        onSubmit={(values) => console.log(values)}
        renderForm={() => (
            <Form includeButtons={true}>
                <Story />
            </Form>
        )}
    />
);

export const Default = Template.bind({});
Default.args = {
    ...defaultFormProps,
};
Default.decorators = [(Story) => renderStoryWrapper(Story, { tid: {} })];

export const WithInitialValues = Template.bind({});
WithInitialValues.args = {
    ...defaultFormProps,
};
WithInitialValues.decorators = [(Story) => renderStoryWrapper(Story, { tid: defaultInitialValues })];

export const WidthDisabledDays = Template.bind({});
WidthDisabledDays.args = {
    ...defaultFormProps,
    disabledDays: [Weekday.monday, Weekday.thursday],
};
WidthDisabledDays.decorators = [(Story) => renderStoryWrapper(Story, { tid: { ...defaultInitialValues } })];

export const HiddenDisabledDays = Template.bind({});
HiddenDisabledDays.args = {
    ...defaultFormProps,
    disabledDays: [Weekday.monday, Weekday.thursday],
    hideDisabledDays: true,
};
HiddenDisabledDays.decorators = [(Story) => renderStoryWrapper(Story, { tid: { ...defaultInitialValues } })];

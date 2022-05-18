import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { DateDurationMap, ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ArbeidsforholdType, ArbeidstidKalender } from '../../../sif-common-pleiepenger';
import withIntlProvider from '../../decorators/withIntlProvider';

export default {
    title: 'Skjema/ArbeidstidKalender',
    component: ArbeidstidKalender,
    decorators: [withIntlProvider],
} as ComponentMeta<typeof ArbeidstidKalender>;

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

const Template: ComponentStory<typeof ArbeidstidKalender> = (args) => <ArbeidstidKalender {...args} />;

export const Default = Template.bind({});
Default.args = {
    arbeidsforholdType: ArbeidsforholdType.ANSATT,
    arbeidsstedNavn: 'Snurres spretterier',
    måned: ISODateRangeToDateRange('2022-01-01/2022-01-31'),
    periode: ISODateRangeToDateRange('2022-01-15/2022-01-19'),
    tidArbeidstid: {},
    utilgjengeligeDatoer: [ISODateToDate('2022-01-05')],
    åpentEkspanderbartPanel: false,
    arbeiderNormaltTimerFasteUkedager: {
        friday: {
            hours: '7',
            minutes: '30',
        },
    },
};
Default.decorators = [(Story) => renderStoryWrapper(Story, { tid: {} })];
Default.parameters = {
    formik: {
        initialValues: {},
    },
};

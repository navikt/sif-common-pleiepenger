import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { DateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { ArbeidstidPeriodeForm, ArbeidstidPeriodeFormProps } from '../../sif-common-pleiepenger';
import withIntlProvider from '../decorators/withIntlProvider';
import { withDialogWrapperMedium } from '../decorators/withDialogWrapper';

export default {
    title: 'ArbeidstidPeriodeForm',
    component: ArbeidstidPeriodeForm,
    decorators: [withIntlProvider, withDialogWrapperMedium],
} as ComponentMeta<typeof ArbeidstidPeriodeForm>;

const Template: ComponentStory<typeof ArbeidstidPeriodeForm> = (args) => <ArbeidstidPeriodeForm {...args} />;

const testSøknadsperiode: DateRange = {
    from: ISODateToDate('2022-01-01'),
    to: ISODateToDate('2022-04-01'),
};

const defaultFormProps: Partial<ArbeidstidPeriodeFormProps> = {
    periode: testSøknadsperiode,
    arbeidsstedNavn: 'NAV',
    intlValues: {
        fra: 'fra-tekst',
        til: 'til-tekst',
        hvor: 'hos NAV',
        iPerioden: 'i perioden',
        skalEllerHarJobbet: 'jobber',
        timer: 'timer',
    },
    visAlleSpørsmål: false,
};
export const Default = Template.bind({});
Default.args = {
    ...defaultFormProps,
};

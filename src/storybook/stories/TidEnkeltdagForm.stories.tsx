import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { DateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { TidEnkeltdagForm } from '../../sif-common-pleiepenger';
import withIntlProvider from '../decorators/withIntlProvider';
import { TidEnkeltdagFormProps } from '../../sif-common-pleiepenger/tid/tid-enkeltdag-dialog/TidEnkeltdagForm';
import { withDialogWrapper } from '../decorators/withDialogWrapper';

export default {
    title: 'TidEnkeltdagForm',
    component: TidEnkeltdagForm,
    decorators: [withIntlProvider, withDialogWrapper],
} as ComponentMeta<typeof TidEnkeltdagForm>;

const Template: ComponentStory<typeof TidEnkeltdagForm> = (args) => <TidEnkeltdagForm {...args} />;

const testSøknadsperiode: DateRange = {
    from: ISODateToDate('2022-01-03'),
    to: ISODateToDate('2022-04-01'),
};

const defaultFormProps: TidEnkeltdagFormProps = {
    periode: testSøknadsperiode,
    dato: testSøknadsperiode.from,
    hvorMyeSpørsmålRenderer: () => 'Hvor mye jobbet du hos Karis Gullfisker mandag 3. januar 2020?',
    onSubmit: () => null,
    onCancel: () => null,
};

export const Default = Template.bind({});
Default.args = {
    ...defaultFormProps,
};

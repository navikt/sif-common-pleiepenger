import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { DateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { TidEnkeltdagForm } from '../../../sif-common-pleiepenger';
import { TidEnkeltdagFormProps } from '../../../sif-common-pleiepenger/tid/tid-enkeltdag-dialog/TidEnkeltdagForm';
import { withDialogWrapperSmall } from '../../decorators/withDialogWrapper';
import withIntlProvider from '../../decorators/withIntlProvider';

export default {
    title: 'Skjema/TidEnkeltdagForm',
    component: TidEnkeltdagForm,
    decorators: [withIntlProvider, withDialogWrapperSmall],
} as ComponentMeta<typeof TidEnkeltdagForm>;

const Template: ComponentStory<typeof TidEnkeltdagForm> = (args) => <TidEnkeltdagForm {...args} />;

const testSøknadsperiode: DateRange = {
    from: ISODateToDate('2022-01-03'),
    to: ISODateToDate('2022-04-01'),
};

const defaultFormProps: Partial<TidEnkeltdagFormProps> = {
    periode: testSøknadsperiode,
    dato: testSøknadsperiode.from,
    hvorMyeSpørsmålRenderer: () => 'Hvor mye jobbet du hos Karis Gullfisker mandag 3. januar 2020?',
    // onSubmit: () => null, Tas ikke med pga actions-addon outputer submit-data i storybook ved commit
};

export const Default = Template.bind({});
Default.args = {
    ...defaultFormProps,
};

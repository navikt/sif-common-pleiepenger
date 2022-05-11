import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { DateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { fireEvent, userEvent, waitFor, within } from '@storybook/testing-library';
import { ArbeidstidPeriodeForm, ArbeidstidPeriodeFormProps } from '../../sif-common-pleiepenger';
import StoriesWrapper from '../decorators/StoriesWrapper';

export default {
    title: 'ArbeidstidPeriodeForm',
    component: ArbeidstidPeriodeForm,
    decorators: [
        (Story, args) => (
            <StoriesWrapper {...args}>
                <Story />
            </StoriesWrapper>
        ),
    ],
    parameters: {
        actions: { argTypesRegex: '^on.*' },
    },
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
Default.parameters = {
    argTypes: { onSubmit: { action: 'onSubmit' } },
};
Default.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
        await userEvent.type(canvas.getByTestId('fra-dato'), '02.02.2022', { delay: 20 });
        await userEvent.type(canvas.getByTestId('til-dato'), '15.02.2022', { delay: 20 });
        await fireEvent.click(canvas.getByTestId('helt-fravær'), { delay: 10 });
    });
};

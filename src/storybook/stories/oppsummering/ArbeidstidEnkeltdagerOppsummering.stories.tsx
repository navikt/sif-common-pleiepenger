import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ArbeidstidEnkeltdagerOppsummering } from '../../../sif-common-pleiepenger';
import withIntlProvider from '../../decorators/withIntlProvider';

export default {
    title: 'Oppsummering/ArbeidstidEnkeltdagerOppsummering',
    component: ArbeidstidEnkeltdagerOppsummering,
    decorators: [withIntlProvider],
} as ComponentMeta<typeof ArbeidstidEnkeltdagerOppsummering>;

const Template: ComponentStory<typeof ArbeidstidEnkeltdagerOppsummering> = (args) => (
    <ArbeidstidEnkeltdagerOppsummering {...args} />
);

export const Default = Template.bind({});
Default.args = {
    dager: [
        { arbeidstimer: { normalTimer: 'PT7H30M', faktiskTimer: 'PT3H30M' }, dato: '2022-01-03' },
        { arbeidstimer: { normalTimer: 'PT7H30M', faktiskTimer: 'PT4H30M' }, dato: '2022-02-01' },
    ],
    visNormaltid: false,
};

export const IngenDagerRegistrert = Template.bind({});
IngenDagerRegistrert.args = {
    dager: [],
};

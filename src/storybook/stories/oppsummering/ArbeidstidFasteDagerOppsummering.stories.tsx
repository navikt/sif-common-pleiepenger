import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ArbeidstidFasteDagerOppsummering, ArbeidstimerFasteDagerApiData } from '../../../sif-common-pleiepenger';
import withIntlProvider from '../../decorators/withIntlProvider';

export default {
    title: 'Oppsummering/ArbeidstidFasteDagerOppsummering',
    component: ArbeidstidFasteDagerOppsummering,
    decorators: [withIntlProvider],
} as ComponentMeta<typeof ArbeidstidFasteDagerOppsummering>;

const Template: ComponentStory<typeof ArbeidstidFasteDagerOppsummering> = (args) => (
    <ArbeidstidFasteDagerOppsummering {...args} />
);

const fasteDager: ArbeidstimerFasteDagerApiData = {
    mandag: { faktiskTimer: 'PT1H0M', normalTimer: 'PT7H30M' },
    tirsdag: { faktiskTimer: 'PT2H0M', normalTimer: 'PT7H30M' },
    onsdag: { faktiskTimer: 'PT3H0M', normalTimer: 'PT7H30M' },
    torsdag: { faktiskTimer: 'PT4H0M', normalTimer: 'PT7H30M' },
    fredag: { faktiskTimer: 'PT5H0M', normalTimer: 'PT7H30M' },
};

export const Default = Template.bind({});
Default.args = {
    fasteDager,
    visNormaltid: false,
};

export const IngenDagerRegistrert = Template.bind({});
IngenDagerRegistrert.args = {};

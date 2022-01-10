import { arbeidstidPeriodeMessages } from '../arbeidstid-periode/arbeidstidPeriodeMessages';
import { omsorgstibudPeriodeMessages } from '../omsorgstilbud-periode/omsorgstilbudPeriodeMessages';
import { timerOgMinutterMessages } from '../timer-og-minutter/timerOgMinutterMessages';

export type ComponentMessages<Messages> = Record<string, Messages>;

export enum Locale {
    nb = 'nb',
    nn = 'nn',
}

export const sifCommonPleiepengerMessages = {
    nb: {
        ...arbeidstidPeriodeMessages.nb,
        ...omsorgstibudPeriodeMessages.nb,
        ...timerOgMinutterMessages.nb,
    },
};

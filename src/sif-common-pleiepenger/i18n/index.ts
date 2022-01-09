import { arbeidstidPeriodeMessages } from '../arbeidstid-periode/arbeidstidPeriodeMessages';
import { timerOgMinutterMessages } from '../timer-og-minutter/timerOgMinutterMessages';

export type ComponentMessages<Messages> = Record<string, Messages>;

export enum Locale {
    nb = 'nb',
    nn = 'nn',
}

export const sifCommonPleiepengerMessages = {
    nb: {
        ...arbeidstidPeriodeMessages.nb,
        ...timerOgMinutterMessages.nb,
    },
};

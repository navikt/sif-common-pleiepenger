import { omsorgstilbudEnkeltdagFormMessages } from '..';
import arbeidstidEnkeltdagFormMessages from '../arbeidstid-enkeltdag/arbeidstidEnkeltdagMessages';
import arbeidstidMånedInfoMessages from '../arbeidstid-måned-info/arbeidstidMånedInfoMessages';
import { arbeidstidPeriodeMessages } from '../arbeidstid-periode/arbeidstidPeriodeMessages';
import { calendarGridMessages } from '../calendar-grid/calendarGridMessages';
import { omsorgstibudPeriodeMessages } from '../omsorgstilbud-periode/omsorgstilbudPeriodeMessages';
import tidEnkeltdagFormMessages from '../tid-enkeltdag-dialog/tidEnkeltdagMessages';
import { timerOgMinutterMessages } from '../timer-og-minutter/timerOgMinutterMessages';

export type ComponentMessages<Messages> = Record<string, Messages>;

export const sifCommonPleiepengerMessages = {
    nb: {
        ...arbeidstidPeriodeMessages.nb,
        ...omsorgstibudPeriodeMessages.nb,
        ...omsorgstilbudEnkeltdagFormMessages.nb,
        ...timerOgMinutterMessages.nb,
        ...tidEnkeltdagFormMessages.nb,
        ...arbeidstidEnkeltdagFormMessages.nb,
        ...calendarGridMessages.nb,
        ...arbeidstidMånedInfoMessages.nb,
    },
};

import { IntlShape } from 'react-intl';
import { prettifyDate, prettifyDateFull } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik/lib';
import {
    DateRange,
    decimalDurationToDuration,
    Duration,
    durationToISODuration,
    ISODuration,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { formatTimerOgMinutter } from '../timer-og-minutter/TimerOgMinutter';
import { ArbeidIPeriodeIntlValues, ArbeidsforholdType } from '../types';
import { getArbeidstidPeriodeIntl } from './arbeidstidPeriodeMessages';

dayjs.extend(isoWeek);

const getRedusertArbeidstidPerUke = (
    jobberNormaltTimer: string | number | undefined,
    skalJobbeProsent: string | undefined
): { normalTimer: number; varighet: Duration } | undefined => {
    const normalTimer =
        typeof jobberNormaltTimer === 'number' ? jobberNormaltTimer : getNumberFromNumberInputValue(jobberNormaltTimer);
    const prosent = getNumberFromNumberInputValue(skalJobbeProsent);
    if (normalTimer !== undefined && prosent !== undefined) {
        const varighet = getRedusertArbeidstidSomDuration(normalTimer / 5, prosent);
        if (varighet) {
            return {
                normalTimer,
                varighet,
            };
        }
    }
    return undefined;
};

export const getRedusertArbeidstidPerUkeInfo = (
    intl: IntlShape,
    jobberNormaltTimerPerUke: string | number | undefined,
    skalJobbeProsent: string | undefined
): string => {
    const arbIntl = getArbeidstidPeriodeIntl(intl);
    const redusertArbeidstid = getRedusertArbeidstidPerUke(jobberNormaltTimerPerUke, skalJobbeProsent);
    if (redusertArbeidstid) {
        const timerNormalt = formatTimerOgMinutter(intl, decimalDurationToDuration(redusertArbeidstid.normalTimer));
        const timerRedusert = formatTimerOgMinutter(intl, {
            hours: `${redusertArbeidstid.varighet.hours}` || '',
            minutes: `${redusertArbeidstid.varighet.minutes}`,
        });
        return arbIntl.intlText('arbeidstidPeriode.redusertArbeidstidPerUke', { timerNormalt, timerRedusert });
    }
    return '';
};

export const getRedusertArbeidstidSomISODuration = (
    jobberNormaltTimerPerDagNumber: number,
    skalJobbeProsent: number
): ISODuration => {
    return durationToISODuration(getRedusertArbeidstidSomDuration(jobberNormaltTimerPerDagNumber, skalJobbeProsent));
};

export const getRedusertArbeidstidSomDuration = (
    jobberNormaltTimerPerDagNumber: number,
    skalJobbeProsent: number
): Duration => {
    const redusertTidPerDag = (jobberNormaltTimerPerDagNumber / 100) * skalJobbeProsent;
    return decimalDurationToDuration(redusertTidPerDag);
};

// export const getDagerMedTidFraArbeidstidPeriodeData = (
//     normalTimer: number,
//     { fom, tom, prosent, tidFasteDager }: ArbeidstidPeriodeData
// ): DateDurationMap => {
//     const datoerIPeriode = getDatesInDateRange({ from: fom, to: tom }, true);
//     const dagerMedTid: DateDurationMap = {};
//     const ingenTid: InputTime = { hours: '0', minutes: '0' };
//     datoerIPeriode.forEach((dato) => {
//         const isoDate = dateToISODate(dato);
//         if (prosent !== undefined) {
//             const prosentNumber = getNumberFromNumberInputValue(prosent);
//             if (prosentNumber === undefined) {
//                 return;
//             }
//             if (prosentNumber === 0) {
//                 dagerMedTid[isoDate] = { ...ingenTid, percentage: prosentNumber };
//             } else {
//                 const isoDurationPerDag = getRedusertArbeidstidSomDuration(normalTimer / 5, prosentNumber);
//                 dagerMedTid[isoDate] = { ...isoDurationPerDag, percentage: prosentNumber };
//             }
//         } else if (tidFasteDager) {
//             const varighet =
//                 getDurationForISOWeekday(tidFasteDager, dayjs(ISODateToDate(isoDate)).isoWeekday()) || ingenTid;
//             dagerMedTid[isoDate] = { ...varighet };
//         }
//     });
//     return dagerMedTid;
// };

export const getArbeidstidIPeriodeIntlValues = (
    intl: IntlShape,
    info: {
        periode: DateRange;
        arbeidsforhold:
            | {
                  type: ArbeidsforholdType.ANSATT;
                  arbeidsstedNavn: string;
                  jobberNormaltTimer: string | number | undefined;
              }
            | {
                  type: ArbeidsforholdType.FRILANSER | ArbeidsforholdType.SELVSTENDIG;
                  jobberNormaltTimer: string | number | undefined;
              };
    }
): ArbeidIPeriodeIntlValues => {
    const arbIntl = getArbeidstidPeriodeIntl(intl);
    const getTimerTekst = (): string => {
        const timer =
            typeof info.arbeidsforhold.jobberNormaltTimer === 'number'
                ? info.arbeidsforhold.jobberNormaltTimer
                : getNumberFromNumberInputValue(info.arbeidsforhold.jobberNormaltTimer);
        return timer !== undefined
            ? arbIntl.intlText('arbeidstidPeriode.timer', { timer })
            : arbIntl.intlText('arbeidstidPeriode.timer.ikkeTall', {
                  timer: info.arbeidsforhold.jobberNormaltTimer || '-',
              });
    };

    const getHvorTekst = () => {
        switch (info.arbeidsforhold.type) {
            case ArbeidsforholdType.ANSATT:
                return arbIntl.intlText('arbeidstidPeriode.arbeidIPeriodeIntlValues.somAnsatt', {
                    arbeidsstedNavn: info.arbeidsforhold.arbeidsstedNavn,
                });
            case ArbeidsforholdType.FRILANSER:
                return arbIntl.intlText('arbeidstidPeriode.arbeidIPeriodeIntlValues.somFrilanser');
            case ArbeidsforholdType.SELVSTENDIG:
                return arbIntl.intlText('arbeidstidPeriode.arbeidIPeriodeIntlValues.somSN');
        }
    };

    return {
        skalEllerHarJobbet: arbIntl.intlText('arbeidstidPeriode.arbeidIPeriodeIntlValues.skalJobbe'),
        hvor: getHvorTekst(),
        timer: getTimerTekst(),
        fra: prettifyDateFull(info.periode.from),
        til: prettifyDateFull(info.periode.to),
        iPerioden: arbIntl.intlText('arbeidstidPeriode.arbeidIPeriodeIntlValues.iPerioden', {
            fra: prettifyDate(info.periode.from),
            til: prettifyDate(info.periode.to),
        }),
    };
};

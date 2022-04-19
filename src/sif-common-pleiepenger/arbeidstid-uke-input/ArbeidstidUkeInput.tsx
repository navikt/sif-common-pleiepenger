import React from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { FormikInputGroup, FormikTimeInput } from '@navikt/sif-common-formik';
import { ValidationError } from '@navikt/sif-common-formik/lib/validation/types';
import {
    dateFormatter,
    decimalDurationToDuration,
    Duration,
    durationToDecimalDuration,
    DurationWeekdays,
    isDateInDates,
    isDateInWeekdays,
    summarizeDurationInDurationWeekdays,
    Weekday,
} from '@navikt/sif-common-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import LabelInputInfoLayout from '../label-input-info-layout/LabelInputInfoLayout';
import TimerOgMinutter, { formatTimerOgMinutter } from '../timer-og-minutter/TimerOgMinutter';
import { Daginfo, Ukeinfo } from '../types/tidUkerTypes';
import './arbeidstidUkeInput.less';

export type ArbeidstidUkeInputEnkeltdagValidator = (dato: Date) => (value: Duration) => ValidationError | undefined;

export interface ArbeidstidUkeTekster {
    dag: React.ReactNode;
    jobber: React.ReactNode;
    fravær: React.ReactNode;
    ariaLabelTidInput: (dato: string) => React.ReactNode;
}
interface Props {
    ukeinfo: Ukeinfo;
    visUkeTittel?: boolean;
    getFieldName: (dag: Daginfo) => string;
    getDagValue: (dag: Daginfo) => Duration | undefined;
    utilgjengeligeDatoer?: Date[];
    utilgjengeligeUkedager?: Weekday[];
    tekst: ArbeidstidUkeTekster;
    normalarbeidstidUkedager?: DurationWeekdays;
    enkeltdagValidator?: ArbeidstidUkeInputEnkeltdagValidator;
}

const bem = bemUtils('arbeidstidUkeInput');

const ArbeidOgFraværOppsummering = ({
    timerNormaltPerUke,
    timerRegistrertIUke,
}: {
    timerNormaltPerUke: number;
    timerRegistrertIUke: number;
}) => {
    const intl = useIntl();
    const durationNormalt = decimalDurationToDuration(timerNormaltPerUke);

    const durationRegistrert = decimalDurationToDuration(timerRegistrertIUke);
    const durationFravær = decimalDurationToDuration(timerNormaltPerUke - timerRegistrertIUke);

    if (timerRegistrertIUke === 0) {
        return <>Ingen arbeidstid registrert</>;
    }

    return (
        <>
            {formatTimerOgMinutter(intl, durationRegistrert)} av normalt {formatTimerOgMinutter(intl, durationNormalt)}{' '}
            registrert ({formatTimerOgMinutter(intl, durationFravær)} fravær)
        </>
    );
};

const renderFraværInfo = (fravær: Duration | undefined) => {
    const heltFravær = fravær ? durationToDecimalDuration(fravær) === 0 : false;
    if (fravær && !heltFravær) {
        return (
            <>
                <TimerOgMinutter timer={fravær.hours} minutter={fravær.minutes} /> fravær
            </>
        );
    }
    if (fravær && heltFravær) {
        return <>Helt fravær</>;
    }
    return undefined;
};

const ArbeidstidUkeInput: React.FunctionComponent<Props> = ({
    ukeinfo,
    utilgjengeligeDatoer,
    utilgjengeligeUkedager,
    normalarbeidstidUkedager,
    visUkeTittel,
    getFieldName,
    getDagValue,
    enkeltdagValidator,
    tekst,
}) => {
    const { dager } = ukeinfo;

    const timerNormaltPerUke = normalarbeidstidUkedager
        ? durationToDecimalDuration(summarizeDurationInDurationWeekdays(normalarbeidstidUkedager))
        : undefined;

    const timerRegistrertIUke = dager
        .map((dag) => {
            const timerPåDag = dag.weekday ? getDagValue(dag) : undefined;
            return timerPåDag ? durationToDecimalDuration(timerPåDag) : 0;
        })
        .reduce((d, n) => d + n);

    return (
        <div className={bem.block}>
            {visUkeTittel && (
                <Normaltekst tag="h3" className={bem.element('tittel')}>
                    {getUkeTittel(ukeinfo)}
                </Normaltekst>
            )}
            <div className={bem.element('uke__ukedager')}>
                {dager.map((dag) => {
                    const erUtilgjengeligDato = isDateInDates(dag.dato, utilgjengeligeDatoer);
                    const erUtilgjengeligUkedag = utilgjengeligeUkedager
                        ? isDateInWeekdays(dag.dato, utilgjengeligeUkedager)
                        : false;
                    if (erUtilgjengeligDato || erUtilgjengeligUkedag) {
                        return null;
                    }
                    const dayDateString = inputDatoLabel(dag.dato);
                    const normalarbeidstid =
                        normalarbeidstidUkedager && dag.weekday ? normalarbeidstidUkedager[dag.weekday] : undefined;

                    const value = getDagValue(dag);
                    const fravær =
                        value && normalarbeidstid
                            ? decimalDurationToDuration(
                                  durationToDecimalDuration(normalarbeidstid) - durationToDecimalDuration(value)
                              )
                            : normalarbeidstid;

                    return (
                        <FormikInputGroup
                            key={dag.isoDate}
                            legend={<span className="sr-only">{dayDateString}</span>}
                            name={'arbeidstid'}
                            className={bem.element('dag', erUtilgjengeligDato ? 'utilgjengelig' : undefined)}>
                            <LabelInputInfoLayout
                                narrowBreakpoint={860}
                                label={dayDateString}
                                input={
                                    <FormikTimeInput
                                        aria-describedby="iPerioden"
                                        name={getFieldName(dag)}
                                        label={
                                            <span className={'sr-only'}>{tekst.ariaLabelTidInput(dayDateString)}</span>
                                        }
                                        timeInputLayout={{
                                            direction: 'horizontal',
                                        }}
                                        validate={enkeltdagValidator ? enkeltdagValidator(dag.dato) : undefined}
                                    />
                                }
                                info={renderFraværInfo(fravær)}
                            />
                        </FormikInputGroup>
                    );
                })}
            </div>
            {1 + 1 === 3 && timerNormaltPerUke !== undefined && timerRegistrertIUke !== undefined && (
                <Box margin="s" padBottom="s">
                    <ArbeidOgFraværOppsummering
                        timerNormaltPerUke={timerNormaltPerUke}
                        timerRegistrertIUke={timerRegistrertIUke}
                    />
                </Box>
            )}
        </div>
    );
};

const inputDatoLabel = (date: Date): string => dateFormatter.dayDateAndMonth(date);

export const getUkeTittel = ({ ukenummer, år }: Ukeinfo): string => {
    return `Uke ${ukenummer}, ${år}`;
};

export default ArbeidstidUkeInput;

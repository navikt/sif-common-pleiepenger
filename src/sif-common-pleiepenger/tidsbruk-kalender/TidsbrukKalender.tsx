import React from 'react';
import AriaAlternative from '@navikt/sif-common-core/lib/components/aria/AriaAlternative';
import { DateRange, InputTime } from '@navikt/sif-common-formik/lib';
import { DateDurationMap, dateToISODate, Duration, ensureDuration } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import CalendarGrid from '../calendar-grid/CalendarGrid';
import TidsbrukKalenderDag, { TidsbrukKalenderDagFooterRenderer } from './TidsbrukKalenderDag';

export type TidRenderer = (tid: { tid: InputTime; dato: Date; prosent?: number }) => React.ReactNode;

type KalenderDag = {
    tid?: Partial<InputTime>;
    prosent?: number;
    tidOpprinnelig?: Duration;
};

type Kalenderdager = {
    [dato: string]: KalenderDag;
};
interface Props {
    periode: DateRange;
    dager: DateDurationMap;
    dagerOpprinnelig?: DateDurationMap;
    utilgjengeligeDatoer?: Date[];
    utilgjengeligDagInfo?: string;
    skjulTommeDagerIListe?: boolean;
    visEndringsinformasjon?: boolean;
    onDateClick?: (date: Date) => void;
    tomUkeContentRenderer?: () => React.ReactNode;
    tidRenderer?: TidRenderer;
    footerRenderer?: TidsbrukKalenderDagFooterRenderer;
}

const TidsbrukKalender: React.FunctionComponent<Props> = ({
    periode,
    dager,
    dagerOpprinnelig = {},
    utilgjengeligeDatoer,
    utilgjengeligDagInfo,
    skjulTommeDagerIListe,
    visEndringsinformasjon,
    onDateClick,
    tidRenderer,
    tomUkeContentRenderer,
    footerRenderer,
}) => {
    const kalenderdager: Kalenderdager = {};
    Object.keys(dager).forEach((key) => {
        const dag = dager[key];
        kalenderdager[key] = {
            ...kalenderdager[key],
            tid: {
                hours: dag.hours,
                minutes: dag.minutes,
            },
            prosent: dag.percentage,
        };
    });

    Object.keys(dagerOpprinnelig).forEach((key) => {
        kalenderdager[key] = {
            ...kalenderdager[key],
            tidOpprinnelig: ensureDuration(dagerOpprinnelig[key]),
            prosent: (dagerOpprinnelig as any)[key].prosent,
        };
    });

    return (
        <CalendarGrid
            month={periode}
            disabledDates={utilgjengeligeDatoer}
            disabledDateInfo={utilgjengeligDagInfo}
            hideEmptyContentInListMode={skjulTommeDagerIListe}
            hideWeeksWithOnlyDisabledContent={true}
            onDateClick={onDateClick}
            allDaysInWeekDisabledContentRenderer={tomUkeContentRenderer}
            dateRendererShort={(date: Date) => (
                <AriaAlternative
                    visibleText={dayjs(date).format('D.')}
                    ariaText={dayjs(date).format('dddd DD. MMM YYYY')}
                />
            )}
            dateContentRenderer={(dato) => {
                const dag = kalenderdager[dateToISODate(dato)];
                return dag ? (
                    <TidsbrukKalenderDag
                        dato={dato}
                        tid={dag.tid ? ensureDuration(dag.tid) : undefined}
                        prosent={dag.prosent}
                        tidRenderer={tidRenderer}
                        tidOpprinnelig={dag.tidOpprinnelig || { hours: '0', minutes: '0' }}
                        visEndringsinformasjon={visEndringsinformasjon}
                        footerRenderer={footerRenderer}
                    />
                ) : (
                    <span />
                );
            }}
        />
    );
};

export default TidsbrukKalender;

import React from 'react';
import { DateRange, getDatesInMonthOutsideDateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { TidsbrukKalender } from '../../../sif-common-pleiepenger';
import ArbeidstidEnkeltdagTekst from '../../../sif-common-pleiepenger/arbeidstid/arbeidstid-måned/components/arbeidstid-enkeltdag-tekst/ArbeidstidEnkeltdagTekst';
import PageIntro from '../../components/page-intro/PageIntro';

const måned: DateRange = {
    from: ISODateToDate('2022-02-01'),
    to: ISODateToDate('2022-02-28'),
};

const periode: DateRange = {
    from: ISODateToDate('2022-02-09'),
    to: ISODateToDate('2022-02-11'),
};

const TidsbrukKalenderDoc = () => {
    return (
        <>
            <PageIntro title="@navikt/sif-common-pleiepenger">
                <h2>TidsbrukKalender</h2>
                <TidsbrukKalender
                    dager={{
                        '2021-01-01': {
                            hours: '0',
                            minutes: '0',
                        },
                        '2021-01-04': {
                            hours: '0',
                            minutes: '0',
                        },
                        '2021-01-05': {
                            hours: '2',
                            minutes: '0',
                        },
                    }}
                    dagerOpprinnelig={{
                        '2021-01-01': {
                            hours: '7',
                            minutes: '30',
                        },
                        '2021-01-04': {
                            hours: '7',
                            minutes: '30',
                        },
                        '2021-01-05': {
                            hours: '5',
                            minutes: '30',
                        },
                    }}
                    utilgjengeligeDatoer={getDatesInMonthOutsideDateRange(måned.from, periode)}
                    tomUkeContentRenderer={() => <>Ingen dager tilgjengelig denne uken</>}
                    periode={måned}
                    skjulTommeDagerIListe={true}
                    visOpprinneligTid={true}
                    tidRenderer={({ tid, prosent }) => <ArbeidstidEnkeltdagTekst tid={tid} prosent={prosent} />}
                    opprinneligTidRenderer={({ tid, prosent }) => (
                        <ArbeidstidEnkeltdagTekst tid={tid} prosent={prosent} />
                    )}
                    onDateClick={(date: Date) => {
                        console.log(date);
                    }}
                />
            </PageIntro>
        </>
    );
};

export default TidsbrukKalenderDoc;

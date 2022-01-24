import { DateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import React from 'react';
import { TidsbrukKalender } from '../../../sif-common-pleiepenger';
import TidArbeidEnkeltdag from '../../../sif-common-pleiepenger/arbeidstid-måned-info/TidArbeidEnkeltdag';
import PageIntro from '../../components/page-intro/PageIntro';

const måned: DateRange = {
    from: ISODateToDate('2021-01-01'),
    to: ISODateToDate('2020-01-31'),
};

// const datesInMonth = getDatesInMonth(måned.from);

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
                    utilgjengeligeDatoer={[
                        ISODateToDate('2021-01-06'),
                        ISODateToDate('2021-01-07'),
                        ISODateToDate('2021-01-11'),
                        ISODateToDate('2021-01-12'),
                        ISODateToDate('2021-01-13'),
                        ISODateToDate('2021-01-14'),
                        ISODateToDate('2021-01-15'),
                    ]}
                    tomUkeContentRenderer={() => <>Ingen dager tilgjengelig denne uken</>}
                    periode={måned}
                    skjulTommeDagerIListe={true}
                    visOpprinneligTid={true}
                    tidRenderer={({ tid, prosent }) => <TidArbeidEnkeltdag tid={tid} prosent={prosent} />}
                    opprinneligTidRenderer={({ tid, prosent }) => <TidArbeidEnkeltdag tid={tid} prosent={prosent} />}
                    onDateClick={(date: Date) => {
                        console.log(date);
                    }}
                />
            </PageIntro>
        </>
    );
};

export default TidsbrukKalenderDoc;

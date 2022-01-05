import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { DateRange, dateToISOString, InputTime } from '@navikt/sif-common-formik/lib';
import { DateDurationMap, getDatesWithDurationLongerThanZero, getDurationsInDateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import ArbeidstidEnkeltdagDialog from '../arbeidstid-enkeltdag/ArbeidstidEnkeltdagDialog';
import { TidEnkeltdagEndring } from '../tid-enkeltdag-dialog/TidEnkeltdagForm';
import TidsbrukKalender from '../tidsbruk-kalender/TidsbrukKalender';
import { ArbeidsforholdType } from '../types';
import TidArbeidEnkeltdag from './TidArbeidEnkeltdag';

interface Props {
    måned: DateRange;
    arbeidsstedNavn: string;
    arbeidsforholdType: ArbeidsforholdType;
    tidArbeidstid: DateDurationMap;
    utilgjengeligeDatoer?: Date[];
    månedTittelHeadingLevel?: number;
    periode: DateRange;
    åpentEkspanderbartPanel?: boolean;
    onEnkeltdagChange?: (evt: TidEnkeltdagEndring) => void;
    onRequestEdit?: (tid: DateDurationMap) => void;
}

const ArbeidstidMånedTittel = ({
    headingLevel,
    måned,
    antallDagerMedTid,
}: {
    headingLevel: number;
    måned: DateRange;
    antallDagerMedTid: number;
}) => {
    const intl = useIntl();
    return (
        <Element tag={`h${headingLevel}`}>
            <span className="m-caps">
                {intlHelper(intl, 'arbeidstid.ukeOgÅr', {
                    ukeOgÅr: dayjs(måned.from).format('MMMM YYYY'),
                })}
            </span>
            <Normaltekst tag="div">
                {antallDagerMedTid === 0 ? (
                    <FormattedMessage id="arbeidstid.iPeriodePanel.info.ingenDager" />
                ) : (
                    <FormattedMessage id="arbeidstid.iPeriodePanel.info" values={{ dager: antallDagerMedTid }} />
                )}
            </Normaltekst>
        </Element>
    );
};

const ArbeidstidMånedInfo: React.FunctionComponent<Props> = ({
    måned,
    arbeidsstedNavn,
    arbeidsforholdType,
    tidArbeidstid,
    utilgjengeligeDatoer,
    månedTittelHeadingLevel = 2,
    periode,
    åpentEkspanderbartPanel,
    onEnkeltdagChange,
}) => {
    const [editDate, setEditDate] = useState<{ dato: Date; tid: Partial<InputTime> } | undefined>();

    const dager: DateDurationMap = getDurationsInDateRange(tidArbeidstid, måned);
    const dagerMedTid = getDatesWithDurationLongerThanZero(dager);

    const handleKalenderDatoClick = (dato: Date) => {
        const tid: Partial<InputTime> = dager[dateToISOString(dato)] || {
            hours: '',
            minutes: '',
        };
        setEditDate({ dato, tid });
    };

    return (
        <Ekspanderbartpanel
            renderContentWhenClosed={false}
            apen={åpentEkspanderbartPanel}
            tittel={
                <ArbeidstidMånedTittel
                    måned={måned}
                    headingLevel={månedTittelHeadingLevel}
                    antallDagerMedTid={dagerMedTid.length}
                />
            }>
            <TidsbrukKalender
                periode={måned}
                dager={dager}
                utilgjengeligeDatoer={utilgjengeligeDatoer}
                skjulTommeDagerIListe={true}
                visEndringsinformasjon={false}
                tidRenderer={({ tid, prosent }) => <TidArbeidEnkeltdag tid={tid} prosent={prosent} />}
                onDateClick={onEnkeltdagChange ? handleKalenderDatoClick : undefined}
            />
            {editDate && onEnkeltdagChange && (
                <ArbeidstidEnkeltdagDialog
                    isOpen={editDate !== undefined}
                    formProps={{
                        dato: editDate.dato,
                        tid: editDate.tid,
                        periode,
                        onSubmit: (evt) => {
                            setEditDate(undefined);
                            setTimeout(() => {
                                /** TimeOut pga komponent unmountes */
                                onEnkeltdagChange(evt);
                            });
                        },
                        onCancel: () => setEditDate(undefined),
                    }}
                    arbeidsstedNavn={arbeidsstedNavn}
                    arbeidsforholdType={arbeidsforholdType}
                />
            )}
        </Ekspanderbartpanel>
    );
};

export default ArbeidstidMånedInfo;

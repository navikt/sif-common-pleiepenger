import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import { DateRange, dateToISOString, InputTime } from '@navikt/sif-common-formik/lib';
import { DateDurationMap, durationIsZero, getDurationsInDateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { DurationText, OmsorgstilbudEnkeltdagDialog, TidsbrukKalender } from '../';
import { TidEnkeltdagEndring } from '../tid-enkeltdag-dialog/TidEnkeltdagForm';

interface Props {
    måned: DateRange;
    tidOmsorgstilbud: DateDurationMap;
    editLabel: string;
    addLabel: string;
    utilgjengeligeDatoer?: Date[];
    månedTittelHeadingLevel?: number;
    periode: DateRange;
    åpentEkspanderbartPanel?: boolean;
    kanEndrePeriode?: boolean;
    onEnkeltdagChange?: (evt: TidEnkeltdagEndring) => void;
    onRequestEdit: (tid: DateDurationMap) => void;
}

const OmsorgstilbudMånedInfo: React.FunctionComponent<Props> = ({
    måned,
    tidOmsorgstilbud,
    utilgjengeligeDatoer,
    månedTittelHeadingLevel = 2,
    periode,
    addLabel,
    editLabel,
    åpentEkspanderbartPanel,
    kanEndrePeriode,
    onRequestEdit,
    onEnkeltdagChange,
}) => {
    const [editDate, setEditDate] = useState<{ dato: Date; tid: Partial<InputTime> } | undefined>();

    const dager: DateDurationMap = getDurationsInDateRange(tidOmsorgstilbud, måned);
    const dagerMedRegistrertOmsorgstilbud: string[] = Object.keys(dager).filter((key) => {
        const datoTid = dager[key];
        return datoTid !== undefined && datoTid !== undefined && durationIsZero(datoTid) === false;
    });

    return (
        <Ekspanderbartpanel
            renderContentWhenClosed={false}
            apen={åpentEkspanderbartPanel}
            tittel={
                <>
                    <Element tag={`h${månedTittelHeadingLevel}`}>
                        <FormattedMessage
                            id="omsorgstilbud.ukeOgÅr"
                            values={{ ukeOgÅr: dayjs(måned.from).format('MMMM YYYY') }}
                        />{' '}
                        <Normaltekst tag="div">
                            {dagerMedRegistrertOmsorgstilbud.length === 0 ? (
                                <FormattedMessage id="omsorgstilbud.ingenDagerRegistrert" />
                            ) : (
                                <FormattedMessage
                                    id="omsorgstilbud.iPeriodePanel.info"
                                    values={{ dager: dagerMedRegistrertOmsorgstilbud.length }}
                                />
                            )}
                        </Normaltekst>
                    </Element>
                </>
            }>
            <TidsbrukKalender
                periode={måned}
                dager={dager}
                utilgjengeligeDatoer={utilgjengeligeDatoer}
                skjulTommeDagerIListe={true}
                visEndringsinformasjon={false}
                tidRenderer={({ tid, prosent }) => {
                    if (prosent !== undefined && prosent > 0) {
                        return (
                            <>
                                <div>{prosent} %</div>
                                {1 + 1 === 2 && (
                                    <div className="beregnetTid">
                                        (<DurationText duration={tid} />)
                                    </div>
                                )}
                            </>
                        );
                    }
                    if (tid.hours === '0' && tid.minutes === '0') {
                        return <></>;
                    }
                    return <DurationText duration={tid} />;
                }}
                onDateClick={
                    onEnkeltdagChange
                        ? (dato) => {
                              const tid: Partial<InputTime> = dager[dateToISOString(dato)] || {
                                  hours: '',
                                  minutes: '',
                              };
                              setEditDate({ dato, tid });
                          }
                        : undefined
                }
            />
            {kanEndrePeriode && (
                <FormBlock margin="l">
                    <Knapp htmlType="button" mini={true} onClick={() => onRequestEdit(tidOmsorgstilbud)}>
                        {dagerMedRegistrertOmsorgstilbud.length === 0 ? addLabel : editLabel}
                    </Knapp>
                </FormBlock>
            )}
            {editDate && onEnkeltdagChange && (
                <OmsorgstilbudEnkeltdagDialog
                    isOpen={editDate !== undefined}
                    formProps={{
                        periode,
                        dato: editDate.dato,
                        tid: editDate.tid,
                        onSubmit: (evt) => {
                            setEditDate(undefined);
                            setTimeout(() => {
                                /** TimeOut pga komponent unmountes */
                                onEnkeltdagChange(evt);
                            });
                        },
                        onCancel: () => setEditDate(undefined),
                    }}
                />
            )}
        </Ekspanderbartpanel>
    );
};

export default OmsorgstilbudMånedInfo;

import { ValidationError } from '@navikt/sif-common-formik/lib/validation/types';
import { Duration, DurationWeekdays } from '@navikt/sif-common-utils/lib';

export enum ArbeidsforholdType {
    ANSATT = 'ANSATT',
    FRILANSER = 'FRILANSER',
    SELVSTENDIG = 'SELVSTENDIG',
}

export type TidPerDagValidator = (dag: string) => (tid: Duration) => ValidationError | undefined;

export type ArbeidstidPeriodeData = {
    fom: Date;
    tom: Date;
    prosent?: string;
    tidFasteDager?: DurationWeekdays;
};

export type ArbeidIPeriodeIntlValues = {
    hvor: string;
    skalEllerHarJobbet: string;
    timer: string;
    fra: string;
    til: string;
    iPerioden: string;
};

export interface DagMedTid {
    dato: Date;
    tid: Duration;
}

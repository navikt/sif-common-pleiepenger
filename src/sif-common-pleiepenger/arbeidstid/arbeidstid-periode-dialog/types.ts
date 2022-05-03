import { DurationWeekdays } from '@navikt/sif-common-utils';

export type ArbeidstidPeriodeData = {
    fom: Date;
    tom: Date;
    prosent?: string;
    tidFasteDager?: DurationWeekdays;
};

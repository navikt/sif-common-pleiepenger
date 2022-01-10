import { DateDurationMap } from '@navikt/sif-common-utils/lib';

export enum FormFields {
    'tid' = 'tid',
}

export interface CompletedFormValues {
    [FormFields.tid]: DateDurationMap;
}

export type FormValues = Partial<CompletedFormValues>;

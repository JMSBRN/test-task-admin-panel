export interface SearchFormData {
    job_title: string;
    country: string;
    industry: string;
}

export interface SearchFormDataForInputSelect extends SearchFormData {
    [key: string]: any;
}


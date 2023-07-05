export interface User {
  email: string;
  password: string;
}

export interface Country {
    id: string;
    name: string;
    iso2: string;
    iso3: string;
    emoji: string;
    emojiu:string;
}

export interface Industry {
    id: 'string';
    name: 'string';
}

export interface LoginFormData extends User {}

export interface Contact {
  id: string;
  createdAt: string;
  updatedAt: string;
  industry: string;
  company: string;
  job_title: string;
  country: {
    country: string;
    iso3: string;
  };
  linkedin_url: string;
  company_facebook_url: string;
  company_linkedin_url: string;
  company_size: string;
  company_twitter_url: string;
  company_url: string;
  facebook_url: string;
  github_url: string;
  twitter_url: string;
  description: string;
  name?: string;
  nameRendered?: boolean;
}

export interface ContactForInpuSelect extends Contact {
  [key: string]: any;
}
export interface SelectListForm {
  id: string;
  name: string;
}
export interface SearchFormData {
  job_title: string;
  country: SelectListForm;
  industry: SelectListForm;
}

export interface SearchFormDataForInputSelect extends SearchFormData {
  [key: string]: any;
}
export interface ContactPersonalData {
  name: string;
  surname: string;
}

export interface ContactInfo {
  id: string;
  createdAt: string;
  updatedAt: string;
  full_name: string;
  industry: string;
  industry_id: string;
  company: string;
  job_title: string;
  country: string;
  country_id: string;
  linkedin_url: string;
  company_facebook_url: string;
  company_linkedin_url: string;
  company_size: string;
  company_twitter_url: string;
  company_url: string;
  facebook_url: string;
  github_url: string;
  twitter_url: string;
  description: string;
}

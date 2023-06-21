export interface User {
    email: string;
    password: string;
}

export interface Contact {
     id: string;
     createdAt: string;
     updatedAt: string;
     industry: string;
     company: string;
     job_title: string;
     country: string;
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
     nameRendered?: boolean;
}


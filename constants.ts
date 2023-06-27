export enum Regex {
    'EMAIL'='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$',
    'PASSWORD'='^(?=.*[0-9])(?=.*[a-z]).{8,16}$'
   }
export enum RegexHelperMessages {
    'EMAIL'='min-max 3-32, A-z',
    'PASSWORD'='min-max 8-16, min one A-z, min one 9-0, min one special character'
   }   
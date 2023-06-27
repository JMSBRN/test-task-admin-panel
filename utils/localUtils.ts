import { SearchFormData } from '../components/search-form/interfaces';

const setFormDataToLocal = (formData: SearchFormData) => {
    // filter not working in api for country an industry ??

    const { job_title, country, industry } = formData;

    window.localStorage.setItem('formData', JSON.stringify({ 
        job_title,
        country,
        industry
       }));
  };

  export default setFormDataToLocal;
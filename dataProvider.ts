import { DataProvider, Options, fetchUtils } from 'react-admin';
import { SearchFormData } from './components/interfaces';
import { getDecryptedDataFromCookie } from './utils/secureCookiesUtils';
import { stringify } from 'query-string';

const token = getDecryptedDataFromCookie('token');

const apiUrl = 'http://3.65.149.62/test-api/';

const httpClient = fetchUtils.fetchJson;
const options: Options = {
  headers: new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(token!)}`,
  }),
};

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const formDataFromLocal: SearchFormData =
     JSON.parse( window.localStorage.getItem('formData') || '');

    const { job_title, country, industry } = formDataFromLocal;
    const filterFormForApi: string = JSON.stringify({
        job_title,
        country: country.id,
        industry: industry.id,
      });
    const url = `${apiUrl}${resource}?range=${query.range}&filter=${filterFormForApi}`;

    return httpClient(url, options).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get('content-range')?.split('/').pop()!, 10),
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ ids: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get('content-range')!.split('/').pop()!, 10),
    }));
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };

    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),

  deleteMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };

    const { json } = await httpClient(
      `${apiUrl}/${resource}?${stringify(query)}`,
      {
        method: 'DELETE',
        body: JSON.stringify(params),
      }
    );

    return { data: json };
  },
};

export default dataProvider;

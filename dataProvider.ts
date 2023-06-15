import { DataProvider, fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { stringify } from 'query-string';

// eslint-disable-next-line max-len
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJiYWQ1NTE3LTk4MTEtNDc5Yi1iZTRiLWI5Nzk1YTQ1NmIzNSIsInRva2VuSWQiOiJjM2RlZjRhZS1mNGZmLTRmYzAtYWQ5MC1hNmRhNjhkZGJhZTUiLCJpYXQiOjE2ODY4NDEwNjcsImV4cCI6MTY4NjkyNzQ2N30.drhZSpERc5b-f8aHIWLKHxb4XV4YR3RuO7TkPo2uAGM';

const apiUrl = 'http://3.65.149.62/test-api/';

const httpClient = fetchUtils.fetchJson;
const jetchJson = (url: string, options:fetchUtils.Options = {}) => {
    options.headers = new Headers({ Accept: 'application/json' });
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const data = simpleRestProvider(apiUrl, jetchJson);
const dataProvider: DataProvider  = {
    ...data,
    
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        
        console.log(query);
        // const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const url = `${apiUrl}${resource}`;

        return httpClient(url).then(({ headers, json }) => ({
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

        const { json } = await httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params),
        });

        return ({ data: json });
    },

};

export default dataProvider;
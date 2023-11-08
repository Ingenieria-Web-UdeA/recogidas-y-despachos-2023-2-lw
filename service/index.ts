const API_URL = '/api';

const API_SERVICES = {
  users: `${API_URL}/users`,
  roles: `${API_URL}/roles`,
  lots: `${API_URL}/lots`,
  collections: `${API_URL}/collections`,
  shipments: `${API_URL}/shipments`,
  indicators: `${API_URL}/collections/indicators`,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export { API_SERVICES, fetcher };

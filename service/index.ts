const API_URL = 'https://dj5pipyyfj.execute-api.us-east-1.amazonaws.com/prod';

const API_SERVICES = {
  users: `${API_URL}/users`,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export { API_SERVICES, fetcher };

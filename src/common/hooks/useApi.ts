import { useEffect, useState } from 'react';
import axios from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Config = {
   headers?: object;
   params?: object;
   data?: object;
   signal?: AbortSignal | undefined;
};

type Response = {
   data: any;
   isError: boolean;
};

const useApi = (url: string, method: HttpMethod = 'GET', config: Config = {}): Response => {
   const [accessToken, setAccessToken] = useState<string | null>(null);
   const [data, setData] = useState<any>(null);
   const [isError, setIsError] = useState<boolean>(false);

   useEffect(() => {
      axios
         .request({
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            data: {
               grant_type: 'client_credentials',
            },
            headers: {
               Authorization:
                  'Basic ' +
                  new Buffer(
                     '5f6015571ed8444c83f0ab10ae211afd:4749e4280338400a903d4ac4d9ed320c'
                  ).toString('base64'),
               'Content-Type': 'application/x-www-form-urlencoded',
            },
         })
         .then((response) => setAccessToken(response.data.access_token));
   }, []);

   useEffect(() => {
      setData(null);
      setIsError(false);

      if (!accessToken) {
         return;
      }

      // TODO: signal
      axios
         .request({
            baseURL: 'https://api.spotify.com/v1/',
            url,
            method,
            headers: {
               Authorization: `Bearer ${accessToken}`,
               ...config?.headers,
            },
            ...config,
         })
         .then((response) => setData(response.data))
         .catch(() => setIsError(true));
   }, [url, method, accessToken]);

   return { data, isError };
};

export default useApi;

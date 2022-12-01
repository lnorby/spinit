import axios, {AxiosInstance} from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Config = {
   headers?: object;
   params?: object;
   data?: object;
   signal?: AbortSignal | undefined;
};

// TODO: access token requested everytime problem
class Api {
   private axios: AxiosInstance;
   private accessToken: string | undefined;

   constructor(axios: AxiosInstance) {
      this.axios = axios;
   }

   get<T>(url: string, config: Config = {}): Promise<T> {
      return this.makeRequest<T>(url, 'GET', config);
   }

   post<T>(url: string, data: object, config: Config = {}): Promise<T> {
      return this.makeRequest<T>(url, 'POST', { ...config, data });
   }

   patch<T>(url: string, data: object, config: Config = {}): Promise<T> {
      return this.makeRequest<T>(url, 'PATCH', { ...config, data });
   }

   put<T>(url: string, data: object, config: Config = {}): Promise<T> {
      return this.makeRequest<T>(url, 'PUT', { ...config, data });
   }

   delete<T>(url: string, config: Config = {}): Promise<T> {
      return this.makeRequest<T>(url, 'DELETE', config);
   }

   private async makeRequest<T>(url: string, method: HttpMethod, config: Config): Promise<T> {
      config.headers = {
         Authorization: `Bearer ${await this.getAccessToken()}`,
         ...config.headers,
      };

      const { data } = await this.axios.request({
         url,
         method,
         ...config,
      });

      return data;
   }

   private async getAccessToken(): Promise<string> {
      if (this.accessToken) {
         return this.accessToken;
      }

      const { data } = await this.axios.request({
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
      });

      this.accessToken = data.access_token;

      return data.access_token;
   }
}

const axiosInstance = axios.create({
   baseURL: 'https://api.spotify.com/v1/',
});

const api = new Api(axiosInstance);

export default api;

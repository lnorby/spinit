import axios, { AxiosInstance } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Config = {
   headers?: object;
   params?: object;
   data?: object;
};

class Api {
   private accessToken: string | null = null;

   constructor(private axiosInstance: AxiosInstance) {}

   public get(url: string, config: Config = {}): Promise<any> {
      return this.makeRequest(url, 'GET', config);
   }

   public post(url: string, data: object, config: Config = {}): Promise<any> {
      return this.makeRequest(url, 'POST', { ...config, data });
   }

   public patch(url: string, data: object, config: Config = {}): Promise<any> {
      return this.makeRequest(url, 'PATCH', { ...config, data });
   }

   public put(url: string, data: object, config: Config = {}): Promise<any> {
      return this.makeRequest(url, 'PUT', { ...config, data });
   }

   public delete(url: string, config: Config = {}): Promise<any> {
      return this.makeRequest(url, 'DELETE', config);
   }

   // TODO: cancel request
   private async makeRequest(url: string, method: HttpMethod, config: Config): Promise<any> {
      // const controller = new AbortController();

      config.headers = {
         Authorization: `Bearer ${await this.getAccessToken()}`,
         ...config.headers,
      };

      const request = this.axiosInstance
         .request({
            url,
            method,
            // signal: controller.signal,
            ...config,
         })
         .then((response) => response.data);

      // request.cancel = () => {
      //     controller.abort();
      // }

      return request;
   }

   private async getAccessToken(): Promise<string> {
      if (this.accessToken) {
         return this.accessToken;
      }

      const { data } = await axios.request({
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

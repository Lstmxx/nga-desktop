import { Body, HttpOptions, ResponseType, getClient, type Client } from '@tauri-apps/api/http';
import { auth } from './interceptor';
import { IRequestConfig } from './type';

const DEFAULT_CONFIG = {
  host: 'https://ngabbs.com',
  connectTimeout: 30000,
};

class Http {

  private _instance: Client | null = null;

  constructor () {
    this.initClient();
  }

  async initClient () {
    this._instance = await getClient({
      connectTimeout: DEFAULT_CONFIG.connectTimeout,
    });
  }

  get({ url, data = {}, responseType = ResponseType.JSON }: IRequestConfig) {
    const query = data;
    return this.request({ method: 'GET', query, url, responseType })
  }

  post({ url, data = {}, responseType = ResponseType.JSON }: IRequestConfig) {
    const body = Body.json(data);
    return this.request({ method: 'POST', body, url, responseType })
  }

  async request<T = any>(options: HttpOptions) {

    if (!this._instance) {
      await this.initClient();
    }

    const headers: Record<string, any> = {};
    auth(headers);
    // let query: Record<string, any> = {};
    // let body: Body = Body.json({});
    // if (method === 'GET') {
    //   query = data;
    // } else if (['POST, PUT'].includes(method)) {
    //   body = Body.json(data);
    // }

    try {
      const response = await this._instance?.request<T>({
        ...options,
        url: `${DEFAULT_CONFIG.host}${options.url}`,
        headers,
      });
      console.log('response', response);
      return response?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}


export default Http;
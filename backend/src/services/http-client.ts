import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { Logger } from './logger-service';

export interface IHttpClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export class HttpClient implements IHttpClient {
  private client: AxiosInstance;
  private logger: Logger;

  constructor(baseURL?: string) {
    this.logger = Logger.getInstance('HttpClient');
    this.client = axios.create({
      baseURL,
      timeout: 10000, // 10 seconds
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => {
        this.logger.debug('HTTP response received', {
          url: response.config.url,
          status: response.status,
          method: response.config.method
        });
        return response.data;
      },
      (error: AxiosError) => {
        this.logger.error('HTTP request failed', error, {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status
        });
        // Preserve the original error with response status
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    this.logger.debug('Making GET request', { url });
    return this.client.get(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    this.logger.debug('Making POST request', { url });
    return this.client.post(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    this.logger.debug('Making PUT request', { url });
    return this.client.put(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    this.logger.debug('Making DELETE request', { url });
    return this.client.delete(url, config);
  }
} 
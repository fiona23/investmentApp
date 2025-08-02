import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Base API configuration and utilities
export const API_BASE_URL = 'https://api.cushon.com/v1';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Simulated API delay for development
const simulateApiDelay = (ms: number = 1000) =>
  new Promise(resolve => setTimeout(resolve, ms));

// Base API client with error handling
export class ApiClient {
  private static async request<T>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    try {
      // Simulate network delay
      await simulateApiDelay();

      // For development, we'll simulate API responses
      // In production, this would be a real axios call
      const response: AxiosResponse<ApiResponse<T>> = await axios({
        url: `${API_BASE_URL}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
        ...config,
      });

      return response.data;
    } catch (error) {
      const apiError: ApiError = {
        message:
          error instanceof Error ? error.message : 'Unknown error occurred',
        code: 'NETWORK_ERROR',
      };
      throw apiError;
    }
  }

  static async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  static async post<T>(
    endpoint: string,
    data: Record<string, unknown>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      data,
    });
  }

  static async put<T>(
    endpoint: string,
    data: Record<string, unknown>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      data,
    });
  }

  static async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

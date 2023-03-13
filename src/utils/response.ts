import { AxiosResponse, AxiosError } from 'axios'

export interface IResponse {
  status: number | undefined
  error?: AxiosError<AxiosResponse<any, any>, any> | AxiosResponse<AxiosResponse<any, any>, any> | undefined
}

export const handleResponse = {
  success: (responseData: AxiosResponse) => {
    return {
      status: responseData.status,
      data: responseData.data,
    }
  },
  error: (responseData: AxiosError<AxiosResponse>):IResponse => {
    if (responseData.message === 'Network Error') {
      return {
        status: 500,
        error: responseData,
      }
    } else {
      return {
        status: responseData.response?.status,
        error: responseData.response?.data,
      }
    }
  },
}

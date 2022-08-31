import axios, {AxiosInstance} from 'axios'

class Service {
  fetcher: AxiosInstance

  constructor(baseURL: string) {
    this.fetcher = axios.create({
      baseURL,
    })
    this.fetcher.interceptors.response.use(
      response => response.data,
      error => Promise.reject(error)
    )
  }

  toString(): string {
    return 'Service'
  }
}

export default Service

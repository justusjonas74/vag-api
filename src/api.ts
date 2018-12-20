import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  // AxiosInstance,
  // AxiosAdapter,
  // Cancel,
  // CancelToken,
  // CancelTokenSource,
  // Canceler
} from 'axios';
import * as url from 'url';

// axios.get('/user?ID=12345');

export class API {
  private endPointBase: string 
  Network : Networks 
  
  constructor(){
    this.endPointBase = "https://start.vag.de/dm/api"
    this.Network = Networks.VGN
  }
  
  getNetworkPath (path:string) : string {
    return '/' + Networks[this.Network] + '/' + path
  }

}


class StopRequest extends API {
  private path = 'abfahrten.json'
  
  constructor(){
    super()
  }
  
  static findByName(name:string) : Promise<Stop|null> {
    let url = getNetworkPath(this.path) + "/" + name
    const axiosRequestConfig : AxiosRequestConfig = {
      url: url,
      baseUrl: this.endPointBase,
      method: 'get'
      //params: { id: 12345 }
    }
    
    const handleResponse = (response: AxiosResponse) : Stop | null => {
      
    }
    
    return new Promise((resolve, reject) =>{
      axios(axiosRequestConfig)
        .then(response => resolve(handleResponse))
        .catch(error => reject(error))
    })
  }
  
  
}


enum Networks { 
  VAG, 
  VGN
}


import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios';

import {StopEndpoint} from './api/stopsEndpoint'
import {DepartureEndpoint} from './api/departureEndpoint'


enum Networks { 
  VAG, 
  VGN
}
export class API {
  static endPointBase: string =  "https://start.vag.de/dm/api"
  static Network : Networks = Networks.VGN
  static Stops : StopEndpoint = StopEndpoint 
  static Departures : DepartureEndpoint = DepartureEndpoint
  constructor(){}
  

  static axiosRequestConfig  = (params:Object, path:string, subpath?:string) : AxiosRequestConfig => {
    let url = API.getNetworkPath(path)
    if (subpath) {
      url += "/" + subpath
    }
    return {
      params: params,
      url: url,
      baseURL: API.endPointBase,
      method: 'get'
    }
  }

  static getNetworkPath (path:string) : string {
    return  '/' + path + '/' + Networks[API.Network] 
  }
}
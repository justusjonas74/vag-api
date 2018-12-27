import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios';

import {StopRequest,Stop} from './stops'

enum Networks { 
  VAG, 
  VGN
}

interface RequestParams{
  name?: string
  lon?: number
  lat?: number
  distance?: number
}

export class StopEndpoint  {
  static readonly path : string = 'haltestellen.json'
  
  private static handleResponse(response: AxiosResponse) : Stop[] | undefined {
    if (!response.data) {
      console.log('Returning undefined')
      return undefined
    } else {
      let haltestellenRequest = StopRequest.fromJSON(response.data)
      let haltestellen = haltestellenRequest.Haltestellen
      return haltestellen
    }
  }

  private static requestAPI(axiosRequestConfig: AxiosRequestConfig) :  Promise<Stop[]|null> {
    return new Promise((resolve : (value?: Stop[] | undefined)=>void, reject: (reason?:any)=> void) : void=>{
      axios(axiosRequestConfig)
        .then(response => {resolve(StopEndpoint.handleResponse(response));})
        .catch(error => reject(error))
    })
  }

 
  static findByLocation(lat: number, lon: number, radius?:number): Promise<Stop[]|null>{
    let params : RequestParams = {
      lon: lon,
      lat: lat
    }
    if (radius) {
      params.distance = radius
    } 

    const axiosRequestConfig : AxiosRequestConfig = API.axiosRequestConfig(params,this.path)

    return StopEndpoint.requestAPI(axiosRequestConfig)
  } 

  static findByName(name:string) : Promise<Stop[]|null> {
    
    const axiosRequestConfig : AxiosRequestConfig = API.axiosRequestConfig({name:name},this.path)

    return StopEndpoint.requestAPI(axiosRequestConfig)
  }
  
  
}

export class API {
  static endPointBase: string =  "https://start.vag.de/dm/api"
  static Network : Networks = Networks.VGN
  static Stops : StopEndpoint = StopEndpoint 
  constructor(){}
  
  static axiosRequestConfig  = (params:RequestParams, path:string) : AxiosRequestConfig => {
    return {  
    params: params,
      url: API.getNetworkPath(path),
      baseURL: API.endPointBase,
      method: 'get'
    }
  }

  static getNetworkPath (path:string) : string {
    return  '/' + path + '/' + Networks[API.Network] 
  }
}
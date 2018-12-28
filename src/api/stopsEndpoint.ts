import axios, {
    AxiosRequestConfig,
    AxiosResponse
  } from 'axios';
import {StopRequest,Stop} from './../stops'

import {API} from './../api'

export interface StopRequestParams extends AxiosRequestConfig{
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
      let params : StopRequestParams = {
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
  
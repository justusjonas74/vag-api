import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError
  } from 'axios';
import {DepartureRequest,Departure} from './../departures'
import {API} from './../api'
import Axios from 'axios';

enum VAGProdukt {
    UBahn,
    Bus,
    Tram
}

interface DepartureRequestParams {
    Product?: VAGProdukt[]  // Produkt bzw. Betriebszweig Bus, Tram oder U-Bahn. Ohne Angabe des Produktes werden die Abfahrten aller Betriebszweige geliefert. Mehrere Produkte werden durch ein Komma getrennt übergeben (?Product=Bus,Tram)
    TimeSpan?: number // Zeitfenster für die Abfrage in Minuten (?timespan=10)
    TimeDelay?: number //  Zeitliche Verschiebung für die Anfrage in Minuten (?timedelay=5)
    LimitCount?: number // Maximale Anzahl der zurückgelieferten Abfahrten

}

export class DepartureEndpoint  {
    static readonly path : string = 'abfahrten.json'
    
    private static handleResponse(response: AxiosResponse) : Departure[] {
      if (!response.data) {
        throw "Response doesn't include data.";
      } else {
        let departureRequest = DepartureRequest.fromJSON(response.data)
        let abfahrten = departureRequest.Abfahrten
        return abfahrten
      }
    }
  
    private static requestAPI(axiosRequestConfig: AxiosRequestConfig) :  Promise<Departure[]> {
      return new Promise((resolve : (value?: Departure[])=>void, reject: (reason?:any)=> void) : void=>{
        axios(axiosRequestConfig)
          .then(response => {resolve(DepartureEndpoint.handleResponse(response));})
          .catch(error => reject(error))
      })
    }
  
   
    static getByStopID(haltId:string, linie?:string, options?:DepartureRequestParams ): Promise<Departure[]>{
        // haltId = Haltestellenkennung je nach NetVU, VGN-Kennung (REC_ORT.Kurzstrecke) oder VAG-Kennung (REC_ORT.ORT_REF_ORT_KUERZEL)
        // linie = Linienbezeichnung der VAG aus der VDV 452 (REC_LID . LI_KUERZEL)
        
        let path = this.path
        if (linie) {
            path += "/" + linie
        }
        
        let params : DepartureRequestParams = {}
        if (options) {
            Object.assign(params, options)
        }

      const axiosRequestConfig : AxiosRequestConfig = API.axiosRequestConfig(params, path, haltId)
      return DepartureEndpoint.requestAPI(axiosRequestConfig)
    }
  }
  
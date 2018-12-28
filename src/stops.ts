import { DepartureResponse } from "./departures";
import { DepartureEndpoint, DepartureRequestParams } from "./api/departureEndpoint";
import API from ".";

// A representation of Stop's data that can be converted to
// and from JSON without being altered.
interface StopJSON {
    Haltestellenname: string
    VAGKennung : string
    VGNKennung: number
    Longitude: number
    Latitude: number
    Produkte: string
}

export class Stop {
  Haltestellenname: string
  VAGKennung : string
  VGNKennung: number
  Longitude: number
  Latitude: number
  Produkte: string

  constructor(
    Haltestellenname: string,
    VAGKennung : string,
    VGNKennung: number,
    Longitude: number,
    Latitude: number,
    Produkte: string
  ) {
    this.Haltestellenname = Haltestellenname
    this.VAGKennung = VAGKennung 
    this.VGNKennung = VGNKennung 
    this.Longitude = Longitude
    this.Latitude = Latitude
    this.Produkte = Produkte
  }

  getName(): string {
    return this.Haltestellenname;
  }

  getDepartures(linie?:string, options?:DepartureRequestParams) : Promise<DepartureResponse> {
    let haltId = this.VGNKennung.toString()
    return DepartureEndpoint.getByStopID(haltId, linie, options) 
  }
  // fromJSON is used to convert an serialized version
  // of the Stop to an instance of the class
  static fromJSON(json: StopJSON|string): Stop {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, Stop.reviver);
    } else {
      // create an instance of the Stop class
      let stop = Object.create(Stop.prototype);
      // copy all the fields from the json object
      return Object.assign(stop, json, {
        // convert fields that need converting
        // created: new Date(json.created),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call Stop.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === "" ? Stop.fromJSON(value) : value;
  }
}



interface StopResponseJSON {
    Metadata: Metadata
    Haltestellen: Stop[]
}
interface Metadata {
  Version: string,
  Timestamp: string
}
export class StopResponse {
    Metadata: Metadata
    Haltestellen: Stop[]

  constructor(
    Metadata: Metadata,
    Haltestellen: Stop[]
  ) {
    this.Metadata = Metadata
    this.Haltestellen = Haltestellen
  }

  getStops(): Stop[] {
    return this.Haltestellen;
  }

  // fromJSON is used to convert an serialized version
  // of the Stop to an instance of the class
  static fromJSON(json: StopResponseJSON|string): StopResponse {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, StopResponse.reviver);
    } else {
      // create an instance of the StopResponse class
      let stop = Object.create(StopResponse.prototype);
      // copy all the fields from the json object
      return Object.assign(stop, json, {
        // convert fields that need converting
         Haltestellen: json.Haltestellen.map(h => {
             return Stop.fromJSON(h)
         })
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call Stop.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === "" ? Stop.fromJSON(value) : value;
  }
}
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



interface StopRequestJSON {
    Metadata: Metadata
    Haltestellen: Stop[]
}
interface Metadata {
  Version: string,
  Timestamp: string
}
export class StopRequest {
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
  static fromJSON(json: StopRequestJSON|string): StopRequest {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, StopRequest.reviver);
    } else {
      // create an instance of the StopRequest class
      let stop = Object.create(StopRequest.prototype);
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
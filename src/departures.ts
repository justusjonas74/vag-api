interface DepartureJSON {
    Linienname: string
    Haltepunkt: string
    Richtung: string
    Richtungstext: string
    AbfahrtszeitSoll: string
    AbfahrtszeitIst: string
    Produkt: string
    Longitude: number
    Latitude: number
    Fahrtnummer: number
    Fahrtartnummer: number
    Prognose: boolean
}

export class Departure {
    Linienname: string
    Haltepunkt: string
    Richtung: string
    Richtungstext: string
    AbfahrtszeitSoll: Date
    AbfahrtszeitIst: Date
    Produkt: string
    Longitude: number
    Latitude: number
    Fahrtnummer: number
    Fahrtartnummer: number
    Prognose: boolean
    private delayInMs : number
  
    constructor(
        Linienname: string,
        Haltepunkt: string,
        Richtung: string,
        Richtungstext: string,
        AbfahrtszeitSoll: Date,
        AbfahrtszeitIst: Date,
        Produkt: string,
        Longitude: number,
        Latitude: number,
        Fahrtnummer: number,
        Fahrtartnummer: number,
        Prognose: boolean
    ) {
        this.Linienname = Linienname
        this.Haltepunkt = Haltepunkt
        this.Richtung = Richtung
        this.Richtungstext = Richtungstext
        this.AbfahrtszeitSoll = AbfahrtszeitSoll
        this.AbfahrtszeitIst = AbfahrtszeitIst
        this.Produkt = Produkt
        this.Longitude = Longitude
        this.Latitude = Latitude
        this.Fahrtnummer = Fahrtnummer
        this.Fahrtartnummer = Fahrtartnummer
        this.Prognose = Prognose
        this.delayInMs =  this.calcDelay()
    }
    
    calcDelay() : number {
      return this.AbfahrtszeitIst.getTime() - this.AbfahrtszeitSoll.getTime();
    }
    isDelayed(secondsTolerance: number = 60){
      if (!this.delayInMs){this.delayInMs =  this.calcDelay()}  // Workaround: If "Departure" is initialized by JSON the constructor method "this.delayInMs =  this.calcDelay()" isn't called ! 
      return ((this.delayInMs) > (secondsTolerance * 1000))
    }
  
    // toJSON is automatically used by JSON.stringify
    // toJSON(): DepartureJSON {
    //   // copy all fields from `this` to an empty object and return in
    //   return Object.assign({}, this, {
    //     // convert fields that need converting

    //   });
    // }
  
    // fromJSON is used to convert an serialized version
    // of the Departure to an instance of the class
    static fromJSON(json: DepartureJSON|string): Departure {
      if (typeof json === 'string') {
        // if it's a string, parse it first
        return JSON.parse(json, Departure.reviver);
      } else {
        // create an instance of the Departure class
        let departure = Object.create(Departure.prototype);
        // copy all the fields from the json object
        return Object.assign(departure, json, {
          // convert fields that need converting
          // created: new Date(json.created),
            AbfahrtszeitSoll: new Date(json.AbfahrtszeitSoll),
            AbfahrtszeitIst: new Date(json.AbfahrtszeitIst)
        });
      }
    }
  
    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call Stop.fromJSON on the resulting value.
    static reviver(key: string, value: any): any {
      return key === "" ? Departure.fromJSON(value) : value;
    }
  }

interface DepartureSonderinformationen {
    Text: string
}
  
interface DepartureResponseJSON {
    Metadata: Metadata
    Haltestellenname: string
    VAGKennung: string
    VGNKennung: string
    Abfahrten: DepartureJSON[]
    Sonderinformationen? : DepartureSonderinformationen
}
interface Metadata {
  Version: string,
  Timestamp: string
}

export class DepartureResponse {
    Metadata: Metadata
    Haltestellenname: string
    VAGKennung: string
    VGNKennung: string
    Abfahrten: Departure[]
    Sonderinformationen?: DepartureSonderinformationen

  constructor(
    Metadata: Metadata,
    Haltestellenname: string,
    VAGKennung: string,
    VGNKennung: string,
    Abfahrten: Departure[],
    Sonderinformationen?: DepartureSonderinformationen
  ) {
    this.Metadata = Metadata,
    this.Haltestellenname = Haltestellenname,
    this.VAGKennung = VAGKennung,
    this.VGNKennung = VGNKennung,
    this.Abfahrten = Abfahrten
    if (Sonderinformationen) {
        this.Sonderinformationen = Sonderinformationen!
    }
  
  }

  getDepartures(): Departure[] {
    return this.Abfahrten;
  }

  // fromJSON is used to convert an serialized version
  // of the Stop to an instance of the class
  static fromJSON(json: DepartureResponseJSON|string): DepartureResponse {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, DepartureResponse.reviver);
    } else {
      // create an instance of the DepartureResponse class
      let departureResponse = Object.create(DepartureResponse.prototype);
      // copy all the fields from the json object
      return Object.assign(departureResponse, json, {
        // convert fields that need converting
         Abfahrten: json.Abfahrten.map(h => {
             return Departure.fromJSON(h)
         })

      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call Stop.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === "" ? DepartureResponse.fromJSON(value) : value;
  }
}
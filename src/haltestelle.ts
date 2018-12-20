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

class Stop {

  constructor(
    Haltestellenname: string,
    VAGKennung : string,
    VGNKennung: number,
    Longitude: number,
    Latitude: number,
    Produkte: string
  ) {}

  getName(): string {
    return this.Haltestellenname;
  }

  // toJSON is automatically used by JSON.stringify
  toJSON(): StopJSON {
    // copy all fields from `this` to an empty object and return in
    return Object.assign({}, this, {
      // convert fields that need converting
    });
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
    return key === "" ? User.fromJSON(value) : value;
  }
}



interface StopRequestJSON {
    Version: string
    Timestamp: string
    Haltestellen: Stop[]
}

class StopRequest {

  constructor(
    Version: string,
    Timestamp: string,
    Haltestellen: Stop[]
  ) {}

  getStops(): Stop[] {
    return this.Haltestellen;
  }

  // fromJSON is used to convert an serialized version
  // of the Stop to an instance of the class
  static fromJSON(json: StopJSON|string): Stop {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, StopRequest.reviver);
    } else {
      // create an instance of the Stop class
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
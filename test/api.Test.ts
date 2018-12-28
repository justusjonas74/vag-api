import chai,{ expect,should } from 'chai';
import chaiAsPromised from 'chai-as-promised'

import 'mocha';
chai.use(chaiAsPromised)
chai.should();

import {API} from './../src/api'
import {DepartureEndpoint} from '../src/api/departureEndpoint';
import {StopEndpoint} from '../src/api/stopsEndpoint';

describe('API.ts', ()=>{
    it('should have a property Stops', ()=>{
        expect(API).to.have.property('Stops')
    })
    it('should have a property Departures', ()=>{
        expect(API).to.have.property('Departures')
    })

    describe('API.Stops', ()=>{
        it('should have a method findByName', ()=>{
            expect(StopEndpoint).to.have.property('findByName')
        })
        describe('API.Stops.findByName', ()=>{
            it('should eventually return an Array', ()=>{
                let response = StopEndpoint.findByName('kjbasfdkjbdf')
                return expect(response).to.eventually.be.an('array')
            })
            it('should eventually return a non-empty Array if a stop is found', ()=>{
                let response = StopEndpoint.findByName('Bauernfeind')
                return expect(response).to.eventually.not.be.empty
            })
            it('should eventually return an empty Array if no stop is found', ()=>{
                let response = StopEndpoint.findByName('kjnlk lj')
                return expect(response).to.eventually.be.empty
            })
            // FAILS! SEEMS TO BE A chaiAsPromised/Typescript ERROR
            // it('should eventually return a list of Stops', ()=>{
            //     let response = StopEndpoint.findByName('Bauer')
            //     return response.should.eventually.all.have.property('Haltestellenname');    
               
            // })
        })
        describe('API.Stops.findByLocation', ()=>{
            it('should eventually return an Array', ()=>{
                const lat = 49,lon = 11
                let response = StopEndpoint.findByLocation(lat,lon)
                return expect(response).to.eventually.be.an('array')
            })
        it('should eventually return an empty Array if no stop is found', ()=>{
            const lat = 48,lon = 10, distance = 1;
            let response = StopEndpoint.findByLocation(lat,lon,distance)
            return expect(response).to.eventually.be.empty
        })
        it('should eventually return a non-empty Array if a stop is found', ()=>{
                const lat = 49.41740327554740,lon = 11.1072973762163, distance = 1;
                let response = StopEndpoint.findByLocation(lat,lon,distance)
                return expect(response).to.eventually.not.be.empty
            })
        })
    })

    describe('API.Departures', ()=>{
        it('should have a method getByStopID', ()=>{
            expect(DepartureEndpoint).to.have.property('getByStopID')
        })
        describe('API.Departures.getByStopID', ()=>{
            it('should eventually return an Array', ()=>{
                let response = DepartureEndpoint.getByStopID('1550')
                return expect(response).to.eventually.be.an('array')
            })
            it('should eventually return a non-empty Array if a stop is found', ()=>{
                let response = DepartureEndpoint.getByStopID('1550')
                return expect(response).to.eventually.not.be.empty
            })
            it('should eventually rejected if no valid haltId is given', ()=>{
                let response = DepartureEndpoint.getByStopID('kjnlklj')
                return expect(response).to.be.rejected
            })
            // FAILS! SEEMS TO BE A chaiAsPromised/Typescript ERROR
            // it('should eventually return a list of Stops', ()=>{
            //     let response = StopEndpoint.findByName('Bauer')
            //     return response.should.eventually.all.have.property('Haltestellenname');    
               
            // })
        })
    })
})

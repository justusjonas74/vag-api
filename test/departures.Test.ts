import chai,{ expect } from 'chai';
import 'mocha';
import * as fs from 'fs'

import {DepartureResponse,Departure} from '../src/departures'

const ResponseJsonStr = fs.readFileSync('test/testdata/departures.json').toString()
const ResponseStr = DepartureResponse.fromJSON(ResponseJsonStr)
const ResponseJson = JSON.parse(ResponseJsonStr)
const Response = DepartureResponse.fromJSON(ResponseJson)

const DepartureJsonStr = fs.readFileSync('test/testdata/departure.json').toString()
const departureStr = Departure.fromJSON(DepartureJsonStr)
const DepartureJson = JSON.parse(DepartureJsonStr)
const departure = Departure.fromJSON(DepartureJson)

describe('departures.ts', ()=>{
    describe('DepartureResponse', ()=>{
        it('should have a static property "fromJSON',()=>{
            expect(DepartureResponse).to.haveOwnProperty('fromJSON')
        })
        describe('DepartureResponse.fromJSON', ()=>{
            it('should return a DepartureResponse instance with a JSON String input', ()=>{
                expect(ResponseStr).to.be.instanceof(DepartureResponse)
            })
            it('should return a DepartureResponse instance with a parsed JSON input', ()=>{
                expect(Response).to.be.instanceof(DepartureResponse)
            })
        })
    })
    describe('Departure', ()=>{
        it('should have a static property "fromJSON',()=>{
            expect(Departure).to.haveOwnProperty('fromJSON')
        })
        describe('Departure.fromJSON', ()=>{
            it('should return a DepartureResponse instance with a JSON String input', ()=>{
                expect(departureStr).to.be.instanceof(Departure)
            })
            it('should return a DepartureResponse instance with a parsed JSON input', ()=>{
                expect(departure).to.be.instanceof(Departure)
            })
        })
        describe('Departure.isDelayed', ()=>{
            it('should have a  property "isDelayed',()=>{
                expect(departure).to.have.property('isDelayed')
            })
            it('should return true if no tolerance is set', ()=>{
                expect(departure.isDelayed()).to.be.true
            })
            it('should return true if 2 Minutes (2*60 seconds) tolerance is set', ()=>{
                expect(departure.isDelayed(2*60)).to.be.true
            })
            it('should return false if 20 Minutes (20*60 seconds) tolerance is set', ()=>{
                expect(departure.isDelayed(20*60)).to.be.false
            })
        })
    })

})
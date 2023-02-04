const fs = require('fs')
const assert = require('chai').assert

const dataFinal = 'data-final'
const dataFinalMonth = 'data-final-month'

const dateMap = require('../date-files-map/date-map.json')
const dateMapMonth = require('../date-files-map/date-map-month.json')



describe('Composite data tests', () => {

    it('All full files are present are present date map file', () => {
        let files = []
        let mapEntries = []

        fs.readdirSync(dataFinal).forEach(file => files.push(file))

        for (const year in dateMap) {
            for (const month in dateMap[year]) {
                dateMap[year][month].forEach(entry => mapEntries.push(entry))
            }
        }

        assert.equal(mapEntries.length, files.length)
    })

    it('All full month files are present are present date map month file', () => {
        let files = []
        let mapEntries = []

        fs.readdirSync(dataFinalMonth).forEach(file => files.push(file))

        for (const year in dateMapMonth) {
            for (const month in dateMapMonth[year]) {
                mapEntries.push(dateMap[year][month])
            }
        }

        assert.equal(mapEntries.length, files.length)
    })
    
})
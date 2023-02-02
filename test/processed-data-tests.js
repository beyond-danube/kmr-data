const fs = require('fs')
const assert = require('chai').assert

const xlsxResulFiles = 'data-from-xlsx'
const rawJsonDataFiles = 'data-raw-json'
const dataFinal = 'data-final'
const dataFinalMonth = 'data-final-month'

describe('Processed data tests', () => {

    it('All items from original data files present in processed data files', () => {
        let originalFiles = []
        let processedFiles = []

        fs.readdirSync(xlsxResulFiles).forEach(file => originalFiles.push(file))
        fs.readdirSync(rawJsonDataFiles).forEach(file => originalFiles.push(file))

        fs.readdirSync(dataFinal).forEach(file => processedFiles.push(file))

        assert.equal(processedFiles.length, originalFiles.length)
    })
})
const fs = require('fs')
const assert = require('chai').assert

const dataFinal = 'data-final'
const dataFinalMonth = 'data-final-month'
const dataFinalLite = 'data-final-lite'
const dataFinalMonthLite = 'data-final-lite-month'

describe('Composite data tests', () => {

    it('All full files are present data by month files as entries', () => {
        let separateFiles = []
        let groupedFiles = []

        fs.readdirSync(dataFinal).forEach(file => separateFiles.push(file))

        fs.readdirSync(dataFinalMonth).forEach(file => {
            let dataFile = fs.readFileSync(`${dataFinalMonth}/${file}`);
            let dataFileList = JSON.parse(dataFile);

            dataFileList.forEach(entry => groupedFiles.push(entry.docId))
        })

        assert.equal(groupedFiles.length, separateFiles.length)
    })

    it('All lite files are present data by month files as entries', () => {
        let separateFiles = []
        let groupedFiles = []

        fs.readdirSync(dataFinalLite).forEach(file => separateFiles.push(file))

        fs.readdirSync(dataFinalMonthLite).forEach(file => {
            let dataFile = fs.readFileSync(`${dataFinalMonth}/${file}`);
            let dataFileList = JSON.parse(dataFile);

            dataFileList.forEach(entry => groupedFiles.push(entry.docId))
        })

        assert.equal(groupedFiles.length, separateFiles.length)
    })

    it('All items in full data files are present in lite data files', () => {
        let fullDataFilesList = []
        let liteDataFilesList = []

        fs.readdirSync(dataFinalLite).forEach(file => fullDataFilesList.push(file))

        fs.readdirSync(dataFinalLite).forEach(file => liteDataFilesList.push(file))


        assert.equal(liteDataFilesList.length, fullDataFilesList.length)
    })
})
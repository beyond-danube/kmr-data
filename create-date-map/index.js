const fs = require('fs')

const dataFolder = './data-final/'
const dataFolderMonthLite = './data-final-lite-month/'

const dataMapFile = './date-files-map/date-map.json'
const dataMapMonthFile = './date-files-map/date-map-month.json'

let dateMapFoemFile = JSON.parse(fs.readFileSync(dataMapFile))

let dateMap = Object.assign(dateMapFoemFile)

fs.readdirSync(dataFolder).forEach(file => {

    fileNameDate = file.split('_')[0]

    let year = '20' + fileNameDate.substring(0, 2)
    let month = fileNameDate.substring(2, 4)

    if(dateMap[year] == '') {
        dateMap[year] = {}
    }


    if(!dateMap[year].hasOwnProperty(month)) {
        dateMap[year][month] = []
    }

    if(!dateMap[year][month].includes(file)) {
        dateMap[year][month].push(file)
    }

    console.log(`Add file ${year} ${month} ${file}`)

});


fs.writeFileSync(dataMapFile, JSON.stringify(dateMap, null, 2))

let dateMapFromMonthFile = JSON.parse(fs.readFileSync(dataMapMonthFile))

let dateMonthMap = Object.assign(dateMapFromMonthFile)

fs.readdirSync(dataFolderMonthLite).forEach(file => {

    console.log(`Add month file: ${file}`)

    let year = file.split('.json')[0].split('-')[0]
    let month = file.split('.json')[0].split('-')[1]

    if(dateMonthMap[year] == '') {
        dateMonthMap[year] = {}
    }

    dateMonthMap[year][month] = file

})

fs.writeFileSync(dataMapMonthFile, JSON.stringify(dateMonthMap, null, 2))
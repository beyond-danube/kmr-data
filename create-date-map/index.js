const fs = require('fs')

const dataFolder = './data-final/'

const dataMapFile = './date-files-map/date-map.json'

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


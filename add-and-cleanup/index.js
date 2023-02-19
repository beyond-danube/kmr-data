const fs = require('fs')
const map = require('../common/fraction-map.js')

const xlsxResulFiles = 'data-from-xlsx'
const rawJsonDataFiles = 'data-raw-json'
const dataFinal = 'data-final'
const dataFinalMonth = 'data-final-month'

let failedFiles = []

fs.readdirSync(xlsxResulFiles).forEach(file => {

    console.log(`Process file from XLSX: ${file}`)

    let rawdata = fs.readFileSync(`${xlsxResulFiles}/${file}`);
    let e = JSON.parse(rawdata);

    e.DPList.forEach(dp => {

        // There is one guy, who voted '0' every time. Treat it as ... here

        if( dp.DPGolos === '...' || dp.DPGolos == 0) {
            dp.DPGolos = 'Відсутній'
        }

        dp.DPFraction = 'Невідома Фракція'
        dp.DPName = dp.DPName.replace('  ', ' ')

        for (const key in map.FRACTION_MAP) {
            if(map.FRACTION_MAP[key].includes(dp.DPName)) {
                dp.DPFraction = key
            }
        }
    })

    e.ABSCnt = e.DPList.filter(item => item.DPGolos === 'Відсутній').length
    e.TotalInclAbsCnt = e.TotalCnt + e.ABSCnt

    //console.log(`'./data-final/${file}',`)

    e.RESULT = e.RESULT.toUpperCase()

    e.docId = file

    fs.writeFileSync(`./data-final/${file}`, JSON.stringify(e, null, 2))
});

fs.readdirSync(rawJsonDataFiles).forEach(file => {
    let rawdata = fs.readFileSync(`${rawJsonDataFiles}/${file}`);

    console.log(`Process file raw JSON: ${file}`)

    try {
        let e = JSON.parse(rawdata);

    e.DPList.forEach(dp => {

        if( dp.DPGolos === '.........' || dp.DPGolos == 0) {
            dp.DPGolos = 'Відсутній'
        }

        dp.DPFraction = 'Невідома Фракція'
        dp.DPName = dp.DPName.replace('  ', ' ').replace('. ', '.')

        for (const key in map.FRACTION_MAP) {
            if(map.FRACTION_MAP[key].includes(dp.DPName)) {
                dp.DPFraction = key
            }
        }

        dp.DPGolos = dp.DPGolos.trim()

    })

    e.ABSCnt = e.DPList.filter(item => item.DPGolos === 'Відсутній').length
    e.TotalInclAbsCnt = e.TotalCnt + e.ABSCnt

    e.RESULT = e.RESULT.trim()

    e.docId = file

    fs.writeFileSync(`./data-final/${file}`, JSON.stringify(e, null, 2))

    } catch (e) {
        failedFiles.push(file)
    }
})

let dataByYearAndMonth = {}


fs.readdirSync(dataFinal).forEach(file => {
    
    console.log(`Merged processed file: ${file}`)

    fileNameDate = file.split('_')[0]

    let year = '20' + fileNameDate.substring(0, 2)
    let month = fileNameDate.substring(2, 4)

    if(!dataByYearAndMonth.hasOwnProperty(`${year}-${month}`)) {
        dataByYearAndMonth[`${year}-${month}`] = []
    }

    let dataFile = fs.readFileSync(`${dataFinal}/${file}`);
    let dataFileEntry = JSON.parse(dataFile);

    dataByYearAndMonth[`${year}-${month}`].push(dataFileEntry)
})

for (const key in dataByYearAndMonth) {

    console.log(`Write composite file: ${key}`)

    fs.writeFileSync(`${dataFinalMonth}/${key}.json`, JSON.stringify(dataByYearAndMonth[key], null, 2))
}

if(failedFiles.length > 0) {
    console.log(`Could not process ${failedFiles.length} files, manual fix required:`)
    failedFiles.forEach(failedFile => console.log(failedFile))
}

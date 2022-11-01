const fs = require('fs')
const map = require('../common/fraction-map.js')

const xlsxResulFiles = 'data-from-xlsx'

fs.readdirSync(xlsxResulFiles).forEach(file => {

    //console.log(`process file: ${file}`)

    let rawdata = fs.readFileSync(`${xlsxResulFiles}/${file}`);
    let e = JSON.parse(rawdata);

    e.DPList.forEach(dp => {

        // There is one guy, 

        if( dp.DPGolos === '...' || dp.DPGolos == 0) {
            dp.DPGolos = 'Відсутній'
        }

        dp.DPFraction = 'Невідома Фракція'

        for (const key in map.FRACTION_MAP) {
            if(map.FRACTION_MAP[key].includes(dp.DPName)) {
                dp.DPFraction = key
            }
        }
    })

    e.ABSCnt = e.DPList.filter(item => item.DPGolos === 'Відсутній').length
    e.TotalInclAbsCnt = e.TotalCnt + e.ABSCnt

    console.log(`'./data-final/${file}',`)

    //fs.writeFileSync(`./data-final/${file}`, JSON.stringify(e, null, 2))
});
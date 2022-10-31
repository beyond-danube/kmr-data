require('dotenv').config()

const axios = require('axios')
require('url').URL

const fs = require('fs')

const config = `?key=${process.env.GOOGLE_API_KEY}`
const ids = process.env.IDS

class VotingResultEntry {
    DocTime
    OrgName
    SName
    GLType
    GLTime
    PD_NPP
    PD_Fullname
    GL_Text
    GL_ResultType
    DPList
    YESCnt
    NOCnt
    UTRCnt
    NGCnt
    TotalCnt
    RESULT
}

class VotingEntry {
    DPName
    DPGolos

    constructor(name, vote) {
        this.DPName = name;
        this.DPGolos = vote;
    }
}


const entryTitles = {
    GL_TYPE: "ПОІМЕННЕ ГОЛОСУВАННЯ",
    ORG_NAME: "КИЇВСЬКА МІСЬКА РАДА",
    S_NAME: "Пленарне засідання  2 сесія  9 скликання"
}

const run = async function() {

    for await (const id of ids.split(',')) {

        let sheetUri = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Усі${config}`
        let sheetsEncodedUri = encodeURI(sheetUri)
    
        let res

        console.log(`process sheet: ${id}`)
    
        try {
            res = await axios.get(sheetsEncodedUri).catch(e => console.log(e))
        } catch (e) {
            console.warn(e)
        }
    
        let entries = []
    
        for (let i = 1; i < res.data.values.length; i++) {
            
            let e = new VotingResultEntry()

            // Values that are same all the time
            e.OrgName = entryTitles.ORG_NAME
            e.SName = entryTitles.S_NAME
            e.GLType = entryTitles.GL_TYPE

            e.GL_ResultType = ' '


            e.PD_NPP = res.data.values[i][0]
            e.GLTime = res.data.values[i][1]
            e.GL_Text = res.data.values[i][2]
            e.PD_Fullname = res.data.values[i][2]
            e.RESULT = res.data.values[i][3]
            e.DPList = []
            
    
            for (let j = 4; j < res.data.values[i].length; j++) {
                e.DPList.push(new VotingEntry(res.data.values[0][j], res.data.values[i][j]))
            }

            e.YESCnt = e.DPList.filter(item => item.DPGolos === 'За').length
            e.NOCnt = e.DPList.filter(item => item.DPGolos === 'Проти').length
            e.NGCnt = e.DPList.filter(item => item.DPGolos === 'Не голосував').length
            e.UTRCnt = e.DPList.filter(item => item.DPGolos === 'Утримався').length
    
            e.TotalCnt = e.YESCnt + e.NOCnt + e.NGCnt + e.UTRCnt

            // Just set data, this is enough just for data consiactance with new JSON data
            e.DocTime = e.GLTime.split(' ')[0]

            entries.push(e)
        }
    
        entries.forEach(e =>  {
            let date = e.GLTime.split(' ')[0].split('.')
            fs.writeFileSync(`data-from-xlsx/${date[2]}${date[1]}${date[0]}_${e.PD_NPP}.json`, JSON.stringify(e, null, 2))
        })
    }
    
}

run()
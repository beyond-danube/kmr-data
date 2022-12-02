const fs = require('fs')

const fullData = 'data-final'
const dataLite = 'data-final-lite'

class VotingResultEntryLite {
    docId
    GL_Text
    YESCnt
    NOCnt
    UTRCnt
    NGCnt
    TotalCnt
    RESULT
    ABSCnt
    TotalInclAbsCnt

    constructor(docId, text, yes, no, utr, ng, total, res, abs, totalWithAbs) {
        this.docId = docId
        this.GL_Text = text
        this.YESCnt = yes
        this.NOCnt = no
        this.UTRCnt = utr
        this.NGCnt = ng
        this.TotalCnt = total
        this.RESULT = res
        this.ABSCnt = abs
        this.TotalInclAbsCnt = totalWithAbs
    }
}

fs.readdirSync(fullData).forEach(file => {

    console.log(`process file: ${file}`)

    let fullDataFile = fs.readFileSync(`${fullData}/${file}`);
    let fullDataEntry = JSON.parse(fullDataFile);

    let liteDataEntry = new VotingResultEntryLite(file, fullDataEntry.GL_Text, fullDataEntry.YESCnt, fullDataEntry.NOCnt, fullDataEntry.UTRCnt, fullDataEntry.NGCnt, fullDataEntry.TotalCnt, fullDataEntry.RESULT, fullDataEntry.ABSCnt, fullDataEntry.TotalInclAbsCnt)

    fs.writeFileSync(`./${dataLite}/${file}`, JSON.stringify(liteDataEntry, null, 2))
});

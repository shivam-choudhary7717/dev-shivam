const  xlsx = require('xlsx')

module.exports = function JsonToExcel(ScrapedData){
    const worksheet = xlsx.utils.json_to_sheet(ScrapedData);
    const workBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook , worksheet , "GoogleData")
    xlsx.write(workBook,{bookType:'xlsx', type:'buffer'})
    xlsx.write(workBook , {bookType:'xlsx' , type:'binary'})
    xlsx.writeFile(workBook , "GoogleData.xlsx")
}
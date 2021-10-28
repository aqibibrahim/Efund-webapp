


function pad(s) { return (s < 10) ? '0' + s : s; }


export const convertdateToDMYFormat = (date)=>{
     let dateObj = (date instanceof Date) ? date : new Date(date)
     return [pad(dateObj.getDate()), pad(dateObj.getMonth()+1), dateObj.getFullYear()].join('-')
}

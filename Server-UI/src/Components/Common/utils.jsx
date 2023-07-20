export const getUiDate = (date) => {
    const _date = new Date(date);
    let day = _date.getDate();
    if(day < 10){
        day = "0" + day;
    }
    let month = _date.getMonth() + 1;
    if(month < 10){
        month = "0" + month;
    }
    const year = _date.getFullYear();

    let uiDate = year.toString() + "-" + month.toString() + "-" + day.toString();
    return uiDate;
} 
function getAbsDate(date) {
    let theDate = new Date(date)  
    let registeredSince;
    let month;
    let year = theDate.getFullYear()
    switch (theDate.getMonth() + 1) {
        case 1:
            month = 'Januari'
            break;
        case 2:
            month = 'Februari'
            break;
        case 3:
            month = 'Maret'
            break;
        case 4:
            month = 'April'
            break;
        case 5:
            month = 'Mei'
            break;
        case 6:
            month = 'Juni'
            break;
        case 7:
            month = 'Juli'
            break;
        case 8:
            month = 'Agustus'
            break;
        case 9:
            month = 'September'
            break;
        case 10:
            month = 'Oktober'
            break;
        case 11:
            month = 'November'
            break;
        case 12:
            month = 'Desember'
            break;
        default:
            break;
    }
    registeredSince = `${month} ${year}`
    return registeredSince
}

module.exports = getAbsDate
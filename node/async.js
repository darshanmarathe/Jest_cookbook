function GetFullName(fname , lname) {
    return new Promise((resolve , reject) => {

        setTimeout(() => {
            resolve(fname + " " + lname)
        }, 2000);
    })
}


function GetFullNameWithCallback(fname , lname , callback) {
    
    setTimeout(() => {
        callback(null , fname + " " + lname)
    }, 2000);
}


module.exports = {
    GetFullName,
    GetFullNameWithCallback
}
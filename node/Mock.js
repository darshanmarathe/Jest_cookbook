const axios = require('axios')

function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
        callback(items[index]);
    }
}

async function GetUsers() {
    return await axios.get('https://jsonplaceholder.typicode.com/users')
}


module.exports = {
    forEach,
    GetUsers
}
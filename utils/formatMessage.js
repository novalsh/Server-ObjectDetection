const moment = require('moment');

function formatMessage(id, branch_id, latitude, longitude, status, conditional, time) {
    return {
        id,
        branch_id,
        latitude,
        longitude,
        status,
        conditional,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;
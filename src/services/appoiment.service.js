const scheduleRepository = require('../repositories/schedule.repository');


exports.verifyAvailabity = async(reqBody) => {
    try {
        let availabityList = 
                await scheduleRepository.verifyAvailability
                    (reqBody.workerID,reqBody.shiftStarts,reqBody.shiftEnds);
        if(availabityList.length > 0)
        {
            return {message: 'We can work' };
        }
        return {message: 'We cannot work'};
    } catch (error) {
        console.log(error)
        throw Error('Error from schedule service');
    }
}


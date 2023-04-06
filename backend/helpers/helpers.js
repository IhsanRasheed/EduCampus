const student = require('../models/student')
const batch = require('../models/batch')
const teacher = require('../models/teacher')

const uniqueCodeGenerator = (data) => {
    try{
        return new Promise(async(resolve,reject) => {
            let collectionName;
            let firstCode;
            let slno;
            if (data === 'student') {
                collectionName = student
                firstCode = 'EDST'
            }else if (data === 'batch') {
                collectionName = batch
                firstCode = 'EDBT'
            }else if (data === 'teacher'){
                collectionName = teacher
                firstCode = 'EDTR'
            }
            collectionName.countDocuments({}).then((count) => {
                if(count < 9) {
                    slno = `00${count + 1}`
                } else if (count > 8 && count < 99) {
                    slno = `0${count + 1}`
                } else {
                    slno = `${count +1}`
                }

                const uniqueCode = `${firstCode}${slno}`
                resolve(uniqueCode)
            }).catch((err) => {
                reject(err)
            })
        })

    }catch (error) {
        console.log(error)
    }
}

module.exports = {
    uniqueCodeGenerator
}
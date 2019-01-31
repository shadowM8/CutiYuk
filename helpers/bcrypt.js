const bcrypt = require('bcryptjs')

function bcryptHash(password){
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(10)
          .then(salt=>{
            return bcrypt.hash(password,salt)
          })
          .then(hash=>{
            resolve(hash)
          })
          .catch(err=>{
            reject(err)
          })
    })
}

module.exports = bcryptHash
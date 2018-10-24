const axios = require('axios')
const fs = require('fs')

let pArray
let mArray
const allData = []
const HOST = 'http://api-sandbox.pillpack.com';

const getPrescriptions = () => {
  axios.get(`${HOST}/prescriptions`)
  .then((response)=>{
    if (response.status === 200) {
      pArray = response.data
      getMedications()
    }else{
      return Promise.reject(response)
    }
  })
  .catch((err)=>{
    handlePromiseErr(err)
  })
}

const getMedications = () => {
  axios.get(`${HOST}/medications`)
  .then((response)=>{
    if (response.status === 200) {
      mArray = response.data
      sortPrescriptions()
    }else{
      return Promise.reject(response)
    }
  })
  .catch((err)=>{
    handlePromiseErr(err)
  })
}

const sortPrescriptions = () => {
  for (let i = 0; i < pArray.length; i++) {
    let match = mArray.filter(x => x.id === pArray[i].medication_id)
    allData.push({prescription_id: pArray[i].id, medications: match})
    // id of prescription, key
    //  array of matching medications, value
  }
  filterInactiveandGeneric()
}

const filterInactiveandGeneric = () => {
  let remainInactiveGeneric = []
  for (let i = 0; i < allData.length; i++) {
    let isActiveGeneric = allData[i].medications.filter(x => x.active === true
                    && x.generic === true) // easy on the eyes

    if (isActiveGeneric.length) {
      remainInactiveGeneric.push({prescription_id: allData[i].prescription_id, ActiveGeneric:isActiveGeneric})
    }
  }

  testLogger(remainInactiveGeneric)
}

//show id of prescription && id of approp. generic
const testLogger = (data) => {
  fs.writeFile('output.json', JSON.stringify(data), errCallback);
}

const errCallback = (err) => {
  if (err) throw err;
  console.log('done')
}

const handlePromiseErr = (err) => {
  if (err) throw err;
}

getPrescriptions()

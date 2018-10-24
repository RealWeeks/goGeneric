const axios = require('axios')
const fs = require('fs')

let pArray;
let mArray;
const allData = [];

const getPerscriptions = () => {
  axios.get('http://api-sandbox.pillpack.com/prescriptions')
  .then((response)=>{
    if (response.status === 200) {
      pArray = response.data
      getMedications()
    }else{
      return Promise.reject(response)
    }
  })
  .catch((err)=>{
    console.log(err)
  })
}

const getMedications = () => {
  axios.get('http://api-sandbox.pillpack.com/medications')
  .then((response)=>{
    if (response.status === 200) {
      mArray = response.data
      sortPerscriptions()
    }else{
      return Promise.reject(response)
    }
  })
  .catch((err)=>{
    console.log(err)
  })
}

const sortPerscriptions = () => {
  for (let i = 0; i < pArray.length; i++) {
    let match = mArray.filter(x => x.id === pArray[i].medication_id)
    allData.push({perscription_id: pArray[i].id, medications: match})
    // id of perscription, key
    //  array of matching medications, value
  }
  filterInactiveandGeneric()
}

const filterInactiveandGeneric = () => {
  let remainInactiveGeneric = []
  for (var i = 0; i < allData.length; i++) {
    let isActiveGeneric = allData[i].medications.filter(x => x.active === true
                    && x.generic === true) // easy on the eyes

    if (isActiveGeneric.length) {
      remainInactiveGeneric.push({perscription_id: allData[i].perscription_id, ActiveGeneric:isActiveGeneric})
    }
  }

  testLogger(remainInactiveGeneric)
}

//show id of perscription && id of approp. generic
const testLogger = (data) => {
  debugger;
  fs.writeFile('output.json', JSON.stringify(data), handleErr);
}

const handleErr = (err) =>{
  if (err) throw err;
  console.log('done')
}

getPerscriptions()

const fs = require('fs')
const axios = require('axios')
const HOST = 'http://api-sandbox.pillpack.com'

async function getData() {
  try {
    let prescriptionsResponse = await axios.get(`${HOST}/prescriptions`);
    let prescriptions = await prescriptionsResponse.data;
    let medicationsResponse = await axios.get(`${HOST}/medications`);
    let medications = await medicationsResponse.data;

    return { prescriptions, medications }
  } catch (err) {
    if (err) throw err;
  }
}



const sortPrescriptions = ({prescriptions, medications}) => {
  let sortedPArray = []
  for (let i = 0; i < prescriptions.length; i++) {
    let match = medications.filter(x => x.id === prescriptions[i].medication_id)
    sortedPArray.push({prescription_id: prescriptions[i].id, medications: match})
    // prescription_id => id of prescription
    // medications => array of matching medications
  }
  return sortedPArray
}

const filterInactiveandGeneric = (sortedPArray) => {
  let remainInactiveGeneric = []
  for (let i = 0; i < sortedPArray.length; i++) {
    let isActiveGeneric = sortedPArray[i].medications.filter(x => x.active === true
                    && x.generic === true) // easy on the eyes

    if (isActiveGeneric.length) {
      remainInactiveGeneric.push({prescription_id: sortedPArray[i].prescription_id, ActiveGeneric:isActiveGeneric})
    }
  }

  return remainInactiveGeneric
}

//show id of prescription && approp. generic
const writeToFile = (data) => {
  fs.writeFile('output.json', JSON.stringify(data), errCallback);
}

const errCallback = (err) => {
  if (err) throw err;
  console.log('done')
}

const handlePromiseErr = (err) => {
  if (err) throw err;
}

getData()
.then(sortPrescriptions)
.then(filterInactiveandGeneric)
.then(writeToFile)

module.exports = { sortPrescriptions, filterInactiveandGeneric }

const axios = require('axios')
const fs = require('fs')

// let pArray
// let mArray
// const allData = []
const HOST = 'http://api-sandbox.pillpack.com';
// const singleSearch = process.argv[2];


// async function getData() {
//
// }

async function getData() {
  try {
    let prescriptionsResponse = await axios.get(`${HOST}/prescriptions`);
    let prescriptions = await medicationsResponse.data;
    let medicationsResponse = await axios.get(`${HOST}/medications`);
    let medications = await prescriptionsResponse.data;

    console.log(medications);
  } catch (error) {
    console.error(error);
  }
}


const sortPrescriptions = () => {
  for (let i = 0; i < pArray.length; i++) {
    let match = mArray.filter(x => x.id === pArray[i].medication_id)
    allData.push({prescription_id: pArray[i].id, medications: match})
    // prescription_id => id of prescription
    // medications => array of matching medications
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

  if (singleSearch) {
    showSingle(remainInactiveGeneric)
  }
  testLogger(remainInactiveGeneric)
}

const showSingle = (remainInactiveGeneric) =>{

}
//show id of prescription && approp. generic
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

// getPrescriptions()
getData()

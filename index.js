const axios = require('axios');

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
  testLogger()
}

const testLogger = (data) => {
  console.log(allData);
}


getPerscriptions()

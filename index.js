const axios = require('axios');

let pArray;
let mArray;

const getPerscriptions = () =>{
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

const getMedications = () =>{
  axios.get('http://api-sandbox.pillpack.com/medications')
  .then((response)=>{
    if (response.status === 200) {
      mArray = response.data
      showResponse()
    }else{
      return Promise.reject(response)
    }
  })
  .catch((err)=>{
    console.log(err)
  })
}



const showResponse = () =>{
  console.log(pArray)
  console.log(mArray)
}

getPerscriptions()

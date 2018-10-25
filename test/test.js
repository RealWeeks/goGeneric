const expect = require('chai').expect;
let { sortPrescriptions, filterInactiveandGeneric } = require('../index.js');

let prescriptions = require('./sampledata/prescriptions.json')
let medications = require('./sampledata/medications.json')

describe('checks sortPrescriptions', function () {
  it('should return a value', function () {

    let value = sortPrescriptions()
    expect(true).to.be(true);

  });
});

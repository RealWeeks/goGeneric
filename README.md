# goGeneric

A Node script for testing comparisons between medications and prescriptions.

Writes `output.json` in root directory.

Test with `npm test`.

Formatted as such:

```
[[
  {
    "prescription_id": "564aab7130323600032a0000",
    "ActiveGeneric": [
      {
        "id": "564aab6f30323600030c0000",
        "ndc": "000000013",
        "rxcui": "20100",
        "description": "Ibuprofen 100 MG",
        "generic": true,
        "active": true,
        "created_at": "2015-11-17T04:22:08.001Z",
        "updated_at": "2015-11-17T04:22:08.001Z"
      }
    ]
  },
  {
    "prescription_id": "564aab7130323600032b0000",
    "ActiveGeneric": [
      {
        "id": "564aab703032360003180000",
        "ndc": "000000025",
        "rxcui": "04010",
        "description": "Bupropion 10 MG",
        "generic": true,
        "active": true,
        "created_at": "2015-11-17T04:22:08.683Z",
        "updated_at": "2015-11-17T04:22:08.683Z"
      }
    ]
  },

  ...

]
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node 8.12 reccomended (7.6+ is required).
NPM (comes packaged with Node).


### Installing

Install depencencies

```
npm i
```

## Deployment

``` bash
node index.js
```

## Testing

``` bash
npm test
```

## Built With
* [axios](https://github.com/axios/axios) - HTTP Client
* [chai](https://www.chaijs.com/api/bdd/) - Assertion Library
* [mocha](https://mochajs.org/) - Javascript Test Framework

## Contributing

PRs completely welcome.

## Authors

* **Jason Weeks**


## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

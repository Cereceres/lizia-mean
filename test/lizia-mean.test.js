const assert = require('assert');

const liziaMean = require('../lizia');

describe('lizia-mean : ', () => {
  it('should export a function', () => {
    assert(typeof liziaMean === 'function');
  });

  it('should return a array', (done) => {
    liziaMean([],1,1,(err, clusters) => {
      assert(Array.isArray(clusters))
      done()
    })
  });

  it('should calculate the clusters from a set of data', (done) => {
    const data = []
    for (var i = 0; i < 14; i++) {
      data.push(Math.random() * 100);
    }
    const numClusters = 3
    liziaMean(data, 2, numClusters, (err, res) =>{
      assert(!err)
      console.log(res)
      assert(res.length === 2 * numClusters)
      done()
    });
  });
});

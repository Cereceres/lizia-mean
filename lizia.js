const assert = require('assert');

const getReducer = (numData, dim) => (cluster, datum, index) => {
  cluster[index % dim] = cluster[index % dim] || 0;
  cluster[index % dim] += datum / numData;
  return cluster;
};

const getReducerDistance = (datum_2) => (__distance__, dat, index) => {
  return __distance__ + (dat - datum_2[index]) * (dat - datum_2[index]);
};

const getRandomClusters = (data, dim, numClusters) => {
  const numData = Math.floor(data.length / dim);
  const clusters = [];
  const indexes = new Set();
  for (var i = 0; indexes.size !== numClusters; i++) {
    const whichData = Math.floor(Math.random() * numData) * dim;
    const cluster = data.slice(whichData, whichData + dim);
    if (!indexes.has(whichData)) {
      indexes.add(whichData);
      clusters.push(cluster);
    }
  }
  return clusters;
};

const getClusters = (original, dim) => {
  const clusters = [];
  let cluster = [];
  for (let i = 0; i < original.length; i++) {
    if (!original[i]) original[i] = [];
    const numData = original[i].length / dim;
    const reducer = getReducer(numData, dim);
    cluster = original[i].reduce(reducer, []);
    clusters.push(cluster);
  }
  return clusters;
};

const getDistance = (datum_1, datum_2) => {
  const reducerDistance = getReducerDistance(datum_2);
  const distance = Math.sqrt(datum_1.reduce(reducerDistance, 0));
  return distance;
};

const getWhichCluster = (clusters) => (datum) => {
  let cluster = 0;
  let distanceMin = getDistance(datum, clusters[0]);
  for (var i = 1; i < clusters.length; i++) {
    const distance = getDistance(datum, clusters[i]);
    if (distance < distanceMin) {
      cluster = i;
      distanceMin = distance;
    }
  }
  return cluster;
};

const clusterChange = (original, news) => {
  try {
    assert.deepEqual(original, news);
    return false;
  } catch (error) {
    return true;
  }
};

const getClustersFromData = (data = [], dim = 1, numClusters = 1, original = [], cb) => {
  let clusters = [];
  const clusterArray = [];
  try {
    if (typeof original === 'function' && !cb) {
      cb = original;
      original = [];
    }

    if (typeof cb !== 'function') return;

    if (!original.length) clusters = getRandomClusters(data, dim, numClusters);
    else clusters = getClusters(original, dim);

    const whichCluster = getWhichCluster(clusters);
    let datum;

    for (var i = 0; i < data.length; i = i + dim) {
      clusterArray[i % numClusters] = clusterArray[i % numClusters] || [];
      if (i % dim === 0) {
        datum = data.slice(i, i + dim);
        const whichIndex = whichCluster(datum);
        clusterArray[whichIndex] = clusterArray[whichIndex] || [];
        clusterArray[whichIndex] = clusterArray[whichIndex].concat(datum);
      }
    }
    if (clusterChange(original, clusterArray)) return process.nextTick(getClustersFromData, data, dim, numClusters, clusterArray, cb);
  } catch (error) {
    return process.nextTick(cb, error, null);
  }
  process.nextTick(cb, null, clusterArray.concat(clusters));
};

module.exports = getClustersFromData;

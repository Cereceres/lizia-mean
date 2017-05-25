# Lizia-Mean

Module to do k-mean, the name is for mu daughter.


# Install 

```shell
npm install --save lizia-mean
```

# Usage 

```js
const data = []
for (var i = 0; i < 14; i++) {
    data.push(Math.random() * 100);
}
const numClusters = 3
const dimensionOfData = 2
liziaMean(data, dimensionOfData, numClusters, (err, res) =>{
    assert(!err)
    console.log(res) //
    //[ [ 21.672581545034355,82.8807639797754,3.0398765040111186,86.22060990515324,14.972637199388107,29.470920608244388 ], ---> first data set for first cluster
    //  [ 69.6786270515767,77.68125002201222,81.88591660486652,68.21144589843846 ], ---> second data set for second cluster
    //  [ 93.62190126831484,8.198630669876295,57.3976252265612,17.733821853873664 ], ---> third data set for third cluster
    //  [ 13.228365082811194, 66.19076483105766 ], ---> first cluster
    //  [ 75.78227182822161, 72.94634796022534 ], ---> second cluster
    //  [ 75.50976324743803, 12.96622626187498 ] ---> third cluster
    // ]
});

```

# API  lizia-mean(data = [], dim = 1, numClusters = 1, cb) -> Array

    data = [
           x_1, x_2, x_dim,
           ... ,
           ... ,
           x_Nx(dim-1),.., x_Nxdim
           ] // data are parsed by dim value

    dimensionOfData = number to do parse the data array

    numClusters = number of cluster to calculate

    cb = callback called with error and response.

    response = [
      data_set_1,  // data set inside of cluster 1
      data_set_2,
      ...,
      data_set_numClusters,
      cluster_1, // coords of cluster 1
      cluster_2,
      ...,
      cluster_data_set_numClusters
    ]

    data_set_n = [
        y_1, y_2, y_dim,
           ... ,
           ... ,
        y_kx(dim-1),.., y_kxdim
    ]

    with k the number of data in cluster n.
    cluster_n = [z_1, z_2, ... , z_dim]




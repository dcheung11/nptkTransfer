
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */

/* eslint-disable no-plusplus */
export function getMax(data, tag) {
  let big = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i][tag] > big) {
      big = data[i][tag];
    }
  }
  return big;
}

export function transformData(data) {
  // console.log('data', data);

  let ADD_TO_VALUE = false;
  const taxonomyIndexNums = {
    species: 0,
    genus: 1,
    family: 2,
    order: 3,
    class: 4,
    phylum: 5,
    kingdom: 6,
  };
  const taxonomyIndexNums2 = {
    kingdom: 0,
    phylum: 1,
    class: 2,
    order: 3,
    family: 4,
    genus: 5,
    species: 6,
    strain: 7,
  };
  const taxonomyLevelNames = [
    'species',
    'genus',
    'family',
    'order',
    'class',
    'phylum',
    'kingdom',
  ];
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  function isNotInData(level, dataList, strain) {
    let x = true;
    dataList.forEach(dict => {
      if (dict.name === strain[level]) {
        x = false;
      }
    });

    return x;
  }

  function getChildren(level, dataList, strain) {
    let child;
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].name === strain[level]) {
        if (ADD_TO_VALUE === true) {
          dataList[i].value++;
          dataList[i].size++;
          if (dataList[i].value++ > 500) {
            dataList[i].value = 500;
          }
        }
        child = dataList[i].children;
      }
    }
    return child;
  }

  function getTarget(level, dataList, depth, strain) {
    const ind = 6;
    let childrenList = getChildren(level[ind], dataList, strain);
    for (let i = ind - 1; i > depth; i -= 1) {
      childrenList = getChildren(level[i], childrenList, strain);
    }
    ADD_TO_VALUE = false;
    return childrenList;
  }

  function getDataToAdd(dict, depth) {
    let i = 0;
    let temp = dict;
    while (i < depth) {
      temp = temp.children[0];
      i += 1;
    }
    return temp;
  }

  const jsonList = [];

  data.forEach(strain => {
    const strainData = {};
    Object.keys(strain).forEach(tag => {
      strainData[tag] = strain[tag];
    });
    delete strainData.kingdom;
    delete strainData.phylum;
    delete strainData.class;
    delete strainData.order;
    delete strainData.family;
    delete strainData.genus;
    delete strainData.species;
    delete strainData.strain;
    if (strainData.itemStyle) {
      delete strainData.itemStyle;
    }

    for (let i = 0; i < taxonomyLevelNames.length; i++) {
      if (strain[taxonomyLevelNames[i]] === null) {
        strain[taxonomyLevelNames[i]] = 'null';
      }
    }

    const strainJson = {
      value: 1,
      size: 1,

      name: strain.kingdom,
      children: [
        {
          value: 1,
          size: 1,

          name: strain.phylum,
          children: [
            {
              value: 1,
              size: 1,

              name: strain.class,
              children: [
                {
                  value: 1,
                  size: 1,

                  name: strain.order,
                  children: [
                    {
                      value: 1,
                      size: 1,

                      name: strain.family,
                      children: [
                        {
                          value: 1,
                          size: 1,

                          name: strain.genus,
                          children: [
                            {
                              value: 1,
                              size: 1,

                              name: strain.species,
                              children: [
                                {
                                  value: 1,
                                  size: 1,

                                  itemStyle: strain.itemStyle,
                                  name: strain.strain,
                                  info: strainData,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    // if (isNotInData(getKeyByValue(taxonomyIndexNums2, 0), jsonList, strain)) {
    //   jsonList.push(strainJson);
    // }
    // for (let i = 1; i < 8; i++) {
    //   if (
    //     isNotInData(
    //       getKeyByValue(taxonomyIndexNums2, i),
    //       getTarget(taxonomyLevelNames, jsonList, 5 - i, strain),
    //       strain,
    //     )
    //   ) {
    //     const nestedDataToAdd = getDataToAdd(strainJson, i + 1);
    //     const insertDataLocation = getTarget(
    //       taxonomyLevelNames,
    //       jsonList,
    //       5 - i,
    //       strain,
    //     );
    //     console.log('a', insertDataLocation);
    //     insertDataLocation.push(nestedDataToAdd);
    //   }
    // }

    if (isNotInData(getKeyByValue(taxonomyIndexNums2, 0), jsonList, strain)) {
      jsonList.push(strainJson);
    } else if (
      isNotInData(
        'phylum',
        getTarget(
          taxonomyLevelNames,
          jsonList,
          taxonomyIndexNums.phylum,
          strain,
        ),
        strain,
      )
    ) {
      const nestedDataToAdd = getDataToAdd(strainJson, 1);
      ADD_TO_VALUE = true;
      const insertDataLocation = getTarget(
        taxonomyLevelNames,
        jsonList,
        taxonomyIndexNums.phylum,
        strain,
      );
      insertDataLocation.push(nestedDataToAdd);
    } else if (
      isNotInData(
        'class',
        getTarget(
          taxonomyLevelNames,
          jsonList,
          taxonomyIndexNums.class,
          strain,
        ),
        strain,
      )
    ) {
      const nestedDataToAdd = getDataToAdd(strainJson, 2);
      ADD_TO_VALUE = true;
      const insertDataLocation = getTarget(
        taxonomyLevelNames,
        jsonList,
        taxonomyIndexNums.class,
        strain,
      );
      insertDataLocation.push(nestedDataToAdd);
    } else if (
      isNotInData(
        'order',
        getTarget(
          taxonomyLevelNames,
          jsonList,
          taxonomyIndexNums.order,
          strain,
        ),
        strain,
      )
    ) {
      const nestedDataToAdd = getDataToAdd(strainJson, 3);
      ADD_TO_VALUE = true;
      const insertDataLocation = getTarget(
        taxonomyLevelNames,
        jsonList,
        taxonomyIndexNums.order,
        strain,
      );
      insertDataLocation.push(nestedDataToAdd);
    } else if (
      isNotInData(
        'family',
        getTarget(
          taxonomyLevelNames,
          jsonList,
          taxonomyIndexNums.family,
          strain,
        ),
        strain,
      )
    ) {
      const nestedDataToAdd = getDataToAdd(strainJson, 4);
      ADD_TO_VALUE = true;
      const insertDataLocation = getTarget(
        taxonomyLevelNames,
        jsonList,
        taxonomyIndexNums.family,
        strain,
      );
      insertDataLocation.push(nestedDataToAdd);
    } else if (
      isNotInData(
        'genus',
        getTarget(
          taxonomyLevelNames,
          jsonList,
          taxonomyIndexNums.genus,
          strain,
        ),
        strain,
      )
    ) {
      const nestedDataToAdd = getDataToAdd(strainJson, 5);
      ADD_TO_VALUE = true;
      const insertDataLocation = getTarget(
        taxonomyLevelNames,
        jsonList,
        taxonomyIndexNums.genus,
        strain,
      );
      insertDataLocation.push(nestedDataToAdd);
    } else if (
      isNotInData(
        'species',
        getTarget(
          taxonomyLevelNames,
          jsonList,
          taxonomyIndexNums.species,
          strain,
        ),
        strain,
      )
    ) {
      const nestedDataToAdd = getDataToAdd(strainJson, 6);
      ADD_TO_VALUE = true;
      const insertDataLocation = getTarget(
        taxonomyLevelNames,
        jsonList,
        taxonomyIndexNums.species,
        strain,
      );
      insertDataLocation.push(nestedDataToAdd);
    } else {
      const nestedDataToAdd = getDataToAdd(strainJson, 7);
      ADD_TO_VALUE = true;
      const insertDataLocation = getTarget(
        taxonomyLevelNames,
        jsonList,
        -1,
        strain,
      );
      insertDataLocation.push(nestedDataToAdd);
    }
  });
  return jsonList;
}

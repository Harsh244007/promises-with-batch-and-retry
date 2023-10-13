function someApiCallWithPromise(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data % 2 === 0) resolve(data);
      else reject(data);
    }, 1000);
  });
}

async function callTheApi(data) {
  const promiseToSendForFetch = [];
  const apiResponse = [];
  for (let dataItems of data) {
    promiseToSendForFetch.push(someApiCallWithPromise(dataItems));
  }
  return Promise.allSettled(promiseToSendForFetch).then((resolvedData) => {
    return resolvedData;
  });
}

async function mainGateWay() {
  try {
    const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const batchSize = 3;
    const handleCache = {};
    let completedItems = 0;
    while (data.length > completedItems) {
      const batchData = data.slice(completedItems, batchSize + completedItems);
      await callTheApi(batchData)
        .then((resolveItems) => {
          for (let items of resolveItems) {
            if (items.status === "rejected") {
              if (handleCache[items.reason]) {
                if (handleCache[items.reason].count >= 3) {
                  handleCache[items.reason].count++;
                  console.log("retry", handleCache);
                }
              } else {
                handleCache[items.reason] = { value: items.reason, count: 0 };
                console.log(items, handleCache, "new items");
                callTheApi(handleCache[items.reason].value);
                //handle retry
              }
              //   console.log("reject items", items);
            } else {
              //   console.log(items, "resolved items with ", completedItems);
            }
          }
        })
        .catch((e) => {
          console.log(e, "error items");
        });
      completedItems += batchData.length;
    }
  } catch (e) {
    console.log("error in answer1", e);
  }
}
mainGateWay();

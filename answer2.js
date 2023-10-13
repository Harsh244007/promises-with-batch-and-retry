function someApiCallWithPromise(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

async function callTheApi(data) {
  const promiseToSendForFetch = [];
  const apiResponse = [];
  for (let dataItems of data) {
    promiseToSendForFetch.push(someApiCallWithPromise(dataItems));
  }
  await Promise.all(promiseToSendForFetch).then((resolvedData)=>{
    apiResponse.push(resolvedData)
  })
  return apiResponse;
}

async function mainGateWay() {
  try {
    const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const batchSize = 3;
    let completedItems = 0;
    while (data.length > completedItems) {
      const batchData = data.slice(completedItems, batchSize + completedItems);
      await callTheApi(batchData).then((resolveItems) => {
        console.log(resolveItems, "resolve items with ", completedItems);
        completedItems += batchData.length;
      });
    }
  } catch (e) {
    console.log("error in answer1", e);
  }
}
mainGateWay();

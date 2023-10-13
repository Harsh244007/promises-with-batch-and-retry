function someApiCallWithPromise(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

async function callTheApi(data) {
  const apiResponse = [];
  const promiseToSendForFetch = [];
  for (let dataItems of data) {
    promiseToSendForFetch.push(someApiCallWithPromise(dataItems));
  }
  await Promise.all(promiseToSendForFetch).then((response) => {
    apiResponse.push(response);
  });
  return apiResponse;
}

async function mainGateWay() {
  try {
    const data = ["1", "2", "3", "4", "5"];
    const responseAfterApi = await callTheApi(data).then((resolveItems) => {
      console.log(resolveItems);
    });
  } catch (e) {
    console.log("error in answer1");
  }
}
mainGateWay();

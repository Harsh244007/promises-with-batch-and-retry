function someApiCallWithPromise(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

async function callTheApi(data) {
  const apiResponse = [];
  for (let dataItems of data) {
    apiResponse.push(await someApiCallWithPromise(dataItems));
  }
  return apiResponse;
}

function mainGateWay() {
  const data = ["1", "2", "3", "4", "5"];
  const responseAfterApi = callTheApi(data);
  console.log(responseAfterApi, "question");
}
mainGateWay();


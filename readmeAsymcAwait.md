activate() {
    // return a Promise that will resolve when the repos have
    // been loaded and sorted by star count.
    return this.http.get(reposUrl)
      .then(response => {
        this.repos = response.content
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
      });
  }
}



async activate() {
  let response = await this.http.get(reposUrl);
  this.repos = response.content
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

https://www.danyow.net/es7-async-await-with-aurelia/




async/await
      https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9

      const makeRequest = () =>
  getJSON()
    .then(data => {
      console.log(data)
      return "done"
    })
==
makeRequest()
const makeRequest = async () => {
  console.log(await getJSON())
  return "done"
}

makeRequest()
==
// this will not work in top level
// await makeRequest()

// this will work
makeRequest().then((result) => {
  // do something
})
===
const makeRequest = () => {
  try {
    getJSON()
      .then(result => {
        // this parse may fail
        const data = JSON.parse(result)
        console.log(data)
      })
      // uncomment this block to handle asynchronous errors
      // .catch((err) => {
      //   console.log(err)
      // })
  } catch (err) {
    console.log(err)
  }
}
const makeRequest = async () => {
  try {
    // this parse may fail
    const data = JSON.parse(await getJSON())
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
======
const makeRequest = () => {
  return getJSON()
    .then(data => {
      if (data.needsAnotherRequest) {
        return makeAnotherRequest(data)
          .then(moreData => {
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}
const makeRequest = async () => {
  const data = await getJSON()
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data    
  }
}
===========
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      // do something
      return promise2(value1)
        .then(value2 => {
          // do something          
          return promise3(value1, value2)
        })
    })
}

const makeRequest = () => {
  return promise1()
    .then(value1 => {
      // do something
      return Promise.all([value1, promise2(value1)])
    })
    .then(([value1, value2]) => {
      // do something          
      return promise3(value1, value2)
    })
}
const makeRequest = async () => {
  const value1 = await promise1()
  const value2 = await promise2(value1)
  return promise3(value1, value2)
}

=========5
const makeRequest = () => {
  return callAPromise()
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => {
      throw new Error("oops");
    })
}

makeRequest()
  .catch(err => {
    console.log(err);
    // output
    // Error: oops at callAPromise.then.then.then.then.then (index.js:8:13)
  })
  const makeRequest = async () => {
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  throw new Error("oops");
}

makeRequest()
  .catch(err => {
    console.log(err);
    // output
    // Error: oops at makeRequest (index.js:7:9)
  })
https://ilikekillnerds.com/2016/06/using-asyncawait-aurelia/
https://www.danyow.net/es7-async-await-with-aurelia/
  ////////// from aurelia
      // const fetchSomething = () => new Promise((resolve) => {
    //     setTimeout(() => resolve('future value'), 500);
    //   });
      
    //   async function asyncFunction() {
    //     const result = await fetchSomething(); // returns promise
      
    //     // waits for promise and uses promise result
    //     return result + ' 2';
    //   }
      
    //   asyncFunction().then(result => console.log(result));
  let foo = async(function () {
          
            nextavail = await(getNextNo())
           
            return nextavail
        })
  var getNextNo = async(function () {
            // console.log('======getNextNo: ');
            return new Promise(function (resolve, reject) {
                let qrystr4 = util.format(`SELECT  GEN_ID(  "GEN_ScanPayments_ID",1 ) na FROM RDB$DATABASE`);
                //  firebird.database().execute(qrystr4, function (err, results) {
                //     await(firebird.database().query(qrystr4, function (err, results) {
                await(Firebird.attach(options, function (err, db) {
                    if (err)
                        //  throw err;
                        console.log('errDB ', err) //[0].id);
                    // db = DATABASE
                    db.query(qrystr4, function (err, results) {
                        db.detach();
                        if (err) {
                            //  throw err;
                            console.log('err ', err)
                        } else {
                            console.log('=1=====getNextNo::_:: ', results[0])
                            nextaa = results[0]
                            //  console.log('=2=====nextaa::_:: ', nextaa.NA)  //na.low_)
                            console.log('=3=====getNextNo::_:: ', results[0].NA)  //na.low_)
                            resolve(results[0].NA)// .low_)
                        }
                    })



                }))


            })
        })
 
 
 

document.querySelector('button').addEventListener('click',search)

function search(click){
    // let searchName = document.querySelector('input').value
    // alert(searchName) 
    fetch("https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json")
        .then(res => res.json())
        .then(data =>{  
            // console.log(data)
            let searchRep = data.filter((x,i) => x.representative === "Hon. Virginia Foxx")
            console.log(searchRep)
            // document.querySelector('.representative').innerText = searchRep[0].representative
            // document.querySelector('.ticker').innerText = data[0].asset_description
            // document.querySelector('.capitalGains').innerText = data[0].cap_gains_over_200_usd
            // document.querySelector('.stockTransactions').innerText = data[0].amount   
            // document.querySelector('.type').innerText = data[0].type  
            // document.querySelector('.date').innerText = data[0].transaction_date   
        })
        .catch(err =>{
            console.log(`error ${err}`)
    }) 
}

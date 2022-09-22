// house stock transactions over $50K

fetch("https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json")
.then(res => res.json())
.then(data =>{  
    let twentytwoTransactors = data.filter((x,i) => x.cap_gains_over_200_usd == true && 
    (x.disclosure_year=== 2022 || x.disclosure_year == 2021) && 
    (x.amount !== "$1,001 - $15,000" && x.amount !== "$15,001 - $50,000"))
    console.log(twentytwoTransactors)
})
.catch(err =>{
    console.log(`error ${err}`)
}) 


// search by representative

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

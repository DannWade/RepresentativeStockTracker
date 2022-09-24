
// house stock transactions over $50K printed to the DOM

fetch("https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json")
.then(res => res.json())
.then(data =>{  
    let twentytwoTransactors = data.filter((x,i) => x.cap_gains_over_200_usd == true && 
    (x.disclosure_year=== 2022 || x.disclosure_year == 2021) && 
    (x.amount !== "$1,001 - $15,000" && x.amount !== "$15,001 - $50,000"))
    console.log(twentytwoTransactors)
    twentytwoTransactors.forEach(element => {
        let year = element.disclosure_year
        let capGains = element.cap_gains_over_200_usd
        let rep = element.representative
        let asset = element.asset_description
        let district = element.district
        let amount = element.amount
        let ul = document.querySelector(".list")
        ul.insertAdjacentHTML('beforeend',`<li>-------------------------------</li>`)
        ul.insertAdjacentHTML('beforeend',`<li>Representative: ${rep}</li>`)
        ul.insertAdjacentHTML('beforeend',`<li>District: ${district}</li>`)
        ul.insertAdjacentHTML('beforeend',`<li>Asset: ${asset}</li>`)
        ul.insertAdjacentHTML('beforeend',`<li>Amount: ${amount}</li>`)
        ul.insertAdjacentHTML('beforeend',`<li>Year: ${year}</li>`)
    });
})
.catch(err =>{
    console.log(`error ${err}`)
}) 


// district drop down menu

fetch("https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json")
.then(res => res.json())
.then(data =>{  
    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }
    let districts = []
    data.forEach((x,i) => districts.push(x.district))
    let newdistricts = removeDuplicates(districts)
    let sortedDistricts = newdistricts.sort((a,b)=> a>b?1:-1)
    console.log(sortedDistricts)
    let dropdown = document.querySelector('.districtList')
    sortedDistricts.forEach(element => dropdown.insertAdjacentHTML('beforeend',`<option value=${element}>${element}</option>`))
})
.catch(err =>{
    console.log(`error ${err}`)
}) 

//change selection 
function getSelectedValue(){
    let districtSelect = document.querySelector('.districtList').value
    fetch("https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json")
.then(res => res.json())
.then(data =>{  
    let reps = data.filter((x,i) => data[i].district == districtSelect)
    console.log(reps)
    let repTrans = document.querySelector('.districtRepTransactionsList')

    //remove previous li - see MDN for .removeChild for source code
    let element = document.querySelector('.districtRepTransactionsList');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
}
    //input li from using data from array
    reps.forEach((x) =>{
        let year = x.disclosure_year
        let capGains = x.cap_gains_over_200_usd
        let rep = x.representative
        let asset = x.asset_description
        let district = x.district
        let amount = x.amount
        let type = x.type
        let date = x.transaction_date
        repTrans.insertAdjacentHTML('beforeend',`<li>-------------------------------</li>`)
        repTrans.insertAdjacentHTML('beforeend',`<li>Representative: ${rep}</li>`)
        repTrans.insertAdjacentHTML('beforeend',`<li>District: ${district}</li>`)
        repTrans.insertAdjacentHTML('beforeend',`<li>Asset: ${asset}</li>`)
        repTrans.insertAdjacentHTML('beforeend',`<li>Amount: ${amount}</li>`)
        repTrans.insertAdjacentHTML('beforeend',`<li>Year: ${year}</li>`)
        repTrans.insertAdjacentHTML('beforeend',`<li>Cap Gains Over $200?: ${capGains}</li>`)
        repTrans.insertAdjacentHTML('beforeend',`<li>Transaction Type: ${type}</li>`)
        repTrans.insertAdjacentHTML('beforeend',`<li>Transaction Date: ${date}</li>`)
    })
    
    })
.catch(err =>{
    console.log(`error ${err}`)
    }) 
}



let conURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".chageRate");
// console.log(btn.innerText)
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for(let select of dropDowns){

    for(Curcodes in countryList){
    // console.log(codes, countryList[codes]);
        let newOption = document.createElement("option");
        newOption.innerText= Curcodes;
        newOption.value = Curcodes;
        select.append(newOption);    
        if(select.name ==="from" && Curcodes==="USD"){
            newOption.selected = "selected";
        }else if(select.name ==="to" && Curcodes==="INR"){
            newOption.selected = "selected";   
        }

    }
    select.addEventListener("change" , (eve) =>{
        updateFlag(eve.target);
        // console.log(eve.target.value);
    })

}

const updateFlag = (ele) =>{
    let currCode = ele.value;
    // console.log(ele.value);
    let cuntryCode = countryList[currCode];
    let updateSrc = `https://flagsapi.com/${cuntryCode}/flat/64.png`
    let image = ele.parentElement.querySelector('img');
    image.src = updateSrc;  
}


// btn.addEventListener("click", async (eve) =>{
//     eve.preventDefault();
    
    
// })

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let val = amount.value;
    if(val==="" || val < 1){
        val = 1;
        amount.value="1";
    }
    // console.log(fromCurr,toCurr);
    let URL = `${conURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let responce = await fetch(URL);
    let data = await  responce.json();
    let rate = data[toCurr.value.toLowerCase()];
    // console.log(rate);
    let finalResult = rate * val;

    msg.innerText = `${val} ${fromCurr.value} ${finalResult} ${toCurr.value}`;

}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
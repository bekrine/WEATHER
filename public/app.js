

// getdata

getcountry()

async function getdata(item){
    const response= await fetch(`/weather/${item}`)
    const data = await response.json()
    
    const{temp_c,humidity}=data.current
    const {text}=data.current.condition
    const name=data.location.name
    const lati=data.location.lat 
    const long=data.location.lon 
    const info={
        text:text
        ,temp_c:temp_c
        ,humidity:humidity
        ,name:name,
        lati:lati,
        long:long
    }
    displyinfo(info)
    mark(info)

}

async function getcountry(){
    const countrys =[]
     const response= await fetch('/country')
    const data_country = await response.json()
    const datas=data_country.data
    const array=Object.values(datas)

    array.forEach(item=>{
        countrys.push(item.country)
    })
 displycountry(countrys)

}

 

// display info


function displycountry(countrys){
  let array= countrys.map(item=>{
        item=`  
            <option value="${item}">${item}</option>
             `
             return item
    }).join('')
    document.getElementById('country').innerHTML=array
   const selected=document.getElementById('country')
   selected.addEventListener('change',(e)=>{
       const item=e.target.value
        getdata(item)
     
   })
   
}

function displyinfo(info){
  const div=document.querySelector(".info")
   const inputs=div.querySelectorAll('input')
   
       inputs[0].value=info.name
       inputs[1].value=`${info.temp_c}°`
       inputs[2].value=info.text
       inputs[3].value=info.humidity
   
   

}

//leaflet  
const map = L.map('map').setView([0, 0],4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
function mark(info){
  
    L.marker([info.lati, info.long]).addTo(map)
    
    .bindPopup(`capital city:${info.name}.<br> temptur : ${info.temp_c}°.`)
    .openPopup();
}

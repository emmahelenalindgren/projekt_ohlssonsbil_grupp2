const
	cars = document.getElementsByClassName("eachCar"),
    dateBtn = document.getElementById("dateBtn");
var br = '<br />';
addClickListenersToAllCars();

//Hitta-bil-knappen. Får ut värde på valt datum
dateBtn.addEventListener("click", (e)=>{
    var dateSelect = document.getElementById("dateSelect");
    var date = dateSelect.value;
    console.log("date" + date);
});

//lägger till clickevent till varje bils bokaknapp
function addClickListenersToAllCars(){
	for(let i = 0; i < cars.length; i++){
		cars[i].addEventListener("click", bookCar);
	}
}

//funktionen för att boka bilen. Vi hämtar valda datumet från localstorage, iom
//att sidan laddas om. skickar datum och bilens id till routes. 

function bookCar(e){
    e.preventDefault();
    document.getElementById("dateSelect").value = localStorage.getItem("serverDate");
	let date = document.getElementById("dateSelect").value;
    let carID = e.target.parentNode.attributes["data-id"].value;
	fetch(`/update/?bookedDate=${date}&id=${carID}`)
	.then((response)=>{
		console.log("skickar till routern" + response);
	})
	.catch((err)=>{console.log(err);});
}

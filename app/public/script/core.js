if(document.getElementById("date")){
    let myDate = new Date();
    let todaysDate = myDate.toDateString();
    document.querySelector('#date').innerHTML = 'Today is ' + todaysDate;

    const dateClass = document.getElementById("date");
    dateClass.classList.add("date");

    let newPara = document.createElement('p');
    newPara.textContent = "Hello GWNYS members!";

    let sectionElement = document.querySelector('section');
    sectionElement.parentNode.insertBefore(newPara, sectionElement);
    newPara.classList.add('newpara')



    let newList = document.createElement('li');
    newList.classList.add("newList")
    newList.textContent = "Helps improve blood circulation"


    let articleElement = document.querySelector('main article ul');
    articleElement.insertBefore(newList, articleElement.lastElementChild);
    articleElement.removeChild(articleElement.lastElementChild)
}

let hamburger = document.getElementById("hamburger");

hamburger.addEventListener('click', function(){ 
    document.querySelector('nav ul').classList.toggle('shownav');
});



if(document.getElementById("myForm")){
    let myForm = document.getElementById("myForm");
    let myName = document.getElementById("name");
    let myEmail = document.getElementById("email");
    let mySubmission = document.getElementById("subject");
    let confirmMessage = document.getElementById("confirmMessage");

    myForm.addEventListener("submit", (e)=>{
        e.preventDefault();   
        confirmMessage.textContent=`Hi ${myName.value}, your message has been received, we will contact you at ${myEmail.value}`;
    });
}

if(document.getElementById("schedule")){
    let mySchedule = document.getElementById("schedule");
    let localJsonFile = "/data/data.json";
    let sectionElement = document.querySelector('section');

    document.addEventListener('DOMContentLoaded', ()=>{
        fetch(localJsonFile)
        .then(response => response.json())
        .then (responseData =>{ console.log(responseData);
            for (item of responseData){
                const schedule = document.createElement("article");
                const imageElement = document.createElement("img");
                const level4heading = document.createElement("h4");
                const para1 = document.createElement("p");
                const para2 = document.createElement("p");
                const para3 = document.createElement("p");
                const para4 = document.createElement("p");

                schedule.classList.add("services");

                sectionElement.appendChild(schedule)
                imageElement.src = item.imageURL;
                imageElement.alt = item.alt;
                schedule.appendChild(imageElement);

                level4heading.textContent = item.style;
                schedule.appendChild(level4heading);

                para1.textContent = item.time;
                schedule.appendChild(para1);

                para2.textContent = item.focus;
                schedule.appendChild(para2);

                para3.textContent = item.benefits;
                schedule.appendChild(para3);

                para4.textContent = item.level;
                schedule.appendChild(para4);

                
            }  
        })
        .catch(error => console.error("Error fetching JSON data:", error));
    })
}

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


    let articleElement = document.querySelector("main article ul");
    articleElement.insertBefore(newList, articleElement.lastElementChild);
    articleElement.removeChild(articleElement.lastElementChild)
}

//NAV BAR CODE
if(document.getElementById("nav-menu-container")){
    document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu-container");

    hamburger.addEventListener("click", function() { 
        navMenu.classList.toggle("active");
    });
    });

    function navBarFix(checkWindowSize){
        if (checkWindowSize.matches){
            let navMenu = document.getElementById("nav-menu-container");
            navMenu.classList.remove("active");
        }
    }

    var checkWindowSize = window.matchMedia("(min-width: 786px)")
    navBarFix(checkWindowSize);
    checkWindowSize.addEventListener("change", function(){
        navBarFix(checkWindowSize);
    });
}

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

// Fetches JSON and makes articles for team page
if(document.getElementById("team-section")){
    let teamJSON = "/data/team.json";
    let teamSection = document.querySelector('section');

    document.addEventListener('DOMContentLoaded', ()=>{
        fetch(teamJSON)
            .then(result => result.json())
            .then (resultData =>{ console.log(resultData);
            for (item of resultData){
                const teamArticles = document.createElement("article");
                const pictureElement = document.createElement("img");
                const nameHeading = document.createElement("h3");
                const roleHeading = document.createElement("h4");
                const bioPara = document.createElement("p");
                const respPara = document.createElement("p");

                teamArticles.classList.add("team");

                teamSection.appendChild(teamArticles)
                pictureElement.src = item.image;
                pictureElement.alt = item.alt;
                teamArticles.appendChild(pictureElement);

                nameHeading.textContent = item.name;
                teamArticles.appendChild(nameHeading);

                roleHeading.textContent = item.role;
                teamArticles.appendChild(roleHeading);

                bioPara.textContent = item.bio;
                teamArticles.appendChild(bioPara);

                respPara.textContent = item.resp;
                teamArticles.appendChild(respPara);
            }
        })
        .catch(error => console.error("Error fetching JSON data:", error));
    })
}

// Fetches JSON and makes articles for index hero element
if(document.getElementById("hero")){
    let JSON = "/data/hero.json";
    let Section = document.querySelector('section');

    document.addEventListener('DOMContentLoaded', ()=>{
        fetch(JSON)
            .then(result => result.json())
            .then (resultData =>{ console.log(resultData);
            for (item of resultData){
                const Articles = document.createElement("article");
                const pictureElement = document.createElement("img");
                const Heading = document.createElement("h1");
                const Para = document.createElement("p");
                const Button = document.createElement("button");

                Articles.classList.add("hero");

                Section.appendChild(Articles)
                pictureElement.src = item.image;
                pictureElement.alt = item.alt;
                Articles.appendChild(pictureElement);

                Heading.textContent = item.h1;
                Articles.appendChild(Heading);

                Para.textContent = item.para;
                Articles.appendChild(Para);

                Button.textContent = item.button;
                Articles.appendChild(Button);

                Button.addEventListener('click', () => {
                    window.location.href = item["button-link"];
                });
            }
        })
        .catch(error => console.error("Error fetching JSON data:", error));
    })
}
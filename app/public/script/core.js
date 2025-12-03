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
                Button.classList.add("index-btn");

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

const cardContainer = document.getElementById("dynamic-goals-container");

if(cardContainer){
    const jsonPath = "/data/index-cards.json";

    document.addEventListener('DOMContentLoaded', () => {
        fetch(jsonPath)
            .then(result => result.json())
            .then(resultData => { 
                
                resultData.forEach(item => {
                    const card = document.createElement("a");
                    card.classList.add("card");
                    card.href = item.link; // Matches JSON "link"

                    const imgWrapper = document.createElement("div");
                    imgWrapper.classList.add("card-image");

                    const imgElement = document.createElement("img");
                    imgElement.src = item.imageURL;
                    imgElement.alt = item.alt;
                    
                    imgWrapper.appendChild(imgElement);

                    const contentWrapper = document.createElement("div");
                    contentWrapper.classList.add("card-content");

                    const heading = document.createElement("h2");
                    heading.textContent = item.h2; // Matches JSON "h2"

                    const paragraph = document.createElement("p");
                    paragraph.textContent = item.p; // Matches JSON "p"

                    const fakeButton = document.createElement("span");
                    fakeButton.classList.add("card-btn");
                    fakeButton.innerHTML = "Read More...";

                    // Append text elements to the content wrapper
                    contentWrapper.appendChild(heading);
                    contentWrapper.appendChild(paragraph);
                    contentWrapper.appendChild(fakeButton);

                    card.appendChild(imgWrapper);
                    card.appendChild(contentWrapper);

                    cardContainer.appendChild(card);
                });
            })
            .catch(error => console.error("Error fetching JSON data:", error));
    });
}

// Fetch JSON and build the Goals section dynamically
if (document.getElementById("water-section")) {

    const fileJSON = "/data/cleanWater.json";
    const waterSection = document.getElementById("water-section");
    const titleH1 = document.getElementById("water-title");
    const subtitleH2 = document.getElementById("water-subtitle");

    document.addEventListener("DOMContentLoaded", () => {

        fetch(fileJSON)
            .then(res => res.json())
            .then(data => {
                const waterData = data[0];
                titleH1.textContent = waterData.h1;
                subtitleH2.textContent = waterData.h2;

                const cleanWaterDiv = document.createElement("p");
                cleanWaterDiv.classList.add("water-description1");
                cleanWaterDiv.textContent = waterData.description_1;

                const cleanWaterDiv2 = document.createElement("p");
                cleanWaterDiv2.classList.add("water-description2");
                cleanWaterDiv2.textContent = waterData.description_2;

                const cleanWaterDiv3 = document.createElement("p");
                cleanWaterDiv3.classList.add("water-description3");
                cleanWaterDiv3.textContent = waterData.description_3;

                waterSection.appendChild(cleanWaterDiv);
                waterSection.appendChild(cleanWaterDiv2);
                waterSection.appendChild(cleanWaterDiv3);

            })
            //catch errors with json fetch
            .catch(err => console.error("Error loading JSON:", err));
    });
}

// Fetch JSON and build the Goals section dynamically
if (document.getElementById("goals-section")) {

    const fileJSON = "/data/goals.json";
    const goalsSection = document.getElementById("goals-section");
    const titleH1 = document.getElementById("goal-title");
    const subtitleH2 = document.getElementById("goal-subtitle");

    document.addEventListener("DOMContentLoaded", () => {

        fetch(fileJSON)
            .then(res => res.json())
            .then(data => {

                const goals = data[0];
                titleH1.textContent = goals.h1;
                subtitleH2.textContent = goals.h2;

                // Loop 3 times to create goal divs
                for (let i = 1; i <= 3; i++) {

                    const goalDiv = document.createElement("div");
                    goalDiv.classList.add("goal");

                    const innerDiv = document.createElement("div");
                    innerDiv.classList.add("goal-inner");

                    const heading = document.createElement("h3");
                    heading.classList.add("goal-h3");
                    heading.textContent = goals[`h3_${i}`];

                    const img = document.createElement("img");
                    img.classList.add("goal-images");
                    img.src = goals[`image_${i}`];
                    img.alt = goals[`alt_${i}`];

                    const Button = document.createElement("button");
                    Button.classList.add("goal-button");

                    const buttonText = goals[`button_${i}`] || goals.button || 'Learn more';
                    let buttonLink = goals[`button-link_${i}`] || goals[`button-link-${i}`] || goals['button-link'] || null;

                    innerDiv.appendChild(heading);
                    innerDiv.appendChild(img);
                    goalDiv.appendChild(innerDiv);

                    Button.textContent = buttonText;
                    goalDiv.appendChild(Button);
                    if (i === 1) {
                        Button.addEventListener('click', () => {
                            window.location.href = "/cleanWater";
                        });
                    } else if (i === 2) {
                        Button.addEventListener('click', () => {
                            window.location.href = "/climateAction";
                        });
                    }
                    else if (i === 3) {
                        Button.addEventListener('click', () => {
                            window.location.href = "/cleanEnergy";
                        });
                    }
                    goalsSection.appendChild(goalDiv);
                }

            })
            //catch errors with json fetch
            .catch(err => console.error("Error loading JSON:", err));
    });
}
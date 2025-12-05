function getRoute(key) {
    if (typeof SITE_ROUTES !== 'undefined' && SITE_ROUTES[key]) {
        return SITE_ROUTES[key];
    }
    console.warn(`Route key "${key}" not found in SITE_ROUTES.`);
    return '#';
}

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

if(document.getElementById("subscribeForm")){
    let subscribeForm = document.getElementById("subscribeForm");
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let userEmail = document.getElementById("userEmail");
    let userSubmission = document.getElementById("userSubmission");
    let confirmMessage = document.getElementById("confirmMessage");

    document.addEventListener("DOMContentLoaded", () => {
        fetch('/content.json')
            .then(response => response.json())
            .then(data => {
                document.querySelector('h2').textContent = data.pageTitle;
                document.querySelector('label[for="firstName"]').textContent = data.firstNameLabel;
                // ... apply other text ...
            });
    });

    subscribeForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const formBody = {
            firstName:firstName.value,
            lastName:lastName.value,
            userEmail:userEmail.value,
            userSubmission:userSubmission.value
        };
        const requestHeaders = {
            "Content-Type": "application/json"
        }
        fetch('/subscribe',{
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify(formBody)
            })
            .then(response => response.json())
            .then((responseData) => {
                console.log(responseData);
                confirmMessage.textContent=`Hi ${firstName.value}, your message has been received, we will contact you at ${userEmail.value}`;
            })
        
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
            .then (resultData =>{
            for (const item of resultData){
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

                const routeKey = item["button-link"];

                const finalUrl = getRoute(routeKey);

                Button.addEventListener('click', () => {
                    window.location.href = finalUrl;
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
                    const routeKey = item.link;
                    card.href = getRoute(routeKey); // Matches JSON "link"

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
                    fakeButton.textContent = item.fakeButtonText;

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

                for (let i = 1; i <= 3; i++) {
                    const para = document.createElement("p");
                    para.classList.add("water-description", `water-description${i}`);
                    para.textContent = waterData[`description_${i}`];
                    waterSection.appendChild(para);
                }

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

                    innerDiv.appendChild(heading);
                    innerDiv.appendChild(img);
                    goalDiv.appendChild(innerDiv);

                    const Button = document.createElement("button");
                    Button.classList.add("goal-button");

                    const buttonText = goals[`button_${i}`] || goals.button || 'Learn more';
                    let routeKey = goals[`button-link-${i}`];

                    const finalUrl = SITE_ROUTES[routeKey] || '#'; 

                    Button.textContent = buttonText;
                    Button.addEventListener('click', () => {
                        window.location.href = finalUrl;
                    });
                    
                    goalDiv.appendChild(Button);
                    goalsSection.appendChild(goalDiv);
                }

            })
            //catch errors with json fetch
            .catch(err => console.error("Error loading JSON:", err));
    });
}
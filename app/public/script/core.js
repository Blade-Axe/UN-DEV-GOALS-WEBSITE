function getRoute(key) {
    if (typeof SITE_ROUTES !== 'undefined' && SITE_ROUTES[key]) {
        return SITE_ROUTES[key];
    }
    console.warn(`Route key "${key}" not found in SITE_ROUTES.`);
    return '#';
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

    var checkWindowSize = window.matchMedia("(min-width: 820px)")
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
        fetch('/data/subscribe.json') // Make sure this path matches where you saved the JSON file
        .then(response => response.json())
        .then(data => {
            document.getElementById('pageTitle').textContent = data.pageTitle;
            document.getElementById('formLegend').textContent = data.legend;
            document.querySelector('label[for="firstName"]').textContent = data.firstNameLabel;
            document.getElementById('firstName').placeholder = data.firstNameInnerLabel;
            document.querySelector('label[for="lastName"]').textContent = data.lastNameLabel;
            document.getElementById('lastName').placeholder = data.lastNameInnerLabel;
            document.querySelector('label[for="userEmail"]').textContent = data.emailLabel;
            document.getElementById('userEmail').placeholder = data.emailInnerLabel;
            document.querySelector('label[for="userSubmission"]').textContent = data.userSubmission;
            document.getElementById('userSubmission').placeholder = data.userSubmissionInnerLabel;

            document.getElementById('submitBtn').value = data.submitBtn; // For buttons, use .value
            document.getElementById('reqFieldLabel').textContent = data.requiredFieldLabel;
        })
        .catch(error => console.error('Error loading content:', error));
        
    });

    subscribeForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const finalUrl = subscribeForm.getAttribute('action');
        
        const formBody = {
            firstName:firstName.value,
            lastName:lastName.value,
            userEmail:userEmail.value,
            userSubmission:userSubmission.value
        };
        const requestHeaders = {
            "Content-Type": "application/json"
        }
        fetch(finalUrl,{
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(formBody)
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok){
                const error = new Error(data.message || "Form Submission failed");
                error.data = data;
                throw error;
            }
            return data;
        })
        .then((responseData) => {
            console.log(responseData);
            confirmMessage.textContent=`Hi ${firstName.value}, your message has been received, we will contact you at ${userEmail.value}`;
            subscribeForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.data && error.data.errors){
                const errorMessages = error.data.errors.map(err => err.msg).join(", ");
                confirmMessage.textContent = `Error: ${errorMessages}`;
                confirmMessage.style.color = "red";
            }
            else{
                confirmMessage.textContent = "There was an error submitting your form.";
            }
        });
    });
};

// Fetch JSON and build the water section dynamically
if (document.getElementById("water-section")) {

    const fileJSON = "/data/cleanWater.json";
    const waterSection = document.getElementById("water-section");
    const titleH1 = document.getElementById("water-title");
    const waterContainer = document.getElementById("water-container");
    const subtitleH2 = document.getElementById("water-subtitle");
    const button = document.getElementById('back-button')

    document.addEventListener("DOMContentLoaded", () => {

        fetch(fileJSON)
            .then(res => res.json())
            .then(data => {
                const waterData = data[0];
                titleH1.textContent = waterData.h1;
                

                const img = document.createElement("img");
                img.classList.add("water-image");
                img.src = waterData.image;
                img.alt = waterData.alt;
                waterContainer.appendChild(img);

                button.textContent = waterData.button

                subtitleH2.textContent = waterData.h2;

                for (let i = 1; i <= 6; i++) {
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

// Fetch JSON and build the climate section dynamically
if (document.getElementById("climate-section")) {

    const fileJSON = "/data/climateAction.json";
    const climateSection = document.getElementById("climate-section");
    const titleH1 = document.getElementById("climate-title");
    const climateContainer = document.getElementById("climate-container");
    const subtitleH2 = document.getElementById("climate-subtitle");
    const button = document.getElementById('back-button')

    document.addEventListener("DOMContentLoaded", () => {

        fetch(fileJSON)
            .then(res => res.json())
            .then(data => {
                const climateData = data[0];
                titleH1.textContent = climateData.h1;
                

                const img = document.createElement("img");
                img.classList.add("climate-image");
                img.src = climateData.image;
                img.alt = climateData.alt;
                climateContainer.appendChild(img);

                button.textContent = climateData.button

                subtitleH2.textContent = climateData.h2;

                for (let i = 1; i <= 5; i++) {
                    const para = document.createElement("p");
                    para.classList.add("climate-description", `climate-description${i}`);
                    para.textContent = climateData[`description_${i}`];
                    climateSection.appendChild(para);
                }

            })
            //catch errors with json fetch
            .catch(err => console.error("Error loading JSON:", err));
    });
}

// Fetch JSON and build the energy section dynamically
if (document.getElementById("energy-section")) {

    const fileJSON = "/data/cleanEnergy.json";
    const energySection = document.getElementById("energy-section");
    const titleH1 = document.getElementById("energy-title");
    const energyContainer = document.getElementById("energy-container");
    const subtitleH2 = document.getElementById("energy-subtitle");
    const button = document.getElementById('back-button')

    document.addEventListener("DOMContentLoaded", () => {

        fetch(fileJSON)
            .then(res => res.json())
            .then(data => {
                const energyData = data[0];
                titleH1.textContent = energyData.h1;
                

                const img = document.createElement("img");
                img.classList.add("energy-image");
                img.src = energyData.image;
                img.alt = energyData.alt;
                energyContainer.appendChild(img);

                button.textContent = energyData.button

                subtitleH2.textContent = energyData.h2;

                for (let i = 1; i <= 5; i++) {
                    const para = document.createElement("p");
                    para.classList.add("energy-description", `energy-description${i}`);
                    para.textContent = energyData[`description_${i}`];
                    energySection.appendChild(para);
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

                    const buttonText = goals[`button_${i}`] || goals.button;
                    let routeKey = goals[`button-link-${i}`];

                    const finalUrl = SITE_ROUTES[routeKey]; 

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
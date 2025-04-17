const COHORT = "2502-FTB-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`

// State

const state = {
    parties: [],
};
const partyList = document.querySelector("#partyList")
const partyForm = document.querySelector("#partyForm")
partyForm.addEventListener("submit", addParty);
partyList.addEventListener("click", deleteParty);

// Updates the state with new party from the API and renders
async function getParty() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        console.log(json.data);
        
        state.parties = json.data;
        console.log(json.data);
        
    } catch (error) {
        console.error(error);
    }
}

async function render() {
    await getParty();
    console.log(state.parties);
    
    renderPartyList();
}
render();
// Handle form submission
async function addParty(event) {
    event.preventDefault();
    
    const name = document.querySelector("#name").value
    const date = new Date(document.querySelector("#date").value);
    const location = document.querySelector("#location").value
    const description = document.querySelector("#description");
    
    const newParty = {
        name,
        date,
        location,
        description,
    }
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(party)
        });
        const json = await response.json();
        console.log(json.data);
        // Add new party to the list
        renderParty(json.data);
        // Clears form
        partyForm.reset();
        }catch (error) {
        console.error(error);   
    }  
}
// Delete's a Party
async function deleteParty(event) {
    if (event.target.classList.contains("delete-button")) {
        const partyId = event.target.dataset.partyId;
        console.log(partyId);
        
        // Send a DELETE request to remove party
        try {
            await fetch(`${API_URL}/${partyId}` , {
                method: "DELETE",
            });
        } catch (error) {
           console.error(error); 
        }
        
    }
}
// Render the Party List
function renderPartyList() {
    state.parties.forEach((party) => {
        renderParty(party);
    });
}
// Renders a party item
function renderParty(party) {
    const li = document.createElement("li")
    li.innerHTML = ` 
    <strong>${party.name}</strong><br>
    Date: ${new Date(party.date).toLocaleDateString()}<br>
    Location: ${party.location}<br>
    Description: ${party.description}<br>
    <button class="delete-button" data-party-id="${
    party.id
    }">Delete</button>
    `;
    partyList.appendChild(li);
}


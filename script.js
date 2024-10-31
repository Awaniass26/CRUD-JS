let users = [];
let editIndex = -1;

const userForm = document.getElementById('userForm');
const prenomInput = document.getElementById('prenom');
const nomInput = document.getElementById('nom');
const adresseInput = document.getElementById('adresse');
const telephoneInput = document.getElementById('telephone');
const userTable = document.getElementById('userTable');


function addPersonnes() {
    userTable.innerHTML = '';
    users.forEach((user, index) => {
        const row = `<tr> 
                        <td>${index + 1}</td>  <!-- Display user ID -->
                        <td>${user.prenom}</td>
                        <td>${user.nom}</td>
                        <td>${user.adresse}</td>
                        <td>${user.telephone}</td>
                        <td style="display: flex; gap: 10px;">
                            <button onclick="editUser(${index})">Modifier</button>
                            <button onclick="deleteUser(${index})">Supprimer</button>
                        </td>
                    </tr>`;
        userTable.innerHTML += row;
    });
}

userForm.onsubmit = function(event){
    event.preventDefault();

    const prenom = prenomInput.value;
    const nom = nomInput.value;
    const adresse = adresseInput.value;
    const telephone = telephoneInput.value;

    if(editIndex === -1){
        users.push({ prenom, nom, adresse, telephone });
    } else {
        users[editIndex] = { prenom, nom, adresse, telephone };
        editIndex = -1;
    }

    userForm.reset();
    addPersonnes();
}

function editUser(index) {
    const user = users[index];
    prenomInput.value = user.prenom;
    nomInput.value = user.nom;  // Correctly assign nom to the corresponding input
    adresseInput.value = user.adresse;
    telephoneInput.value = user.telephone;

    editIndex = index; 
}

function deleteUser(index) {
    users.splice(index, 1); 
    addPersonnes();
}


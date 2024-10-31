/* The line `let categories = JSON.parse(localStorage.getItem('categories')) || [];` is retrieving the
value stored in the 'categories' key from the localStorage. */
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let editIndex = new URLSearchParams(window.location.search).get('editIndex');

/* These lines of code are selecting specific elements from the HTML document using their IDs: */
const cateForm = document.getElementById('cateForm');
const cateTable = document.getElementById('cateTable');
const libelleInput = document.getElementById('libelle');
const libelleError = document.getElementById('libelleError');

function addCategories() {
    cateTable.innerHTML = '';
    categories.forEach((categorie, index) => {
        const row = `
            <tr> 
                <td>${index + 1}</td>  
                <td>${categorie.libelle}</td>
                <td>
                    <button onclick="editCategorie(${index})">Modifier</button>
                    <button onclick="deleteCategorie(${index})">Supprimer</button>
                </td>
            </tr>`;
        cateTable.innerHTML += row;
    });
}


if (!libelleError) {
    console.error("Erreur : Certains éléments d'erreur ne sont pas trouvés.");
}

if (editIndex !== null && !isNaN(editIndex) && categories[editIndex]) {
    let categorie = categories[editIndex];
    libelleInput.value = categorie.libelle; // Accéder à libelle
} else if (editIndex !== null) {
    console.error("La catégorie n'existe pas à l'index donné :", editIndex);
}


function validateField(field, errorElement, message) {
    if (field.value.trim() === '') {
        field.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.style.display = 'block'; // Afficher le message
        return false;
    } else {
        field.classList.remove('invalid');
        errorElement.textContent = '';
        errorElement.style.display = 'none'; // Masquer le message

        return true;
    }
}

cateForm.onsubmit = function(event){
    event.preventDefault();

    const isLibelleValid = validateField(libelleInput, libelleError, "Le libellé est obligatoire");
    if (isLibelleValid) {
    const libelle = libelleInput.value;
   
    const categorie = { libelle };

    if (editIndex === null || isNaN(editIndex)) {
        categories.push(categorie);
    } else {
        categories[editIndex] = categorie;
        editIndex = null;
    }

    localStorage.setItem('categories', JSON.stringify(categories));

    cateForm.reset();

    addCategories();
    }
}

function deleteCategorie(index) {
    if (index >= 0 && index < categories.length) {
        categories.splice(index, 1); // Supprimer la catégorie
        localStorage.setItem('categories', JSON.stringify(categories)); // Enregistrer dans le localStorage
        addCategories(); // Mettre à jour l'affichage
    } else {
        console.error("Index invalide pour la suppression :", index);
    }
}

function editCategorie(index) {
    if (index >= 0 && index < categories.length) {
        editIndex = index; // Mettre à jour l'index d'édition
        libelleInput.value = categories[index].libelle; // Remplir le champ avec la valeur de la catégorie
        document.getElementById('submitButton').textContent = "Modifier Catégorie"; // Changer le texte du bouton
    } else {
        console.error("Index invalide pour l'édition :", index);
    }
}

addCategories();



// script.js
document.querySelectorAll('.menu > li').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            dropdown.style.display = 'block';
        }
    });

    item.addEventListener('mouseleave', () => {
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    });
});













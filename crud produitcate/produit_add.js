let produits = JSON.parse(localStorage.getItem('produits')) || [];
let editIndex = new URLSearchParams(window.location.search).get('editIndex');


const produitForm = document.getElementById('produitForm');
const produitTable = document.getElementById('produitTable');
const libelleInput = document.getElementById('libelle');
const quantite_de_stockInput = document.getElementById('quantite_de_stock');
const prixInput = document.getElementById('prix');
const date_expirationInput = document.getElementById('date_expiration');
const categorieInput = document.getElementById('categorie');
const submitButton = document.getElementById('submitButton'); 

const libelleError = document.getElementById('libelleError');
const quantite_de_stockError = document.getElementById('quantite_de_stockError');
const prixError = document.getElementById('prixError');
const date_expirationError = document.getElementById('date_expirationError');
const categorieError = document.getElementById('categorieError');

if (!libelleError || !quantite_de_stockError || !prixError || !date_expirationError || !categorieError) {
    console.error("Erreur : Certains éléments d'erreur ne sont pas trouvés.");
}

// Si l'index existe dans l'URL, on est en mode modification
if (editIndex !== null) {
    editIndex = parseInt(editIndex, 10);
    const produit = produits[editIndex];

    // Pré-remplir les champs du formulaire
    libelleInput.value = produit.libelle;
    quantite_de_stockInput.value = produit.quantite_de_stock;
    prixInput.value = produit.prix;
    date_expirationInput.value = produit.date_expiration;
    categorieInput.value = produit.categorie;

    // Changer le texte du bouton pour "Modifier Produit"
    submitButton.textContent = "Modifier Produit";
}

// Fonction pour valider un champ et ajouter la classe "invalid" s'il est vide
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

// Fonction pour ajouter ou modifier un produit
produitForm.onsubmit = function(event){
    event.preventDefault();

    const isLibelleValid = validateField(libelleInput, libelleError, "Le libellé est obligatoire");
    const isQuantite_de_stockValid = validateField(quantite_de_stockInput, quantite_de_stockError, "La quantite de stock est obligatoire");
    const isPrixValid = validateField(prixInput , prixError, "Le prix est obligatoire");
    const isDate_expirationValid = validateField(date_expirationInput , date_expirationError, "La date d'expiration est obligatoire");
    const isCategorieValid = validateField(categorieInput , categorieError, "La categorie est obligatoire");
    
    if (isLibelleValid && isQuantite_de_stockValid && isPrixValid && isDate_expirationValid && isCategorieValid) {
    const libelle = libelleInput.value;
    const quantite_de_stock = quantite_de_stockInput.value;
    const prix = prixInput.value;
    const date_expiration = date_expirationInput.value;
    const categorie = categorieInput.value;
    
    

    const produit = { libelle, quantite_de_stock, prix, date_expiration, categorie };

    if (editIndex === null || isNaN(editIndex)) {
        // Mode ajout
        produits.push(produit);
    } else {
        // Mode modification
        produits[editIndex] = produit;
        editIndex = null;
    }

    // Enregistrer les produits dans le localStorage
    localStorage.setItem('produits', JSON.stringify(produits));

    // Réinitialiser le formulaire
    produitForm.reset();

    // Rediriger vers la liste des produits
    window.location.href = 'produit_list.html';
    }
}

function redirectToForm(index) {
    if (index < 0 || index >= produits.length) {
        console.error("Index de produit non valide :", index);
        return;
    }
    const produit = produits[index];

    // Remplir le formulaire avec les données du produit sélectionné
    libelleInput.value = produit.libelle;
    quantiteInput.value = produit.quantite_de_stock;
    prixInput.value = produit.prix;
    dateInput.value = produit.date_expiration;
    categorieInput.value = produit.categorie;

    // Mettre l'index dans une variable globale pour savoir qu'on est en mode modification
    editIndex = index;

    // Changer le texte du bouton de soumission pour "Modifier Produit"
    submitButton.textContent = "Modifier Produit";
}


















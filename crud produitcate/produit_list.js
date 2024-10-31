let produits = JSON.parse(localStorage.getItem('produits')) || [];
let editIndex = -1;

const produitTable = document.getElementById('produitTable');


// Fonction pour afficher la liste des produits
function addProduits() {
    produitTable.innerHTML = '';
    produits.forEach((produit, index) => {
        const row = `
            <tr> 
                <td>${index + 1}</td>  
                <td>${produit.libelle}</td>
                <td>${produit.quantite_de_stock}</td>
                <td>${produit.prix}</td>
                <td>${produit.date_expiration}</td>
                <td>${getCategorieLabel(produit.categorie)}</td>
                <td>
                    <button onclick="redirectToForm(${index})">Modifier</button>
                    <button onclick="deleteProduit(${index})">Supprimer</button>
                </td>
            </tr>`;
        produitTable.innerHTML += row;
    });
}

// Fonction pour récupérer le label de la catégorie (à personnaliser selon vos catégories)
function getCategorieLabel(categorieId) {
    const categories = {
        1: "Catégorie 1",
        2: "Catégorie 2",
    };
    return categories[categorieId] || "Inconnue";
}

// Fonction pour supprimer un produit
function deleteProduit(index) {
    produits.splice(index, 1);
    localStorage.setItem('produits', JSON.stringify(produits));

    // Appeler la fonction pour afficher les produits
    addProduits();
}




function redirectToForm(index) {
    window.location.href = `produit_add.html?editIndex=${index}`;
}


// Appeler la fonction pour afficher les produits au chargement
addProduits();








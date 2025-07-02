let editMode = false;
const ADMIN_PASSWORD = "BlueStoneAdmin2025";

document.getElementById('admin-shield').addEventListener('click', () => {
    if (editMode) return;
    
    const password = prompt("Inserisci la password amministratore:");
    if (password === ADMIN_PASSWORD) {
        editMode = true;
        activateEditMode();
    } else {
        alert("Password errata!");
    }
});

function activateEditMode() {
    // Mostra il pulsante di salvataggio
    const saveButton = document.createElement('button');
    saveButton.id = 'save-button';
    saveButton.textContent = 'Salva Pagina';
    saveButton.addEventListener('click', savePage);
    document.body.appendChild(saveButton);
    document.getElementById('save-button').style.display = 'block';

    // Abilita modifica testi
    document.querySelectorAll('h1, h2, p').forEach(element => {
        element.contentEditable = true;
        element.classList.add('editable');
        element.addEventListener('click', e => e.stopPropagation());
    });

    // Abilita modifica immagini
    document.querySelectorAll('.editable-image').forEach(img => {
        img.addEventListener('click', () => {
            const newSrc = prompt("Incolla il nuovo URL dell'immagine:");
            if (newSrc) img.src = newSrc;
        });
    });
}

function savePage() {
    const content = `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blue-stone-edited.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
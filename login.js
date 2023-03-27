/** @type {HTMLFormElement} */
const form = document.getElementById('form');


form.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(form);
    const p1 = data.get('p1'), p2 = data.get('p2');
    if (p1 && p2) console.log('TODO', p1, p2);
    else {
        alert('enter name');
        return;
    }
});

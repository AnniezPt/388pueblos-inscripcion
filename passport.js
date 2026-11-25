(() => {
  const key = '388p:pasaporte-personal-v1';
  const form = document.querySelector('#passport-form');
  const editor = document.querySelector('#passport-editor');
  const nameInput = document.querySelector('#passport-name-input');
  const townInput = document.querySelector('#passport-town-input');
  const nameOutput = document.querySelector('#passport-name');
  const townOutput = document.querySelector('#passport-town');
  const message = document.querySelector('#passport-message');
  const summary = editor.querySelector('summary');
  const setCard = (name, town) => {
    nameOutput.textContent = name || 'Tu nombre';
    townOutput.textContent = town || 'Tu pueblo';
  };
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved && typeof saved.name === 'string' && typeof saved.town === 'string') {
      nameInput.value = saved.name.slice(0, 40);
      townInput.value = saved.town.slice(0, 60);
      setCard(nameInput.value, townInput.value);
      summary.textContent = 'Editar mi pasaporte';
    }
  } catch (_) { /* The form can still display the card for this visit. */ }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value.trim().slice(0, 40);
    const town = townInput.value.trim().slice(0, 60);
    if (!name || !town) {
      message.textContent = 'Escribe tu nombre y tu pueblo para guardar el pasaporte.';
      return;
    }
    setCard(name, town);
    try {
      localStorage.setItem(key, JSON.stringify({name, town}));
      summary.textContent = 'Editar mi pasaporte';
      message.textContent = 'Tu pasaporte está guardado en este navegador.';
    } catch (_) {
      message.textContent = 'No se ha podido guardar en este navegador; se mostrará solo durante esta visita.';
    }
  });
})();

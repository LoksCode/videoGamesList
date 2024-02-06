const startGameAddButton = document.querySelector('header button');
const addGameModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddGameBtn = addGameModal.querySelector('.btn--passive');
const confirmAddGameBtn = cancelAddGameBtn.nextElementSibling;
const userInputs = addGameModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const listRoot = document.getElementById('game-list');
const deleteGameModal = document.getElementById('delete-modal');

const games = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const cancelGameDeletion = () => {
  deleteGameModal.classList.remove('visible');
  toggleBackdrop();
};

const deleteGame = (gameId) => {
  let identifiedIndex = 0;
  for (const game of games) {
    if (game.id === gameId) {
      break;
    }
    identifiedIndex++;
  }
  listRoot.children[identifiedIndex].remove();
  games.splice(identifiedIndex, 1);
  cancelGameDeletion();
  updateUI();
};

const startDeletionGameHandler = (gameId) => {
  deleteGameModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeletionBtn = deleteGameModal.querySelector('.btn--passive');
  let confirmDeletionBtn = deleteGameModal.querySelector('.btn--danger');
  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));

  confirmDeletionBtn = deleteGameModal.querySelector('.btn--danger');

  cancelDeletionBtn.removeEventListener('click', cancelGameDeletion);
  cancelDeletionBtn.addEventListener('click', cancelGameDeletion);

  confirmDeletionBtn.addEventListener('click', deleteGame.bind(null, gameId));
};

const renderNewGameElement = (id, title, imageUrl, rating, description) => {
  const newGameElement = document.createElement('li');
  newGameElement.className = 'game-element';
  newGameElement.innerHTML = `
  <div class="game-element__image">
    <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="game-element__info">
    <h2>${title}</h2>
    <h3>${rating}/5 stars </h3>
    <p>${description}</p>
  </div>
  `;
  newGameElement.addEventListener(
    'click',
    startDeletionGameHandler.bind(null, id)
  );
  listRoot.append(newGameElement);
};

const updateUI = () => {
  if (games.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const closeGameModal = () => {
  addGameModal.classList.remove('visible');
};

const showGameModal = () => {
  addGameModal.classList.toggle('visible');
  toggleBackdrop();
};

const clearGameInputs = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};

const backDropClickHandler = () => {
  closeGameModal();
  cancelGameDeletion();
  backdrop.classList.remove('visible');
  clearGameInputs();
};

const cancelAddGameHandler = () => {
  showGameModal();
  clearGameInputs();
  updateUI();
};

const addGameHandler = () => {
  const titleValue = userInputs[0].value;
  const imageValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  const descriptionValue = userInputs[3].value;

  if (
    titleValue.trim() === '' ||
    imageValue === '' ||
    ratingValue === '' ||
    descriptionValue === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (Rating must be between 1 and 5!)');
    return;
  } else {
    const newGame = {
      id: Math.random().toString(),
      title: titleValue,
      image: imageValue,
      rating: ratingValue,
      description: descriptionValue,
    };
    games.push(newGame);
    console.log(games);
    renderNewGameElement(
      newGame.id,
      newGame.title,
      newGame.image,
      newGame.rating,
      newGame.description
    );
    updateUI();
    clearGameInputs();
    closeGameModal();
    toggleBackdrop();
  }
};

startGameAddButton.addEventListener('click', showGameModal);
backdrop.addEventListener('click', backDropClickHandler);
cancelAddGameBtn.addEventListener('click', cancelAddGameHandler);
confirmAddGameBtn.addEventListener('click', addGameHandler);

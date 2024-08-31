import { showModal } from '../render-modal/render-modal';
import './render-add-button.css';

export const renderAddButton = (element) => {

    const addButton = document.createElement('button');
    addButton.innerHTML = '+';
    addButton.classList.add('add-button');

    element.append(addButton);

    addButton.addEventListener('click', () => {
        showModal();
    });
}
import './render-buttons.css';
import usersStore from "../../store/users-store";
import { renderTable } from '../render-table/render-table';


export const renderButtons = (element) => {

    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Siguiente ->';
    const previousButton = document.createElement('button');
    previousButton.innerHTML = '<- Anterior';
    const currentPageLabel = document.createElement('label');
    currentPageLabel.id = 'currentPage';
    currentPageLabel.innerText = usersStore.getCurrentPage();


    element.append(previousButton, currentPageLabel, nextButton);

    nextButton.addEventListener('click', async() => {
        await usersStore.loadNextPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable(element);
    });

    previousButton.addEventListener('click', async() => {
        await usersStore.loadPreviousPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable(element);    
    })

}
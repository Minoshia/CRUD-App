import './render-table.css';
import usersStore from '../../store/users-store';
import { showModal } from '../render-modal/render-modal';
import { deleteUserById } from '../../use-cases/delete-user-by-id';

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
        <tr>
            <th>Id</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append (tableHeader, tableBody);
    return table;
}

const tableSelectListener = (event) => {
    const element = event.target.closest('.selected-user');
    if (!element) return;

    const id = element.getAttribute('data-id');
    showModal(id);
}

const tableDeleteListener = async(event) => {
    const element = event.target.closest('.delete-user');
    if ( !element ) return;

    const id = element.getAttribute('data-id');
    try {
        await deleteUserById(id);
        await usersStore.reloadPage();
        document.querySelector('#currentPage').innerText = usersStore.getCurrentPage();
        renderTable();
        
    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar');
    }

}

export const renderTable = (element) =>{

    const users = usersStore.getUsers();

    if (!table) {
        table = createTable();
        element.append(table);

        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);
    }

    let tableHTML = '';
    users.forEach(user => {
        tableHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.balance}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.isActive}</td>
                <td>
                    <a href="#/" class="selected-user" data-id="${user.id}">Seleccionar</a>
                    <a href="#/" class="delete-user" data-id="${user.id}">Borrar</a>
                </td>
            </tr>
        `
    });

    table.querySelector('tbody').innerHTML = tableHTML;



}
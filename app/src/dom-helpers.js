import { handleCopy, handleDelete } from './main.js'
import palettes from './palettes.json'

export const showPalettes = (palettes) => {
    // Clear the container first
    const palettesContainer = document.getElementById('palettes-container');
    palettesContainer.innerHTML = '';
    // Add each palette to the list
    Object.values(palettes).forEach(palette => addPaletteToList(palette));
};

export const addPaletteToList = (palette) => {
    // Calling the HTML elements
    const palettesContainer = document.getElementById('palettes-container');
    // Create elements
    const div = document.createElement('div');
    // Giving `class` names for styling
    div.className = 'palette';
    div.dataset.uuid = palette.uuid;

    // Setting up the palette:
    // 1. Setting up title
    const h4 = document.createElement('h4');
    h4.textContent = palette.title;
    // 2. Setting up color inputs
    const color = colorInputs(palette.colors);
    // 3. Setting up temperature `div`;
    const temperature = temperatureToDOM(palette.temperature);

    // Append all the elements to the container:
    div.append(h4, color, deleteButton(palette.uuid), temperature);
    palettesContainer.append(div);
};

const colorInputs = (colors) => {
    // Create an element
    const ul = document.createElement('ul');
    ul.className = 'colors';
    // Setting up color inputs
    colors.forEach(color => {
        // Create an element
        const div = document.createElement('div');
        const span = document.createElement('span');
        const text = document.createElement('div');
        const li = document.createElement('li');
        // Add `class` name
        div.className = 'color-container';
        text.className = 'bicolor';
        // Create a style inline for `span`, setting the background color to `color`:
        span.style.backgroundColor = color;
        // Inside the `div`, it will have `Text Example`:
        // Correct way:
        // text.innerHTML = `<font color="#ffffff">Text</font><font color="#0000"> Example</font>`;
        // Custom way:
        text.textContent = 'Text Example';
        // Create copy buttons per color
        const button = copyButton(color);
        // Append list:
        span.append(text)
        div.append(span);
        li.append(div, button);
        ul.append(li);
    });
    return ul;
};

const temperatureToDOM = (temp) => {
    const temperatureDiv = document.createElement('div');
    temperatureDiv.className = temp;
    temperatureDiv.textContent = temp;
    return temperatureDiv;
};

export const copyButton = (color) => {
    const button = document.createElement('button');
    button.className = 'copy';
    button.textContent = `Copy ${color}`;
    button.dataset.color = color;
    button.addEventListener('click', () => handleCopy(color));
    return button;
};

export const deleteButton = (uuid) => {
    const button = document.createElement('button');
    button.className = 'delete';
    button.textContent = `Delete Palette`;
    // Add the uuid to the button as a data attribute
    button.dataset.uuid = uuid;
    return button;
};
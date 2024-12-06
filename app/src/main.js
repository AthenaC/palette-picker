import './style.css'
import palettes from './palettes.json'
console.log(palettes); // It's now regular JS code!
// import { v4 as generateUUID } from 'uuid';
import { setPalettes, getPalettes, initializePalettesIfEmpty, addPalette, deleteById } from './local-storage.js'
import { showPalettes, addPaletteToList } from './dom-helpers.js'

// const newPaletteID = generateUUID();

const handleFormSubmit = (event) => {
  // Prevent default form submission (reloading the page)
  event.preventDefault();
  // Call the form
  const form = event.target;
  // Get the color input values
  const hexColors = ['color1', 'color2', 'color3'].map(id => form.querySelector(`#${id}`).value);
  // Get the values and create new palette for localStorage
  const newPalette = {
    // uuid: newPaletteID,
    uuid: crypto.randomUUID(),
    title: form.paletteTitle.value,
    colors: hexColors,
    temperature: form.temperature.value
  };
  // Add new palette to localStorage
  addPalette(newPalette);
  // Add new palette to DOM
  addPaletteToList(newPalette);
  // Reset form
  form.reset();
};

export const handleCopy = (color) => {
  // Find the button that triggered the event
  const copyButton = document.querySelector(`button.copy[data-color="${color}"]`);
  // Save the orginal button text
  const originalText = copyButton.textContent;
  // Copy color value to clipboard, if successful, `then()` block is executed:
  navigator.clipboard.writeText(color).then(() => {
    // Change the button text to indicate the color was copied
    copyButton.textContent = `${color} copied!`;
    // Set a timer for 1 second (1000 milliseconds) before reverting back to original:
    setTimeout(() => copyButton.textContent = originalText, 1000);
  });
};

export const handleDelete = (event) => {
  // Prevent any click handler issues by ensuring the target is the delete button
  if (!event.target.matches('.delete')) return;
  // Get the uuid of the palette that user wants to delete
  const uuid = event.target.dataset.uuid;
  // Temporarily change the button text to indicate deletion
  const originalText = event.target.textContent;
  event.target.textContent = 'Deleting...';
  // Set a timer for 1 second (1000 milliseconds) before reverting back to original:
  setTimeout(() => {
    event.target.textContent = originalText;
    // Find and remove the corresponding palette container
    const paletteDiv = event.target.closest('.palette');
    // Remove the palette
    if (paletteDiv) paletteDiv.remove();
    // Remove the palette from localStorage
    deleteById(uuid);
  }, 1000);
};

const main = () => {
  // Ensure default palettes are set if none are in localStorage
  initializePalettesIfEmpty();
  // Show the palettes (default or from localStorage)
  showPalettes(getPalettes());
  // Other event listeners...
  document.querySelector('form#form').addEventListener('submit', handleFormSubmit);
  document.querySelector('#palettes-container').addEventListener('click', handleDelete);
};
main();
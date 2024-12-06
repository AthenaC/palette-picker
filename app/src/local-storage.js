import palettes from './palettes.json';

// Define default palettes if none are saved in localStorage
const startingPalettes = palettes;

// This is a wrapper that automatically stringifies the value and sets it to the key
const setLocalStorageKey = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

// This is a wrapper that automatically parses the value and returns it, but also handles the errors 
// (`JSON.parse` should always be wrapped in a `try/catch` since it breaks so easily). 
// If there's an error it `console.errors` it and returns `null`
const getLocalStorageKey = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (err) {
        console.error(err);
        return null;
    };
};

export const setPalettes = (newPalettes) => {
    setLocalStorageKey('palettes', newPalettes);
};

export const getPalettes = () => {
    const storedPalettes = getLocalStorageKey('palettes');
    // Fall back to default palettes if none are stored
    return storedPalettes || startingPalettes;
};

export const initializePalettesIfEmpty = () => {
    const storedPalettes = getPalettes();
    if (!storedPalettes || Object.keys(storedPalettes).length === 0) {
        // Use the imported default palettes
        setPalettes(startingPalettes);
    };
};

export const addPalette = (newPalette) => {
    // Get existing palettes from localStorage
    const storedPalettes = getPalettes();
    // (Modified) Update by adding new palette using its uuid as the key
    storedPalettes[newPalette.uuid] = newPalette;
    // Update localStorage
    setPalettes(storedPalettes);
    return newPalette;
};

export const deleteById = (uuid) => {
    // Get the stored palette
    const storedPalettes = getPalettes();
    // Delete the palette by uuid
    delete storedPalettes[uuid];
    // Update modified palette 
    setPalettes(storedPalettes);
};


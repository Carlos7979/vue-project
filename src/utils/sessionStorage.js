// Get from localStorage

export function getFromStorage(key) {
    return JSON.parse(sessionStorage.getItem(key))
}

// Save in localStorage

export function saveInStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
}

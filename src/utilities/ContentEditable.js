// Select all input value when click
export const selectAllInlineText = (event) => {
    event.target.focus();
    // Bôi đen text trong input
    event.target.select();
}

// On keyDown
export const saveContentAfterPressEnter = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        event.target.blur();
    }
}
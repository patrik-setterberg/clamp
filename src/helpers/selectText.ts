/**
 * Selects the text content of the target element.
 *
 * @param event - The mouse event that triggered the text selection.
 */
function selectText(event: React.MouseEvent<HTMLElement>) {
    const range = document.createRange();
    range.selectNodeContents(event.currentTarget);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
}

export default selectText;

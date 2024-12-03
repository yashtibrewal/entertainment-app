
function getItemFromLocalStorage(itemName) {
    const item = localStorage.getItem(itemName);
    if(!item) {
        throw new Error('Item not found');
    }
    return item;
}


export const tokens = {
    tmdbToken : getItemFromLocalStorage('tmdbToken'),
    entertainmentAppToken: getItemFromLocalStorage('entertainmentAppToken')
}
import { getProductItemByID } from '../services/api';
export const idProduct = global.location.pathname.slice(1)

  var findIndexOfKey = function(searchKey) {
    for (var i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        if(key === searchKey)
            return i;
    }
    return -1;
}

export const getProductLocal = async () => {
    const seila = JSON.parse(localStorage.getItem('shoppingCart'));
    const actualKey = localStorage.getItem(localStorage.key(findIndexOfKey));
    const results = await getProductItemByID(actualKey);
    console.log(seila);
    console.log(results);
}




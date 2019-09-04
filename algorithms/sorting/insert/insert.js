const initialNumbers = [ 9, 12, 43, 55, 63, 45, 23, 4, 32, 5, 4, 54, 3, 5, 43, 64, 6436346, 436 ];

/** 
 * @description An insertion sort
 * @param {Array} array An array of numbers
*/
function insertSort(array) {
    for (let i = 0; i < array.length; i++) {
        const currentValue = array[i];

        for (j=i-1; j > -1 && items[j] > value; j++){
            array[j+1] = array[j];
        }

        array[j+1] = currentValue;
    }
    return array;
};

console.log(insertSort(initialNumbers));
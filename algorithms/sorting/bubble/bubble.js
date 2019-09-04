const initialNumbers = [ 9, 12, 43, 55, 63, 45, 23, 4, 32, 5, 4, 54, 3, 5, 43, 64, 6436346, 436 ];

/**
 * @description A classic method of bubblesort using do while 
 * @param {Array} array
 * @returns {Array} sorted array.
 */
const bubbleSort = ( array ) => { 
    let swapped;
    do {
        swapped = false;
        for(let i = 0; i < array.length; i++) {
            if (array[i] > array[i + 1]) {
                let temp   = array[i];
                array[i]     = array[i + 1];
                array[i + 1] = temp;
                swapped    = true;
            }
        }
    } while (swapped);
    return array;
};

console.log(bubbleSort(initialNumbers));
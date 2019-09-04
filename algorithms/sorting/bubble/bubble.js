const initialNumbers = [ 9, 12, 43, 55, 63, 45, 23, 4, 32, 5, 4, 54, 3, 5, 43, 64, 6436346, 436 ];

// classic method - do while - bubble sort
const bubbleSort1 = ( arr ) => { 
    let swapped;
    do {
        swapped = false;
        for(let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp   = arr[i];
                arr[i]     = arr[i + 1];
                arr[i + 1] = temp;
                swapped    = true;
            }
        }
    } while (swapped);
    return arr;
};
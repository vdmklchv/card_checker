// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]
const customInvalid = [3, 5, 2, 5, 6, 9, 7, 8, 2, 5, 6, 2, 6, 4, 6, 6]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]



// Add your functions below:

function reverseArray(arrayToReverse)   {
    let reversedArray = [];
    for (i = 0; i < arrayToReverse.length; i++) {
        reversedArray.unshift(arrayToReverse[i]);
    }
    return reversedArray;
}

function makeCheckingArray(inputArray)  {
    checkingArray = [];
    let intermediateArray = reverseArray(inputArray);
    let firstItem = intermediateArray[0];
    checkingArray.push(firstItem);

    for (let i = 1; i < intermediateArray.length; i++) {
        let tempVar = 0;
        if (i % 2 !== 0)    {
            tempVar = intermediateArray[i] * 2;
            tempVar > 9 ? checkingArray.push(tempVar - 9):checkingArray.push(tempVar);
        } else    {
            checkingArray.push(intermediateArray[i]);
        }
    }
    intermediateArray = reverseArray(checkingArray);
    return intermediateArray; //return correct order of previously reversed with every other number doubled; TESTED AND WORKING!!
}

function calculateSum(forSumArray)   {
    let sum = 0;
    for (let i = 0; i < forSumArray.length; i++)  {
        sum = sum + forSumArray[i];
    }
    return sum; //this function calculates sum of numbers of checking array. TESTED AND WORKING!!!
}

function validateCred(forValidateCredArray)    {
    let sumTotal = 0;
    sumTotal = calculateSum(makeCheckingArray(forValidateCredArray));
    return (sumTotal % 10) === 0 ? true:false; 
}

function findInvalidCards(nestedArray)    {
    let invalidCardsList = [];
    for (let i = 0; i < nestedArray.length; i++)    {
        if (validateCred(nestedArray[i]) !== true)    {
            invalidCardsList.push(nestedArray[i]);
        };
    };
    return invalidCardsList;    // arranges an array with all invalid cards
} 


let tempArray = findInvalidCards(batch); 


function idInvalidCardCompanies(invalidCardArray)   {
    const invalidCardCompanies = [];
    let company;
    for (i = 0; i < invalidCardArray.length; i++)   {
        switch (invalidCardArray[i][0]) {
            case 3:
                company = 'Amex';
                break;
            case 4:
                company = 'Visa';
                break;
            case 5:
                company = 'Mastercard';
                break;
            case 6:
                company = 'Discover';
                break;
            default:
                company = 'Not defined';
                break;
        }
    
    
        if (invalidCardCompanies.includes(company) === false)  {
            invalidCardCompanies.push(company);
        }
    }
    return invalidCardCompanies;            // returns a list of non-repeating emitent names
} 

function makeNumberValid(invalidCard) {
    const invalidCardArrayChecking = makeCheckingArray(invalidCard);
    const invalidSum = calculateSum(invalidCardArrayChecking);
    const correctSum = invalidSum - invalidCardArrayChecking[invalidCardArrayChecking.length - 1];
    const checkDigit = correctSum * 9 % 10;
    const fixedCard = invalidCard.slice(0, -1);
    fixedCard.push(checkDigit);
    return fixedCard; // makes incorrect number correct
}


function allCardsValid(invalidArray) {
    let correctedArray = [];
    let correctedNum = 0;
    for (let i = 0; i < invalidArray.length; i++) {
        correctedNum = makeNumberValid(invalidArray[i]);
        correctedArray.push(correctedNum);
    }
    return correctedArray;

}

console.log(allCardsValid(tempArray));



function randomArrList(count: number, arrList: object[]) {

    if (count > arrList.length) count = arrList.length;
    let selectedArr = [];
    let arr = new Set();
    for (let i = 0; i < count; i++) {
        let generatedNumber = generateNumber(0, arrList.length - 1)
        if (arr.has(generatedNumber)) {
            i--;
            continue;
        }
        arr.add(generatedNumber);
        selectedArr.push(arrList[generatedNumber])
    };
    return selectedArr;
};

const generateNumber = (min: number, max: number) => Math.round(Math.random() * (max - min)) + min;


export { randomArrList as randomArrPicker };
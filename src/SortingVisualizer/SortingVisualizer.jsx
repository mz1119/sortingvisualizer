import React from "react";
import './SortingVisualizer.css';

const ANIMATION_RATE_MS = 50;

export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            array: [],
        }
    }

    componentDidMount() {
        this.resetArray();
    }
      
    resetArray() {
        const array = [];
        for (let i = 0; i < 50; i++){
            array.push(rangedRandomInt(10,1000));
        }
        this.setState({array})
    }

    bubbleSort() {
        const array = this.state.array;
        let counter = 0;
        for (let i = 0; i < array.length; i++){
            for (let j = 0; j < array.length - i - 1; j++){
                if (array[j] > array[j+1]) {
                    const arrayBars = document.getElementsByClassName('array-bar');

                    [array[j], array[j+1]] = [array[j+1], array[j]]; //swap values in array

                    let bar1 = arrayBars[j].style;
                    let bar2 = arrayBars[j+1].style;

                    setTimeout(() => {
                        [bar1.height, bar2.height] = [bar2.height, bar1.height];
                        bar1.backgroundColor = 'red';
                        bar2.backgroundColor = 'red';
                    }, ANIMATION_RATE_MS * counter);
                    setTimeout(() => {
                        bar1.backgroundColor = 'blue';
                        bar2.backgroundColor = 'blue';
                    }, ANIMATION_RATE_MS * (counter + 1));
                    counter += 1;
                }
            }
        }
    }

    quickSort() {
        const array = this.state.array;

        quickSort(array, 0, array.length - 1, 0, 0);
        console.log(array);

        function quickSort(arr, start, end, counter) {
            if (start >= end) {
                return;
            }
            let [index, counterDummy] = partition(arr, start, end, counter);
            quickSort(arr, start, index - 1, counterDummy);
            quickSort(arr, index + 1, end, counterDummy);
        }

        function partition(arr, start, end, counter){
            let pivotIndex = start;
            let pivotValue = arr[end];

            for (let i = start; i < end; i++) {
                if (arr[i] < pivotValue) {

                    [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];

                    const arrayBars = document.getElementsByClassName('array-bar');

                    // arrayBars[end].style.backgroundColor = 'green';

                    let bar1 = arrayBars[i].style;
                    let bar2 = arrayBars[pivotIndex].style;
                    setTimeout(() => {
                        [bar1.height, bar2.height] = [bar2.height, bar1.height];
                        bar1.backgroundColor = 'red';
                        bar2.backgroundColor = 'red';
                    }, ANIMATION_RATE_MS * counter);
                    setTimeout(() => {
                        bar1.backgroundColor = 'blue';
                        bar2.backgroundColor = 'blue';
                    }, ANIMATION_RATE_MS * (counter + 1));
                    counter += 1;


                    pivotIndex++;
                }
            }
            //swap pivotindex and end
            [arr[end], arr[pivotIndex]] = [arr[pivotIndex], arr[end]];

            const arrayBars = document.getElementsByClassName('array-bar');

                    let bar1 = arrayBars[end].style;
                    let bar2 = arrayBars[pivotIndex].style;
                    setTimeout(() => {
                        [bar1.height, bar2.height] = [bar2.height, bar1.height];
                        bar1.backgroundColor = 'red';
                        bar2.backgroundColor = 'red';
                    }, ANIMATION_RATE_MS * counter);
                    setTimeout(() => {
                        bar1.backgroundColor = 'blue';
                        bar2.backgroundColor = 'blue';
                    }, ANIMATION_RATE_MS * (counter + 1));
                    counter += 1;


            return [pivotIndex, counter];
        }
    }



    render(){
        const {array} = this.state;

        return (
            <>
            <div className="button-container">
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>

            </div>
            <div className="array-container">
                {this.state.array.map((value, idx) => (
                <div
                className="array-bar"
                key={idx}
                style={{
                    backgroundColor: 'blue',
                    height: `${0.75 * value / 1000 * window.innerHeight}px`,
                }}></div>
            ))}
            </div>
            </>
          );
    }

}
//from
//https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function rangedRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
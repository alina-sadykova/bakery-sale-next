// function useState<T>(state: T): [T, (newState: T) => void] {
//   function setState(newState: T) {
//     console.log(newState);
//   }

//   return [state, setState];
// }

// const [state, setState] = useState<string | null>(null);

// setState("aksjdh");

// setState(null);

// const arr = ["hello", "world", "js", "web"];

// const result = arr.map((item) => item.length);

// function map<T, K>(
//   arr: T[],
//   callback: (element: T, index: number, array: T[]) => K
// ): K[] {
//   const newArr = [];

//   for (let i = 0; i < arr.length; i++) {
//     const callbackRes = callback(arr[i], i, arr);
//     newArr.push(callbackRes);
//   }

//   return newArr;
// }

// const result = map(arr, (item, index, array) => null);

// console.log(result);

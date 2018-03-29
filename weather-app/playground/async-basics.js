console.log('Starting App');

// Asynchronous Callback
setTimeout(() => {
   console.log('Inside of callback'); 
}, 2000);

setTimeout(() => {
    console.log('Inside second callback, no delay');
}, 0);

console.log('Finishing up');
let n = 30;
let primes = new Array(n + 1).fill(1);
primes[0] = 0; // marking 0 and 1 as a non prime number.
primes[1] = 0; 
for(let i = 2 ; i * i <= n ; i++){
    if(primes[i] === 1){
        for(let j = i * i ; j <= n ; j += i){
            primes[j] = 0;
        }
    }
}
//printing prime numbers from 2 to n
for (let i = 2; i <= n; i++) {
    if (primes[i]) console.log(i);
}


/*Sieve of Eratosthenes

The algorithm finds all prime numbers ≤ n.

Steps:
Assume all numbers are prime.
Start from 2.
Mark all multiples of each prime as not prime.
Continue until i * i ≤ n.
Time complexity: O(n * log(log n)).
Space complexity: O(n).*/

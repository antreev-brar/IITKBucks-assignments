## Assignment 5

In this Assignment we are given following inputs -
* Index
* Hash of Parent Block
* Target Value
* Path to block Body

The following code generates the timestamp and nonce ,such that the hash of Block Header is less than Target. i.e **Proof of work**

**Block Header** is 116 byte long of the following format :
* - The first 4 bytes represent an integer. This is the index of the block.
* - The next 32 bytes represent the SHA256 hash of the parent block.
* - The next 32 bytes represent the SHA256 hash of the block body.
* - The next 32 bytes represent the target value.
* - The next 8 bytes represent a 64-bit integer. This is the timestamp.
* - The next 8 bytes represent a 64-bit integer. This is the nonce value.

## Usage 

```
node blockminer.js
```

## Calculated values 

#### Input used:
- Index :5
- Hash of parent block:004a5a068f600d1503eae873a61269006429c46e4f485dba509ba31ebb7eb98f
- Target:0000000f00000000000000000000000000000000000000000000000000000000
- Block Body:015.dat

#### Example 1:
- Initial Timestamp :1590275462751902820
- Final Timestamp   :1590276798968032229
- Nonce             :321131140
- Hash              :000000089793be2f28e33c1bc8eeb52eb0957bb6fa504e2d792ffa1b263186f2
- Time taken        :1336s

#### Example 2:
- Initial Timestamp :1590302013183097032
- Final Timestamp   :1590304752491803256
- Nonce             :528390723
- Hash              :0000000d61f0a33dcbd39f4c0437d5dc40a2b4f81a9f3b86c2d63c4c7f311623
- Time taken        :2739s

#### Example 3:
- Initial Timestamp :1590303142880269939
- Final Timestamp   :1590303330348337216
- Nonce             :39429770
- Hash              :0000000c331bd18d458b441070bd5b5a9adce1eca443488fdda5304a6eeef8f0
- Time taken        :187s

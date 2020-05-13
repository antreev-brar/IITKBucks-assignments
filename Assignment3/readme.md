
### This Assignment involves taking information about a transaction from the user and generate its Hash function / Transaction ID

U can run this code by cloning the repo and using terminal command 

>node TransIDcreator.js

The transaction data is of the following form :

> <NUM_INPUTS> <INPUT_DATA> <NUM_OUTPUTS> <OUTPUT_DATA>

<NUM_INPUTS> denotes the number of < INPUT > and same goes for <NUM_OUTPUTS>

Each < INPUT > contains the following data 

* Transaction ID
* length of signature
* Signature

Each < OUTPUT > contains the following data 

* Number of coins in transaction
* path to the public key (in this case its publicKey.pem )


This code concatanates all the data into a binary array using Buffers , Finds hash of the following data (using SHA-256) and creates a new file that stores all the binary data with name 

**( hash_generated.dat)**


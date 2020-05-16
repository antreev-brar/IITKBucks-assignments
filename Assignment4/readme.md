## In this assignment we are given a binary data file (.dat) and we have to decode the following and output the information in the given format




```
Transaction ID: <in hex format>
Number of inputs: <an integer>
    Input 1:
        Transaction ID: <in hex format>
        Index: <an integer>
        Length of the signature: <an integer>
        Signature: <in hex format>
    Input 2:
        Transaction ID: <in hex format>
        Index: <an integer>
        Length of the signature: <an integer>
        Signature: <in hex format>
    ...
Number of outputs: <an integer>
    Output 1:
        Number of coins: <an integer>
        Length of public key: <an integer>
        Public key: <in PEM format>
    Output 2:
        Number of coins: <an integer>
        Length of public key: <an integer>
        Public key: <in PEM format>
    ...
```

To run the code clone the repo , reach Assignment4 dir and run the code in terminal

>node decoder.js

It will demand the path of file as input ; for now type the name of **.dat** file

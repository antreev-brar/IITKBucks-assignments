const { generateKeyPair } = require('crypto');
const fs = require('fs');
generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',

  }
}, (err, publicKey, privateKey) => {
  // Handle errors and use the generated key pair.
  if(!err) 
  { 
    // Prints new asymmetric key pair 
    console.log("Public Key is : ", publicKey); 
    fs.writeFile("publicKey.pem" ,publicKey.toString('hex') , (err) => { 
        // In case of a error throw err. 
        if (err) throw err; 
    }) 
    
    console.log(); 
    console.log("Private Key is: ", privateKey); 
    fs.writeFile("privateKey.pem" ,privateKey.toString('hex') , (err) => { 
        // In case of a error throw err. 
        if (err) throw err; 
    }) 
    
  } 
  else
  { 
    // Prints error 
    console.log("Errr is: ", err); 
  } 
});
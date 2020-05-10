This is 2nd assignment of Summer project IITkBucks.

There r three js files in the directory keygen.js , encrypt.js , and verify.js 

RSA key pairs are generated in keygen.js , and stored in privateKey.pem and publicKey.pem ,(they have already been generated but u should try urself too).
Using the private key stored in privateKey.pem , a random string of length = 20 , is converted into a digital signature(using RSA padding PSS) in encrypt.js

Verification of signature is completed in verify.js , where the public key is used to decrypt signature and verify is both decrypted and original strings are same.

-------------------------------------------------
To verify , type in the terminal -
* node verify.js

U would have to type three inputs ::
* Signature of the file (a pre generated signature is given below)
* Unencrpyted test (given along the signature)
* Path of public key ( publicKey.pem )

-------------------------------------------------

Signature generated for ("lfJ765pLb23FuZLA2HFJ")

571300f5aff03deff10b666ef51ca967cb27ddcbe5db6cb029055adea64602e1537c403307e7f5ba7e76d28d91d0ae48a3011889ad365bb6e8a3c2d4359cb8fbe83596eca795d1b7044ddbb585e7bf1dbcd18c5e57edc62c3024b8bd23905541113a422fce6b833df4f148063e81c6f606241ab60f9a34bae801764eff4de8b6072837a8e7c0a4da267a12570f77ec5042a9152e87d86916bdb7a953213d03fffb5337f8f73350717382dec4d9bb9b1d00d61b47cd37bc2561459d728252afeb3f004e03543564854a26e602a7c24c7260b20787427a6fc05fbc320f3bc436bf4c90000913583fe6f134c4c80572e0e5721020628a72fe6b902511fa3b00d11ca800eebcc31dc0ddcb2a97d1a3c7c33a663f4a148202e3816cdc7742b6380ba7966938d8474c1b3b045f60b1a4614937588b032d013c462e7135e600b2fcc77b5f83e59b44e44fa319547f2e4b6c733907179eeedb72ef7d590ef056425004a01aa1b92a0fbece0ce00d31376fcd94ff4f0c462eba0ab294e712bdb60d06d0c13722b9512024af9bf69eb2a1cc0baae03cac72579eb8ffc074a642952b0d64722b0312b567a2e8885698537207c323e37326e5b5478b8a9fcf97983d157ed2d76188cfeb1e47de8430fc205e7d6a43bb98af449a9444d5eee2769607450b0fd0adafd6bc8f0f092540e9d079ca55e370a8fe6af9c5f72aed62698003e4b9020a


Signature genrated for ("C7DQUFbc6AdQkcIxAmSU")

06b5e2bc4dd9d1d336605a40b00f7fc6cffd61bd48e2ad5b6a83c666bd5c92f53f563dbdaee54158ada0323dbbc6db1138840c78ea58df04cec2fae12b2bd821526d341bcb47cfdb072a382da4675a6602729fb8b7413db7c40e8f35af4e7196ba55a81d30493cc0213bc6f9609e43cf5a57a27c302471f86cb8753ea3f3ac1e414e097d3096f676bd508e6c557acdb775296a03f823643edc431ddf26bc3facd502060c17bca188d01655163152fd847a9c5a4c984081ce076c56ba6410c1ee05a65d60be15e667feee64262ab599e7b5ea7e8dc6393ddfe164de8dd2bdb22f2705e841635bd47305e0326bd23797fa01bae80d124a2ffbb97ec01d81f93e485f58041f7961a81ef3b0be308d7643f40b5eaa1b8c78f3fc16af04f1486783c40f1ff86a32a47df2b3e98f50877f9ad492ac799f47776c002f22e4ea2887f090859aa62303e0ee2d4e4816de381117e5e2e984c786987dd8e4d92a612d6c2ebc2fc37f7f2f74dd08c0a6c6c199183a2cbd0fb9f1e6742b6e5c173300853a775972ccddbabca8f20655ff82544fa71be58a3f4b777a9499a87cfac10e79235b5124bec34ca340a3ca14855e9097859273b653026e4874b2bef36b8d4eb558e68140ce338c4e748fae89dc461d7c0eb4142eacdd946a64bbdd6edbe035a788931a5c46e4eba7cbd3cddb4c3a9b29675447b1251054c08d36fd3da161b369ccb51d

-----------------------------------------------
Happy COding

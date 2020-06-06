
class Output {
    constructor (coins, pubkey_len, pub_key){
        this.coins = coins;
        this.pubkey_len = pubkey_len;
        this.pub_key = pub_key;
    }
}
var obj = new Output(1,"pubkey_len","pubkey");
var obj1 = new Output(2,"pubkey_len1","pubkey1");
var obj2 = new Output(3,"pubkey_len2","pubkey2");
var map1 = new Map();
map1.set([10,        "Hiello"].toString(), obj2)
map1.set([ 11  ,"Hello00"].toString() ,obj1)
map1.set([10,"Hello"].toString() , obj)
var tuple =[ 10, "Hiello" ].toString();
console.log(map1)
console.log(
    map1.get(tuple).coins
)
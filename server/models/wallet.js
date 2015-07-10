var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var chain = require('chain-wallets-node');

var WalletSchema   = new Schema({
    id: String,
    publicKey: String,
    privateKey: String
});

WalletSchema.methods.getClient() = function getClient() {
    var chainClient = new chain.Client({
      apiTokenId: '5e10baae31590dc4c80baa4a7ce4df56',
      secretApiToken: 'c195d7731cf8966556613f4294229965'
    });
    chainClient.keyStore.add(new chain.Xprv(this.privateKey, true));
}

module.exports = mongoose.model('Wallet', WalletSchema);
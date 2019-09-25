#/bin/bash
_PATH=`pwd`
#./dcd unsafe-reset-all
killall dcd
killall dccli
rm -rf ~/.ns*
./dcd unsafe-reset-all
./dcd init securekim --chain-id diachain
./dccli keys add gemologist
./dccli keys add wholesaler
./dccli keys add retailer
./dcd add-genesis-account $(./dccli keys show gemologist -a) 100nametoken,100000000stake
./dcd add-genesis-account $(./dccli keys show wholesaler -a) 1500nametoken,100000000stake
./dcd add-genesis-account $(./dccli keys show retailer -a) 1000nametoken,100000000stake
./dccli config chain-id diachain
./dccli config output json
./dccli config indent true
./dccli config trust-node true
./dcd gentx --name gemologist
./dcd collect-gentxs
./dcd validate-genesis
./dcd start

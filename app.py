from flask import Flask, render_template, request, jsonify
from web3 import Web3
import json

app = Flask(__name__)

# Connect to blockchain
alchemy_url = "https://eth-mainnet.g.alchemy.com/v2/ij0e5Ofr0PA-ikdHm4tgzOpVWzw0HWOB"
# Connect to Ethereum node using Alchemy
web3 = Web3(Web3.HTTPProvider(alchemy_url))

# Check if the connection is successful
if web3.is_connected():
    print("Successfully connected to Alchemy!")
else:
    print("Failed to connect to Alchemy.")

# Contract details
contract_address = "0xAFbfB96485663DA13D1C2E7759D397E6b438E0A5"

# Load contract ABI
with open("D:/blockchain-game/build/contracts/GameContract.json") as f:
    contract_abi = json.load(f)["abi"]
contract = web3.eth.contract(address=contract_address, abi=contract_abi)

@app.route('/')
def index():
    return render_template('index.html')  # Frontend for interacting with the game

@app.route('/build_transaction', methods=['POST'])
def build_transaction():
    data = request.get_json()
    sender_address = data['from']

    # Interact with the contract (build the transaction)
    gas_price = web3.eth.gas_price
    nonce = web3.eth.get_transaction_count(sender_address)

    tx = contract.functions.playGame().build_transaction({
        'from': sender_address,
        'value': web3.to_wei(0.01, 'ether'),
        'gas': 2000000,
        'gasPrice': gas_price,
        'nonce': nonce,
        'chainId': 1  # Mainnet (change if using testnet)
    })

    return jsonify(tx)  # Send the transaction data to the frontend to sign

if __name__ == '__main__':
    app.run(debug=True)

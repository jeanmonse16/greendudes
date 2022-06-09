import { useState, useEffect } from "react"

export const Mint = ({ title, description,address }) => {
    const [minted, setMinted] = useState({
        state: false,
        transaction: null,
        collection: null
    })
    const [error, setError] = useState(false)
    const [mintData, setMintData] = useState({
        price: '',
        supply: 0,
        max_mint: 0,
        nfts_left: 0,
        mint_quantity: 0,
        onlyPresale: null,
        canMint: true,
        nfts_minted: 0
    })
    const transactionUrl = __CHAIN__ === 'rinkeby' ? 'https://rinkeby.etherscan.io/tx/' : 'https://etherscan.io/tx/'
    const collectionUrl = __CHAIN__ === 'rinkeby' ? 'https://testnets.opensea.io/collection/' : 'https://opensea.io/collection/greendudeswtf'
    const mint = async () => {
        if (mintData.mint_quantity > 0 && mintData.mint_quantity <= Number(mintData.max_mint)) {
            setMintButton({
                text: 'Waiting for transaction...',
                handleClick: () => null
            })
            const mintTransaction = await contract.methods
              .mint(mintData.mint_quantity)
              .send({ from: address, value: Number(mintData.price) * Number(mintData.mint_quantity).toString() });
            if (mintTransaction) { 
                setMinted((prevState) => ({
                    ...prevState,
                    state: true,
                    transaction: mintTransaction.transactionHash,
                }))
            } else {
                setMintButton({
                    text: 'Mint your NFT',
                    handleClick: mint
                })
                setError(true)
            }
        }
    }
    const [mintButton, setMintButton] = useState({
        text: 'Mint your NFT',
        handleClick: mint
    })

    useEffect(() => {
        const getContractData = async () => {
            const onlyPresale = await contract.methods.onlyPresale().call()
            const supply = onlyPresale ? await contract.methods.presaleAmount().call() : await contract.methods.MAX_SUPPLY().call()
            const max_mint = onlyPresale ? await contract.methods.MAX_PRESALE_MINT().call() : await contract.methods.MAX_PUBLIC_MINT().call()
            const address_balance = onlyPresale ? await contract.methods.addressPresaleMintedBalance(address).call() : await contract.methods.addressMintedBalance(address).call()
            const price = onlyPresale ? await contract.methods.presalePrice().call() : await contract.methods.publicPrice().call()
            const nfts_minted = await contract.methods.getTotalSupply().call()
            const nfts_left = Number(supply) - Number(nfts_minted)
            setMintData(prevState => ({
                ...prevState,
                onlyPresale: onlyPresale,
                supply: supply,
                max_mint: Number(max_mint) - Number(address_balance), 
                price: price,
                nfts_left: nfts_left,
                nfts_minted,
                canMint: nfts_left > 0 && Number(max_mint) - Number(address_balance) > 0
            }))
        }
        getContractData()

    }, [])

    useEffect(() => {
        setMintButton({
            text: mintData.nfts_left > 0 ? 'Mint your NFT' : 'SOLD OUT',
            handleClick: mintData.canMint ? mint : () => null
        })
        setError(false)
    }, [mintData])

    const decreaseQuantity = () => {
        if (mintData.mint_quantity > 0)
          setMintData(prevState => ({
              ...prevState,
              mint_quantity: Number(prevState.mint_quantity - 1)
          }))
    }

    const increaseQuantity = () => {
        if (mintData.mint_quantity < Number(mintData.max_mint))
          setMintData(prevState => ({
              ...prevState,
              mint_quantity: Number(prevState.mint_quantity + 1)
          }))
    }

    const setMaxQuantity = () => {
        setMintData(prevState => ({
            ...prevState,
            mint_quantity: Number(mintData.max_mint)
        }))
    }

    function abrirNuevoTab(url) {
        // Abrir nuevo tab
        var win = window.open(url, '_blank');
        // Cambiar el foco al nuevo tab (punto opcional)
        win.focus();
      }

    if (minted.state) 
      return <>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center uppercase">Minted!</h2>
        <p className="text-center text-lg md:text-xl">Here is your transaction link!</p>
        <button onClick={() => abrirNuevoTab(transactionUrl + minted.transaction)}  className="text-md text-white rounded-full font-medium px-4 py-1 bg-black border border-white shadow-md transition-transform hover:scale-105">
            View transaction
        </button>
        <p className="text-center text-lg md:text-xl">Here is your collection link!</p>
        <button onClick={() => abrirNuevoTab(collectionUrl)} className="text-md text-white rounded-full font-medium px-4 py-1 bg-black border border-white shadow-md transition-transform hover:scale-105">
            View collection
        </button>
      </>

    return (
        <>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center uppercase">{title}</h2>
            <p className="text-center text-lg md:text-xl">{description}</p>
            <div className="flex flex-row justify-between px-5">
                <div className="flex flex-col items-center">
                    <p className="text-lg font-bold">Supply</p>
                    <span>{mintData.nfts_minted}/{mintData.supply}</span>
                </div>              
                <div className="flex flex-col items-center">
                    <p className="text-lg font-bold">Price Per Mint</p>
                    <span>{mintData.price} ETH</span>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-lg font-bold">Max</p>
                    <span>{mintData.max_mint}</span>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3 items-center bg-gray-300 rounded-full">
                    <button className="w-8 h-8 bg-black rounded-full border border-white text-white text-xl shadow-md transition-transform hover:scale-105" onClick={decreaseQuantity}>
                        -
                    </button>
                    <span className="font-bold">
                        {mintData.mint_quantity}
                    </span>
                    <button onClick={increaseQuantity} className="w-8 h-8 bg-black rounded-full border border-white text-white text-xl shadow-md transition-transform hover:scale-105">
                        +
                    </button>
                </div>
                { error && <p className="text-center text-lg md:text-xl" style={{ color:'red' }}>Minting failed. 😢 Please try again.</p> } 
                <button onClick={setMaxQuantity} className="bg-black px-4 py-1 rounded-full border border-white text-white shadow-md transition-transform hover:scale-105">
                    Set Max
                </button>
            </div>
            <div className="flex flex-row justify-between px-5">
                <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">Total</span>
                </div>                   
                <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">{mintData.price} ETH</span>
                </div>
            </div>
            <button onClick={mintButton.handleClick} className="self-center bg-black px-4 py-1 rounded-full border border-white text-white shadow-md transition-transform hover:scale-105">
                {mintButton.text}
            </button>
        </>
    )
}
import { useState, useEffect, useId } from "react"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Showcase } from "./components/Showcase"
import { Footer } from "./components/Footer"
import { Modal } from "./components/Modal"
import Web3 from 'web3'
import MetaMaskOnboarding from '@metamask/onboarding'
import { Loader } from "./components/Loader"
import { Mint } from './components/Mint';
import { MintException } from './components/MintException';

const PRESALE_HAS_NOT_STARTED = 'PRESALE_HAS_NOT_STARTED'
const PRESALE_STARTED_AND_IS_WL = 'PRESALE_STARTED_AND_IS_WL'
const PRESALE_STARTED_AND_NOT_WL = 'PRESALE_STARTED_AND_NOT_WL'
const PRESALE_STARTED_MAX = 'PRESALE_STARTED_MAX'
const PRESALE_MAX_MINT = 'PRESALE_MAX_MINT'
const PUBLIC_SALE_STARTED = 'PUBLIC_SALE_STARTED'
const COOL_OUT = 'COOL_OUT'
const PUBLIC_SALE_MAX = 'PUBLIC_SALE_MAX'
const PUBLIC_WALLET_MAX = 'PUBLIC_WALLET_MAX'
const setState = (title, description) => ({ title, description })
const mintState = {
  PRESALE_HAS_NOT_STARTED: setState('NFT Pre-Sale Coming Soon', 'We are working hard to launch the NFT Collection. Stay tuned for updates!'),
  PRESALE_STARTED_AND_IS_WL: setState('Pre-Sale Minting Open!!', "You're on the whitelist for the pre-sale! 🎉"),
  PRESALE_STARTED_AND_NOT_WL: setState("Pre-Sale Minting Open!!", "You are not whitelisted for the pre-sale... 😢"),
  PRESALE_STARTED_MAX: setState('Pre-Sale NFTs are sold out', "Wait for the public minting!"),
  PRESALE_MAX_MINT: setState("You've already claimed your whitelist mint. Thank you! 🎉", "Wait for the public minting if you want more!"),
  PUBLIC_SALE_STARTED: setState("Public Minting Open!!", "No whitelist needed. Public minting is now open! 🎉"),
  COOL_OUT: setState('Public Minting coming soon', "what green dude will you get?"),
  PUBLIC_SALE_MAX: setState('NFTs are sold out!', "Join our Community for updates"),
  PUBLIC_WALLET_MAX: setState("You've already claimed your max public mint. Thank you! 🎉", "Join our Community for updates")
}

function App() {
  const onboarding = new MetaMaskOnboarding()
  const setContract = () => {
    window.contract = new web3.eth.Contract(__CONTRACT_ABI__, __CONTRACT_ADDRESS__);
  }
  const [accounts, setAccounts] = useState([])
  const [layoutLoading, setLayoutLoading] = useState(true)
  const [metamaskButton, setMetamaskButton] = useState({})
  const [showMintModal, setShowMintModal] = useState(false)
  const [mintInfo, setMintInfo] = useState('')
  const [canMint, setCanMint] = useState(false)

  const updateConnectStatus = () => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      setMetamaskButton(installMetaMask)
    } else if (accounts && accounts.length > 0) {
      window.address = accounts[0];
      setMetamaskButton({
        text: `✔ ...${window.address.slice(-8)}`,
        handleClick: () => null
      })
      onboarding.stopOnboarding();
      setContract()
      loadContractInfo()
    } else {
      onboarding.stopOnboarding()
      setMetamaskButton(connectToMetaMask)
    }
  };

  async function checkChain() {
    let chainId = 0;
    if(__CHAIN__ === 'rinkeby') {
      chainId = 4;
    } else if(__CHAIN__ === 'polygon') {
      chainId = 137;
    } else if (__CHAIN__ === 'ethereum') {
      chainId = 1
    }

    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(chainId) }],
        });
        updateConnectStatus();
      } catch (err) {
          // This error code indicates that the cchainupdateConnectStatushain has not been added to MetaMask.
        if (err.code === 4902) {
          try {
            if(chain === 'rinkeby') {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainName: 'Rinkeby Test Network',
                    chainId: web3.utils.toHex(chainId),
                    nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
                    rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
                  },
                ],
              });
            } else if(chain === 'polygon') {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainName: 'Polygon Mainnet',
                    chainId: web3.utils.toHex(chainId),
                    nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                    rpcUrls: ['https://polygon-rpc.com/'],
                  },
                ],
              });
            }
            updateConnectStatus();
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        checkChain()
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      }
  
      if (window.web3) {
        // Check if User is already connected by retrieving the accounts
        await window.web3.eth.getAccounts().then(async (addr) => {
          setAccounts(addr)
        });
      }

      updateConnectStatus()
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        window.ethereum.on("accountsChanged", setAccounts);
      }

      setLayoutLoading(false)

    }

    initializeWeb3()

    return () => {
      if (window.ethereum)
        window.ethereum.removeListener('accountsChanged', setAccounts)
    }
  }, [])

  useEffect(() => {
    updateConnectStatus()
  }, [accounts])

  const installMetaMaskHandler = () => {
    onboarding.startOnboarding();
    setMetamaskButton({
      text: 'Installing...',
      handleClick: () => null
    })
  }
  const installMetaMask = {
    text: 'Install MetaMask!',
    handleClick: installMetaMaskHandler
  }

  const connectToMetaMaskHandler = async () => {
    setMetamaskButton({
      text: 'Loading...',
      handleClick: () => null
    })
    await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accts) => {
          setAccounts(accts)
          
          setMetamaskButton({
            text: `✔ ...${accts[0].slice(-8)}`,
            handleClick: () => null
          })
          // SHOW SPINNER
          setContract()
          loadContractInfo()
        });
  }
  const connectToMetaMask = {
    text: 'Connect to MetaMask',
    handleClick: connectToMetaMaskHandler
  }

  async function loadContractInfo() {
    setShowMintModal(true)
    const onlyPresale = await contract.methods.onlyPresale().call();
    const presaleStarted = await contract.methods.presaleStarted().call()
    const totalMinted = await contract.methods.getTotalSupply().call();
    const isCoolDownActive = await contract.methods.paused().call();
    const max_mint = onlyPresale ? await contract.methods.MAX_PRESALE_MINT().call() : await contract.methods.MAX_PUBLIC_MINT().call()
    const addressBalance = onlyPresale ? await contract.methods.addressPresaleMintedBalance(accounts[0]).call() : await contract.methods.addressMintedBalance(accounts[0]).call()
    const addressMintMax = Number(max_mint) === Number(addressBalance) 
    setShowMintModal(true)
  
    if (isCoolDownActive) {
      setCanMint(false)
      setMintInfo(COOL_OUT)
    }
    else if (onlyPresale) {
        if (!presaleStarted) {
          setCanMint(false)
          setMintInfo(PRESALE_HAS_NOT_STARTED)
        } else {
          const isWhitelisted = await contract.methods.isWhitelisted(accounts[0]).call();
          if (isWhitelisted) {
            const max_presale_mint = await contract.methods.presaleAmount().call()
            const isWLSoldOut = Number(totalMinted) >= Number(max_presale_mint) 
            if (isWLSoldOut) {
              setCanMint(false)
              setMintInfo(PRESALE_STARTED_MAX)
            } else if (addressMintMax) {
              setCanMint(false)
              setMintInfo(PRESALE_MAX_MINT)
            }
            else {
              setCanMint(true)
              setMintInfo(PRESALE_STARTED_AND_IS_WL)
            }
          } else {
              setCanMint(false)
              setMintInfo(PRESALE_STARTED_AND_NOT_WL)
          }
        }
    } else {
      const max_public_supply = await contract.methods.MAX_SUPPLY().call()
      const isSoldOut = Number(totalMinted) >= Number(max_public_supply)
      if (addressMintMax) {
          setCanMint(false)
          setMintInfo(PUBLIC_WALLET_MAX)
      } else if (isSoldOut) {
          setCanMint(false)
          setMintInfo(PUBLIC_SALE_MAX)
      } else {
        setCanMint(true)
        setMintInfo(PUBLIC_SALE_STARTED)
      }
    }
  }

  const mint = () => {
    updateConnectStatus()
  }

  return (
    <div className='grid grid-rows-[minmax(100vh, auto)] relative'> 
        { layoutLoading && <Loader /> }
        { showMintModal && <Modal onClose={() => setShowMintModal(false)}>
          { canMint ? <Mint {...mintState[mintInfo]} address={accounts[0]} /> : <MintException {...mintState[mintInfo]} /> }
        </Modal> }
        
        <Header {...metamaskButton} onMint={mint} />
        <Hero />
        <div className="bg-[url('/src/assets/images/dirt.jpg')] bg-cover">
          <Showcase />
          <Footer />
        </div>
    </div>
  )
}

export default App

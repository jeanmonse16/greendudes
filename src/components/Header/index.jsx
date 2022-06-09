import Logo from '../../assets/images/logo.png'
import Opensea from '../../assets/images/opensea.png'

export const Header = ({ text, handleClick, onMint, openSeaLink }) => {
    function abrirNuevoTab(url) {
        // Abrir nuevo tab
        var win = window.open(url, '_blank');
        // Cambiar el foco al nuevo tab (punto opcional)
        win.focus();
      }
    return (
        <header className="animate__animated animate__fadeIn w-full flex justify-between items-center px-4 py-2 absolute top-0 left-0">
            <img className='w-14  bg-black rounded-full border border-white' src={Logo} alt="greendudes logo" />
            <div className='flex gap-4 items-center '>
                <button onClick={() => abrirNuevoTab('https://opensea.io/collection/greendudeswtf')} className='flex items-center justify-center w-9 h-9 bg-black border border-white shadow-md rounded-full transition-transform hover:scale-105'>
                    <img className='w-8' src={Opensea} alt="opensea logo" />
                </button>
                <button onClick={handleClick} className="text-md text-white rounded-full font-medium px-4 py-1 bg-black border border-white shadow-md transition-transform hover:scale-105">
                    {text}
                </button>
                <button onClick={onMint} className="text-md text-white rounded-full font-medium px-4 py-1 bg-black border border-white shadow-md transition-transform hover:scale-105">
                    Mint
                </button>
            </div>
        </header>
    )
}

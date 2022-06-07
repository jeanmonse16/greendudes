import Logo from '../../assets/images/logo.png'

export const Footer = () => {
    return (
        <div className="mt-20 text-center bg-black pb-4">
            <img className='w-32 mx-auto' src={Logo} />
            <p className="text-black text-xs text-white">Copyright © 2022 Greendudes NFTs</p>
        </div>
    )
}
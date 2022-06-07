import Banner from '../../assets/images/greentown.png'

export const Hero = () => {
    return (
        <div className='flex flex-col gap-8 items-center justify-between mt-20 md:mt-16'>
            <div className='flex-1 flex flex-col items-center justify-center'>
                <h1 className='animate__animated animate__fadeInUp text-3xl md:text-4xl text-black font-extrabold uppercase text-center mb-4'><span className='text-5xl md:text-6xl font-extrabold'>Welcome</span> <br /> to Greendudes NFT proyect</h1>
                <p className='animate__animated animate__fadeInUp animate__slow	2s text-lg text-center'>wE arE 10.o0o GreeN DudeS LivinG iN GreeN TowN  -nO RoaDmaP -nO OgS -nO KingS JusT GooD VibeS!!! wE WilL HavE GiveAwayS 🎁  witH PriZeS anD WL 📖  SpotS NFT FREE MINT.</p>
            </div>
            <div className='w-full'>
                <img  className='w-full' src={Banner} alt="greendudes banner" />
            </div>
        </div>
    )
}
import ReactDOM from "react-dom"
import House from '../../assets/images/house.png'
import Smoke1 from '../../assets/images/smoke-1.png'
import Smoke2 from '../../assets/images/smoke-2.png'
import Smoke3 from '../../assets/images/smoke-3.png'

export const Loader = () => {
    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white">
            <div className="flex flex-col gap-4 relative">
                <div className="bottom-full right-5 absolute flex flex-col items-center gap-2 z-[-1]">
                    <img className="w-4 opacity-0 animate-smoke-slow" src={Smoke1} />
                    <img className="w-3 opacity-0 animate-smoke-slow" src={Smoke2} style={{ animationDelay: '0.4s' }}/>
                    <img className="w-2 opacity-0 animate-smoke-slow" src={Smoke3} style={{ animationDelay: '0.6s' }} />
                </div>
                <div className="w-full h-5 w-8/12 absolute top-20 left-7 z-[-1] animate-disco-slow">
                </div>
                <img className="w-32" src={House} alt="loader image" />
                <div className="flex flex-row items-end gap-2 justify-center text-center text-lg font-bold">
                    Loading 
                    <span className="block bg-black w-1 h-1 mb-2 rounded-full opacity-0 animate-hide-slow"></span>
                    <span className="block bg-black w-1 h-1 mb-2 rounded-full opacity-0 animate-hide-slow" style={{ animationDelay: '0.2s' }}></span>
                    <span className="block bg-black w-1 h-1 mb-2 rounded-full opacity-0 animate-hide-slow" style={{ animationDelay: '0.4s' }}></span>
                </div>
            </div>
        </div>, 
        document.getElementById("loader")
    )
}
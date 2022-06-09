import { useState } from 'react';
import ReactDOM from "react-dom"
import { BsXLg } from 'react-icons/bs'

export const Counter = () => {
    const [ close, setClose ] = useState(false);

    const handleClose = () => {
        setClose(!close)
    }

    if (!close) {
        return ReactDOM.createPortal(
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center overflow-y-auto p-4 bg-[#00000097]">
                <div className="fixed top-2 left-1/2 translate-x-[-50%] animate__animated animate__fadeIn flex flex-col gap-4 bg-white p-4 sm:p-8 rounded">
                    <button className="self-end transition-transform hover:scale-105" onClick={handleClose}>
                        <BsXLg />
                    </button>
                    <h2 className="text-lg sm:text-xl font-extrabold text-center uppercase">Two hours left to start the mint</h2>
                    <div className='flex justify-center text-4xl lg:text-5xl font-bold'>
                        <span>00</span>
                        <span>:</span>
                        <span>00</span>
                        <span>:</span>
                        <span>00</span>
                    </div>
                </div>
            </div>,
            document.getElementById("modal")
        )
    }
}
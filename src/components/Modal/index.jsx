import { useState } from 'react';
import ReactDOM from "react-dom"
import { BsXLg } from 'react-icons/bs'

export const Modal = ({ children }) => {
    const [ close, setClose ] = useState(false);

    const handleClose = () => {
        setClose(!close)
    }

    if (!close) {
        return ReactDOM.createPortal(
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center overflow-y-auto p-4 bg-[#00000097]">
                <div className="animate__animated animate__fadeIn flex flex-col gap-4 bg-white p-4 sm:p-8 rounded w-full sm:w-[650px] md:w-[800px] min-h-[350px]">
                <button className="self-end transition-transform hover:scale-105" onClick={handleClose}>
                    <BsXLg />
                </button>
                {children}
                </div>
            </div>, 
            document.getElementById("modal")
        )
    }
}
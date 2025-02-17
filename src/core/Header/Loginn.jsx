import React from 'react'
import { Link } from 'react-router-dom'

function Loginn( openform , userdetails  , getDisplayLetter) {
    return (
        <>
            <Link  onClick={openform}>
                {userdetails ? (
                    <div className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-full bg-secondary ring-2 ring-white">
                        <span className="text-lg font-bold text-white">
                            {getDisplayLetter()}
                        </span>
                    </div>
                ) : (
                    <div className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-full bg-gray-100 ring-2 ring-white">
                        <i className="text-xl text-gray-500 fi fi-rr-user"></i>
                    </div>
                )}
            </Link>
        </>
    )
}

export default Loginn

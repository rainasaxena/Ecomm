import React from 'react'

const Footer = () => {
  return (
    <footer className="h-16 bg-black flex flex-col justify-center p-7 md:p-10 gap-3">
        <div className = " flex justify-between">
            <div className="text-[8px] md:text-base text-gray-500">© LuxeSelect, 2024.</div>
            <div className="text-[8px] md:text-base text-gray-500">About us | Contact us | Privacy Policy</div>
        </div>
        <div className="mb-1 text-center text-[8px] md:text-sm text-gray-500">Made with ❤️ by Raina & Vishal</div>
    </footer>
  )
}

export default Footer
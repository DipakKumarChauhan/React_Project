import React from 'react'

const Button = (
    children,
    type = "button",
    bgColor = "bg-blue-500",
    textColor = "text-white",
    className = "", 
    ...props
) => {
  return (
    <button 
        className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props} // Note isse kya hoga maan lo jo button use kiya naya banane ke liye and kuch aur properties pass kiya tho vo yahan handle ho jayega
    >
        {children}
    </button>
  )
}

export default Button
import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
    
    label,
    type = "text",
    className = "",
    ...props

}, ref){
    
   const id = useId() // useId is a hook that generates a unique id for each input field. This is useful when we have multiple input fields and we want to associate the label with the input field using the id.

  return (
    <div className='w-full'>
        {
            label && <label className='inline-block mb-1 pl-1'
            htmlFor ={id}>
                {label} 
            </label>
        }
        <input
            type = {type}
            className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}  `}
            id={id}
            ref={ref}
            {...props}
        >
        </input>
    </div>
  )
}
) 

export default Input
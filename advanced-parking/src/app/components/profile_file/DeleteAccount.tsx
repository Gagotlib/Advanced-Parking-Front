import React from 'react'

function DeleteAccount() {

  const handleDelete = async () => {
    //Peticion al backend 

  }

  return (
    <div>
      <button type='submit' onSubmit={handleDelete} className='py-2 px-2 text-base font-medium text-ghostwhite focus:outline-none bg-red-500 rounded-lg border border-silver hover:bg-ghostwhite hover:text-yaleblue focus:z-10 focus:ring-2 focus:ring-yaleblue/50'>
        Delect Account
      </button>
    </div>
  )
}

export default DeleteAccount
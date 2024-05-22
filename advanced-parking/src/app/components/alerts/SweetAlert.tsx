import React from 'react'
import Swal from 'sweetalert2'

export const showSweetAlert = async (onConfirm: any) => {

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete the profile photo?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#063971",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  })

  if (result.isConfirmed) {
    onConfirm();
    Swal.fire({
      title: "Deleted!",
      text: "Your photo has been deleted.",
      icon: "success"
    });
  }
}
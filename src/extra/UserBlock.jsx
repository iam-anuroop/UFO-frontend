import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const UserBlock = () => {
    const [open,setOpen] = useState(true)
  return (
    <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='block-modal'
      >
        <Box className='block-box'>
          block
          unblock
        </Box>
        
      </Modal>
  )
}

export default UserBlock

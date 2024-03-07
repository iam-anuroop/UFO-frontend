import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './UserBlock.css'

const UserBlock = ({context}) => {
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
          <div className="user-block-div">
            <h1>{context.buser}</h1>
            <button className="user-block-button">
              Block
            </button>
            <button className="user-unblock-button">
              Unblock
            </button>
          </div>
            <div></div>
        </Box>
        
      </Modal>
  )
}

export default UserBlock

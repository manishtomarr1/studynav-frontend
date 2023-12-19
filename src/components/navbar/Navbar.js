// src/components/Navbar.js
import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import BookSlot from '../book slot/Bookslot';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxHeight: '80vh',
  overflowY: 'auto',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <nav className="bg-gray-100 p-4 flex justify-between items-center fixed w-full top-0 z-10">
      <div className="flex items-center">
        {/* <img src={logoImage} alt="Logo" className="w-20 h-30 mr-2" /> */}
        <span className="text-gray-800 font-extrabold text-lg">StudyNavUK</span>
      </div>
      <div className="flex space-x-4">
        <button onClick={handleOpen} className="bg-gray-800 text-white px-4 py-2 rounded transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 hover:bg-gray-600 duration-300">
          Book a Slot
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <BookSlot />
          </Box>
        </Modal>
      </div>
    </nav>
  );
};

export default Navbar;

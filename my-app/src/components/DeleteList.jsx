import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';

//Placeholder to hold all list data to be selected from
let options = []

export default function FadeMenu() {
  //Setting Form Variables to Update with UseState
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    fetch('/lists/delete/' + encodeURI(value), {
      method: 'delete',
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.success == false){
        alert(data.msg)
      }
    })
    setAnchorEl(null);

  };

  const handleClose = () => {
    setAnchorEl(null)
  }

  //Populate Options Array with Data when component is loaded
  useEffect(() => {
    fetch('/lists/getAll/')
    .then((res) => res.json())
    .then((data) => {
      for(let x = 0; x < data.length; x++){
        options[x] = data[x].list_title
      }
    })
  }, [])

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<DeleteIcon />}     
        >
        Delete List
      </Button>
      <Menu
        fullWidth
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          style: {
            height: '50ch',
          },
        }}
      >
        <MenuItem fullWidth>
          <Autocomplete
            fullWidth
            disablePortal
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            window.localStorage.setItem("list_title", newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select List Below" />}
          />
        </MenuItem>
        <MenuItem>
            <Button variant="contained" onClick={handleDelete}> 
              Delete
            </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}
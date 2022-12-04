import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateList() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    console.log('works')
    const inputData = document.getElementById('list_title').value;
    console.log(inputData)
    const newList = {
      list_title: inputData
    }
    let formDataString = JSON.stringify(newList)
    setOpen(false)

    fetch("/lists/save",{
      method: "POST",
      headers: { "Content-type": "application/json", "Accept": "application.json"},
      body: formDataString
    })
    .then((res) => res.json())
    .then((data) => {
      let output = data.success
      console.log(output)
      if(output === "false"){
        alert(JSON.stringify(data.msg) + "\nPlease Enter New List Name")
      }
      if(output === "true"){
        alert("List Saved Successfully")
      }
    })
  }

  return (
    <div justifyContent="flex-end">
      <Button variant="outlined" onClick={handleClickOpen}>
        New List
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new list, please enter the desired name for your list.
          </DialogContentText>
          <DialogContentText>
            Note: You cannot name a new list after an existing one.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="list_title"
            label="New List Name"
            type="list_title"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleCreate}>Create List</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
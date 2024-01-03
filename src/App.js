import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from '@mui/material/Table/Table'

import TableBody from '@mui/material/TableBody/TableBody'
import TableCell from '@mui/material/TableCell/TableCell'
import TableContainer from '@mui/material/TableContainer/TableContainer'
import TableHead from '@mui/material/TableHead/TableHead'
import TableRow from '@mui/material/TableRow/TableRow'
import Paper from '@mui/material/Paper/Paper'
import Box from '@mui/material/Box/Box';
import Modal from '@mui/material/Modal/Modal';
import Fade from '@mui/material/Fade/Fade';
import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';
import TextField from '@mui/material/TextField/TextField';
import { Formik } from "formik";

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    axios.get("http://192.168.18.193/api.php")
      .then(response => {
        setData(response.data);

      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  const stylem = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const style = {
    color: "white",
    background: "#337ab7",
    border: "1px solid black"
  };
  const style1 = {
    border: "1px solid black"
  }

  const handleRow = (data) => {
    
    if (selected === data.ID) {
      setSelected(null);
    } else {
      setSelected(data.ID);
    }
  }

  return (
    <div className="App">
      <div
        className="head"
        style={{
          width: 'fit-content',
          margin: '20px auto',
        }}
      >
        <h1
          style={{
            color: 'green',
          }}
        >
          GeeksforGeeks
        </h1>
        <strong>React MUI TableBody API</strong>
      </div>
      <div
        className="head"
        style={{
          width: 'fit-content',
          margin: '20px auto',
        }}
      >
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition

          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={stylem}>
              <Formik>
                <form>
                  <input
                  type="text"
                  name="shoes"
                  />
                </form>
              </Formik>
            </Box>
          </Fade>
        </Modal>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead >
            <TableCell align="center" style={style}>
              ID
            </TableCell>
            <TableCell align="center" style={style}>
              Shoes Form
            </TableCell>
            <TableCell align="center" style={style}>
              Article
            </TableCell>
            <TableCell align="center" style={style}>
              Stage
            </TableCell>
          </TableHead>
          <TableBody>
            {data.map(data => (
              <TableRow key={data.ID} onClick={() => handleRow(data)}
                style={{
                  backgroundColor: selected === data.ID ? "#518dc1" : "transparent",
                  cursor: "pointer",
                }}>
                <TableCell align="center" style={{ color: selected === data.ID ? "white" : "inherit", ...style1 }}>
                  {data.ID}
                </TableCell>
                <TableCell align="center" style={{ color: selected === data.ID ? "white" : "inherit", ...style1 }}>
                  {data.Shoe_Form}</TableCell>
                <TableCell align="center" style={{ color: selected === data.ID ? "white" : "inherit", ...style1 }}>
                  {data.Article}
                </TableCell>
                <TableCell align="center" style={{ color: selected === data.ID ? "white" : "inherit", ...style1 }}>
                  {data.Stage}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default App;
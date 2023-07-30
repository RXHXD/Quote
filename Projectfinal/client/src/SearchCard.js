import React,{useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export const SearchCard = (props) => {
  
  const modalInfo = {
    head : "",
    message: "",
    close:""
  }

if(props.isModal)
{
   modalInfo.head = "Result";
   modalInfo.message = "Author Exists";
   modalInfo.close = "Close";
}
else {  
  modalInfo.head = "Failure";
  modalInfo.message = "Author Don't Exists";
  modalInfo.close = "Close";
}


const [show, setShow] = useState(true);
const handleClose = () => setShow(false);
const handleOpen = (result) => setShow(result);




  return(
    <div className="input-group">
  <div className="form-outline">
    <input type="search" id="search" placeholder="Search by Author Name" className="form-control" />
  </div>
  <button type="button" className="btn btn-info"
   
   onClick={() => {
    props.searchQuoteByName(document.getElementById("search").value);
    handleOpen(true)
  }}
  
  >Go</button>
  {
    props.isModal ? <Modal show = {show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{ modalInfo.head }</Modal.Title>
    </Modal.Header>
    <Modal.Body>{ modalInfo.message}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        { modalInfo.close}
      </Button>
    </Modal.Footer>
  </Modal> 
        :
        <Modal show = {show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{ modalInfo.head }</Modal.Title>
    </Modal.Header>
    <Modal.Body>{ modalInfo.message}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        { modalInfo.close}
      </Button>
    </Modal.Footer>
  </Modal>  
    }
</div>
  )


}
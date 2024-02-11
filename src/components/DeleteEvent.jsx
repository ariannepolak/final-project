import React from 'react';
import { 
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalBody, 
  Text, 
} from '@chakra-ui/react';

const DeleteEvent = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Confirm delete
        </ModalHeader>

        <ModalBody>
          <Text>
            Are you sure you want to delete this event?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button 
            colorScheme="red" 
            mr={3} 
            onClick={onDelete}>
              Delete
          </Button>
          <Button 
            onClick={onClose}>
              Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEvent;

import React, { useState } from 'react';
import { 
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalBody, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea, 
  HStack,
  Checkbox
} from '@chakra-ui/react';

const EditEvent = ({ event, onSave, categories }) => {
  const [editedEvent, setEditedEvent] = useState({ ...event });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    if (type === 'checkbox') {
      const categoryId = parseInt(value);
      const updatedCategoryIds = checked
        ? [...editedEvent.categoryIds, categoryId]
        : editedEvent.categoryIds.filter(id => id !== categoryId);
      
      setEditedEvent(prevState => ({
        ...prevState,
        categoryIds: updatedCategoryIds
      }));
    } else {
      setEditedEvent(prevState => ({
        ...prevState,
        [name]: newValue
      }));
    }
  };
  

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    onSave(editedEvent);
    handleClose();
  };

  return (
    <>
      <Button 
        onClick={handleOpen} 
        bg='#00726d'
        color='#f4f2f0' mb={4}>
          Edit event
      </Button>

      <Modal 
        isOpen={isOpen} 
        onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Edit event
          </ModalHeader>

          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>
                Title
              </FormLabel>
              <Input 
                type="text" 
                name="title" 
                value={editedEvent.title} 
                onChange={handleChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Description
              </FormLabel>
              <Textarea 
                name="description" 
                value={editedEvent.description} 
                onChange={handleChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Location
              </FormLabel>
              <Textarea 
                name="location" 
                value={editedEvent.location} 
                onChange={handleChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Starttime
              </FormLabel>
              <Input 
                type="datetime-local" 
                value={editedEvent.startTime} 
                onChange={handleChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Endtime
              </FormLabel>
              <Input 
                type="datetime-local" 
                value={editedEvent.endTime} 
                onChange={handleChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Image
              </FormLabel>
              <Input 
                type="url" 
                value={editedEvent.image} 
                onChange={handleChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Categories
              </FormLabel>
              <HStack spacing={3}>
                {categories.map(category => (
                  <Checkbox key={category.id} value={category.id} checked={editedEvent.categoryIds.includes(category.id)} onChange={handleChange}>
                    {category.name}
                  </Checkbox>
                ))}
              </HStack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button 
              bg='#00726d'
              color='#f4f2f0'
              mr={3} 
              onClick={handleSave}>
                Save
            </Button>
            <Button 
              bg='#f4f2f0' 
              color='#00726d' 
              onClick={handleClose}>
                Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditEvent;

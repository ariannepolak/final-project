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
  CheckboxGroup, 
  Checkbox, 
  HStack,  
} from '@chakra-ui/react';

const AddEvent = ({ categories, onAddEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    image: '',
    categoryIds: [],
    location: '',
    startTime: '',
    endTime: '',
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setNewEvent({
      title: '',
      description: '',
      image: '',
      categoryIds: [],
      location: '',
      startTime: '',
      endTime: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleCategoryChange = (selectedCategories) => {
    const categoryIdsAsNumbers = selectedCategories.map(id => Number(id));
    setNewEvent((prevEvent) => ({ ...prevEvent, categoryIds: categoryIdsAsNumbers }));
  };
  
  const handleAddEvent = () => {
    onAddEvent(newEvent);
    handleClose();
  };

  return (
    <>
      <Button 
        onClick={handleOpen} 
        bg="#00726d" 
        color="#f4f2f0" 
        mb={4} 
        ml={'10px'} >
          Add Event
      </Button>

      <Modal 
        isOpen={isOpen} 
        onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>

          <ModalHeader>
            Add Event
          </ModalHeader>

          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>
                Title
              </FormLabel>
              <Input 
                type="text" 
                name="title" 
                value={newEvent.title} 
                onChange={handleInputChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Description
              </FormLabel>
              <Input 
              type="text" 
              name="description" 
              value={newEvent.description} 
              onChange={handleInputChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Location
              </FormLabel>
              <Input 
                type="text" 
                name="location" 
                value={newEvent.location} 
                onChange={handleInputChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Image
              </FormLabel>
              <Input 
                type="url" 
                name="image" 
                value={newEvent.image} 
                onChange={handleInputChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Starttime
              </FormLabel>
              <Input 
                type="datetime-local" 
                name="startTime" 
                value={newEvent.startTime} 
                onChange={handleInputChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Endtime
              </FormLabel>
              <Input 
                type="datetime-local" 
                name="endTime" 
                value={newEvent.endTime} 
                onChange={handleInputChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Categories
                </FormLabel>
              <CheckboxGroup 
                colorScheme='#00726d' 
                value={newEvent.categoryIds} 
                onChange={handleCategoryChange}>
                <HStack>
                  {categories.map((category) => (
                    <Checkbox key={category.id} value={category.id}>
                      {category.name}
                    </Checkbox>
                  ))}
                </HStack>
              </CheckboxGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button 
              bg='#00726d' 
              color='#f4f2f0' 
              mr={3} 
              onClick={handleAddEvent}>
                Add
            </Button>
            <Button 
              onClick={handleClose}>
                Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEvent;

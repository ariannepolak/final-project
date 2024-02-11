import React from 'react';
import { useState } from 'react';
import { 
  useLoaderData, 
  useNavigate 
} from "react-router-dom";
import { 
  Heading, 
  Card, 
  Text, 
  Image, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Wrap, 
  Button, 
  useToast, 
  Avatar,  
} from '@chakra-ui/react';
import EditEvent from '../components/EditEvent';
import DeleteEvent from '../components/DeleteEvent';

export const loader = async ({params}) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch ("http://localhost:3000/categories/")
  const users = await fetch ("http://localhost:3000/users/")
  return { event: await event.json(), categories: await categories.json(), users: await users.json()};
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();

  const getCategoryById = (categoryIds) => {
    return categories.filter((category) => categoryIds.includes(category.id));
  };

  const getUsernameById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown user';
  };

  const getUserPhoto = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.image : 'No image';
  };

  const navigate = useNavigate();
  const toast = useToast();

  // EDIT EVENT
  const handleSave = async (editedEvent) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${editedEvent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedEvent)
      });
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      toast({
        title: 'The event has been updated',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      navigate(`/event/${editedEvent.id}`)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // DELETE EVENT
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      toast({
        title: 'The event has been deleted',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      navigate("/");
    } catch (error) {
      console.error('Error:', error);
    }
    setIsDeleteModalOpen(false);
  };


  return <div style={{ backgroundColor: '#f4f2f0' }}>
    <Card 
      m={"10px"} 
      bg={'white'} 
      w={500} 
      key={event.id} >

      <CardHeader>
        <Image 
          src={event.image} 
          borderRadius={5} />
      </CardHeader>  

      <CardBody>
        <Heading 
          mb={5}
          color={"#00726d"} > 
            {event.title} 
        </Heading>
        <Text mb={5}> 
          {event.description} 
        </Text>
        <Text mb={5}> 
          Location: {event.location} 
        </Text>
        <Text> 
          Starttime: {new Date(event.startTime).toLocaleString([], { dateStyle: "short", timeStyle: "short", hour24: true })} 
        </Text>
        <Text mb={5}> 
          Endtime: {new Date(event.endTime).toLocaleString([], { dateStyle: "short", timeStyle: "short", hour24: true })} 
        </Text>
        <Text mb={5}> 
          Category: {getCategoryById(event.categoryIds).map((category) => category.name).join(', ')} 
        </Text>

        <Wrap align='center'>
          <Avatar 
            src={getUserPhoto(event.createdBy)}
            bg={"#00726d"} >
          </Avatar>
          <Text> 
            {getUsernameById(event.createdBy)} 
          </Text>
        </Wrap>
      </CardBody>

      <CardFooter>
        <Wrap>
          <EditEvent 
            event={event} 
            categories={categories} 
            onSave={handleSave} />
          <Button 
            colorScheme="red" 
            onClick={() => setIsDeleteModalOpen(true)}>
              Delete event
          </Button>
          <DeleteEvent 
            isOpen={isDeleteModalOpen} 
            onClose={() => setIsDeleteModalOpen(false)} 
            onDelete={handleDelete} /> 
          </Wrap>
      </CardFooter>
    </Card>
  </div>;
};

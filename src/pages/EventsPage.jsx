import { useState } from 'react';
import { 
  useLoaderData, 
  Link, 
  useNavigate 
} from "react-router-dom";
import { 
  Heading, 
  Card, 
  Image, 
  SimpleGrid, 
  Input, 
  Checkbox, 
  useToast, 
  Box, 
  Text,  
  Flex,  
} from '@chakra-ui/react';
import AddEvent from '../components/AddEvent';


export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  return { events: await events.json(), categories: await categories.json() };
};


export const EventsPage = ( ) => {
  const { events, categories  } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredEvents = events
    .filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(event => selectedCategories.length === 0 || selectedCategories.some(catId => event.categoryIds.includes(catId)));

    const handleCategoryToggle = (categoryId) => {
      const updatedCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter(id => id !== categoryId)
        : [...selectedCategories, categoryId];
      setSelectedCategories(updatedCategories);
    };

    // ADD EVENT
    const toast = useToast();
    const navigate = useNavigate();

    const handleAddEvent = async (newEvent) => {
      try {
        const response = await fetch('http://localhost:3000/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',},
          body: JSON.stringify(newEvent),
        }) ;
        if (!response.ok) {
          throw new Error('Failed to add new event');
        }
        toast({
          title: 'The event has been added',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        navigate("/");
      } catch (error) {
        console.error('Error:', error)
      }
    };


  return (
    <div style={{ backgroundColor: '#f4f2f0' }} >
      <Heading 
        ml={"10px"} 
        mb={"20px"}
        color={"#00726d"}>
          List of events
      </Heading>

      {/* Search function*/}
      <Input 
        ml={"10px"} 
        mb={"20px"}
        w={"300px"} 
        type="text" 
        placeholder="Search events" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}/>

      {/* Filter function */}
      <Text 
        ml={"10px"}
        mb={2}> 
          Filter by category: 
      </Text>

      {categories.map((category) => (
        <Checkbox 
          ml={"10px"} 
          mb={"20px"} 
          mr={2} 
          key={category.id}
          isChecked={selectedCategories.includes(category.id)}
          onChange={() => handleCategoryToggle(category.id)} >
            {category.name}
        </Checkbox>
      ))}

      <SimpleGrid minChildWidth={"350px"}>
        {filteredEvents.map((event) => (
          <Card 
            key={event.id} 
            m={'10px'} 
            p={'20px'} 
            bg={'white'} 
            borderRadius={10} >
            <Link to={`event/${event.id}`}>
            <Flex>
              <Image 
                src={event.image} 
                height={100} 
                width={100} 
                objectFit={'cover'} 
                borderRadius={5} 
                mr={'20px'}/>
              <Box>
                <Text 
                  fontSize={12}
                  color={'#00726d'}
                  mb={'10px'} >
                  {new Date(event.startTime).toLocaleString([], { dateStyle: "short", timeStyle: "short", hour24: true })}
                </Text>
                <Heading 
                  fontSize={20} > 
                    {event.title}
                </Heading>
                <Text
                  fontSize={14}>
                  {event.location}
                </Text>
              </Box>
            </Flex>
            </Link>
          </Card>
        ))}
      </SimpleGrid>

      {/* Add Event Button */}
      <AddEvent 
        categories={categories} 
        onAddEvent={handleAddEvent} 
      />
  </div>
  )
}

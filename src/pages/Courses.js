import React, {useEffect, useState} from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react';
  import { useParams } from "react-router-dom";
  import axios from 'axios';
  import { Button, ButtonGroup } from '@chakra-ui/react'
  import { Link } from 'react-router-dom';
  import { CircularProgress } from '@chakra-ui/react';

const Courses = () => {
    const [courses, setCourses] = useState([])
    const params = useParams();
    const [loading, setLoading] = useState(true)

    const fetchCourses = () => {
        setLoading(true)
         axios.post(`https://vmdb-iota.vercel.app/api/get_courses_by_mentor`, {_id: params.id}).then((res) => {
             if (res.status == 200) {
                 setLoading(false)
                 setCourses(res.data)
             }
         }).catch((err) => {
              setLoading(false)
             console.log(err)
         })
     }

     useEffect(() => {
        fetchCourses()
     }, [])

    return (
        <div className='h-screen bg-white'>
            {
                loading == true ?
                 <CircularProgress  isIndeterminate color='green.300' />
                :
                <TableContainer>
                <Table variant='simple'>
                  <TableCaption></TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Instructor</Th>
                      <Th>Course</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {
                      courses.map((course, idx) => {
                          return (
                              <Tr key={idx}>
                      <Td>{course.title}</Td>
                      <Td>{course?.instructor?.name}</Td>
                      <Td>
                          <Link to={`https://www.youtube.com/watch?v=${course.url}`}>
                          <Button colorScheme='blue'>Play</Button>
                          </Link>
                          </Td>
                    </Tr>
                          )
                      })
                  }
              
                  </Tbody>
                </Table>
              </TableContainer>
            }
         
        </div>
    );
};

export default Courses;
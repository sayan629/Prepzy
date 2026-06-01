import { getInterviewers } from '@/actions/explore';
import React from 'react'

const ExplorePage = async () => {
    const interviwers = await getInterviewers();
  return (
    <main className='min-h-screen bg-black'>ExplorePage</main>
  )
}

export default ExplorePage
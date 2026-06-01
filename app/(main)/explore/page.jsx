import { getInterviewers } from '@/actions/explore';
import PageHeader from '@/components/reusables';
import React from 'react'
import ExploreGrid from './_components/ExploreGrid';

const ExplorePage = async () => {
    const interviwers = await getInterviewers();
  return (
    <main className='min-h-screen bg-black'>
        <PageHeader
            label="Explore"
            gray="Discover"
            gold="Your Perfect Interviewer"
            description="Browse through our diverse pool of interviewers and find the perfect match for your career aspirations."
            />
        <div className='max-w-6xl mx-auto px-8 xl:px-0 py-10'>
            <ExploreGrid interviewers={interviwers}/>
        </div>
    </main>
  );
};

export default ExplorePage
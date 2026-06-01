"use client";


import React, { useMemo, useState } from 'react'
import React from 'react'


const ExploreGrid = ({ interviewers }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        return interviewers.filter((i)=>{
            const matchesCategory = activeCategory === null || i.categories?.includes(activeCategory);
            const q = search.toLowerCase().trim();
             const matchesSearch = !q || 
             i.name?.toLowerCase().includes(q) ||
             i.title?.toLowerCase().includes(q) ||
            i.company?.toLowerCase().includes(q); 
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, search, interviewers])

  return (
    <div>ExploreGrid</div>
  )
}

export default ExploreGrid;
'use client'
import React, { useState, useEffetc } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ setSearchString }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = (event) => {
        const searchString = event.target.value;
        setSearchInput(searchString);

        if (searchString.length <= 0) {
            console.log('set to zero');
            window.location.reload();
            setSearchString('');
        }
    };

    const handleSearchClick = () => {
        setSearchString(searchInput);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setSearchString(searchInput);
        }
    };


    return (
        <div className="flex space-x-2 mt-3 lg:px-6 max-w-[1020px] w-full">
            <input
                className="focus:outline-none bg-white w-full border rounded-lg px-4 py-2 text-sm"
                placeholder="Search 4,000+ AI Tools..."
                value={searchInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <button
                className="bg-white border p-3 rounded-lg"
                onClick={handleSearchClick}
            >
                <Search size={16} color="gray" />
            </button>
        </div>
    );
};

export default SearchBar;

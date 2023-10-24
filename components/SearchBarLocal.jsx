import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

const SearchBar = ({ setSearchString }) => {
    const handleInputChange = (event) => {
        const searchString = event.target.value;
        setSearchString(searchString);
    };

    return (
        <div className="flex space-x-2 mt-3 lg:px-6 max-w-[1020px] w-full">
            <input
                className="focus:outline-none bg-white w-full border rounded-lg px-4 py-2 text-sm"
                placeholder="Search 4,000+ AI Tools..."
                onChange={handleInputChange}
            />
            {/* <button className="bg-white border p-3 rounded-lg">
                <SlidersHorizontal size={16} color="gray" />
            </button> */}
        </div>
    );
};

export default SearchBar;
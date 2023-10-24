'use client'
import React, { useEffect, useState, useCallback } from 'react';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import HeroCard from '@/components/HeroCard';
import TabBar from '@/components/TabBar';
import SearchBar from '@/components/SearchBar';
import Cards from '@/components/Cards';
import jwt from 'jsonwebtoken';
import Footer from '@/components/Footer';

const Page = () => {
  const [userToken, setUserToken] = useState('');
  const [userData, setUserData] = useState('');
  const [cardsData, setCardsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [filteredCardsData, setFilteredCardsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(27);
  const [hasMore, setHasMore] = useState(true);
  const [initFetch, setInitFetch] = useState(false);
  const [searchedCardData, setSearchedCardData] = useState([]);

  useEffect(() => {
    setUserToken(localStorage.getItem('userToken') || undefined);
    setUserData(localStorage.getItem('userData') || undefined);

    const autoLogOut = () => {
      let decoded = jwt.decode(localStorage.getItem('userToken'));
      if (!decoded || !decoded.exp) {
        return true;
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    };

    if (localStorage.getItem('userToken') && autoLogOut()) {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
    }
  }, []);

  const fetchCardsData = useCallback(async (page, perPage, searchString) => {
    setIsLoading(true);

    var payloadBody = JSON.stringify({ page: page, perPage: perPage });

    if (searchString.length > 0) {
      payloadBody = JSON.stringify({ page: page, perPage: perPage, searchString: searchString });
    }

    try {
      const response = await fetch('/api/getCards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payloadBody,
      });

      if (response.ok) {
        const data = await response.json();

        if (searchString.length > 0) {
          setSearchedCardData(data.allCards);
          console.log(searchedCardData);
        } else {
          if (data.allCards.length === 0) {
            setHasMore(false);
          } else {
            setCardsData((prevData) => {
              return prevData ? [...prevData, ...data.allCards] : data.allCards;
            });
            setCurrentPage(page + 1);
          }
        }
      } else {
        console.error('Failed to fetch card data');
      }
    } catch (error) {
      console.error('Error while fetching card data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    // Make an initial API call when the component mounts
    if (initFetch === false) {
      setInitFetch(true);
      fetchCardsData(currentPage, perPage, searchString);
    }
  }, []); // Empty dependency array ensures it runs only once

  const handleInfiniteScroll = () => {
    const scrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    if (scrollY + viewportHeight >= totalHeight - 500 && !isLoading && hasMore && !searchString) {
      fetchCardsData(currentPage, perPage, searchString);
    }
  };


  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, [currentPage, isLoading, hasMore]);

  useEffect(() => {
    const uniqueTagsSet = new Set();

    if (cardsData && Array.isArray(cardsData)) {
      cardsData.forEach((card) => {
        if (card.tags && Array.isArray(card.tags)) {
          card.tags.forEach((tag) => {
            uniqueTagsSet.add(tag.trim());
          });
        }
      });

      setAllTags(Array.from(uniqueTagsSet));
    }
  }, [cardsData]);

  useEffect(() => {
    async function fetchData() {
      if (searchString.length > 0) {
        console.log('Fetching');
        const data = await fetchCardsData(1, 100, searchString);
        setFilteredCardsData(searchedCardData);
        console.log(filteredCardsData);
      } else {
        setFilteredCardsData(cardsData);
      }
    }

    fetchData();
  }, [searchString, cardsData]);


  return (
    <div className='bg-[#F7F7F7] min-h-screen'>
      <div className="sticky top-0">
        <TopBanner />
        <div className='flex justify-center border-b bg-[#FFFFFF]'>
          <Navbar UserData={userData} />
        </div>
      </div>

      <div className='mx-0 flex-col'>
        <div className='flex justify-center'>
          <HeroCard />
        </div>

        <div className='flex justify-center'>
          <TabBar allTags={allTags} />
        </div>
        <div className='flex justify-center'>
          <SearchBar setSearchString={setSearchString} />
        </div>
        <div className='flex justify-center'>
          {searchString.length > 0 ? (
            <Cards cardsData={searchedCardData} setCardsData={setCardsData} />
          ) : (
            <Cards cardsData={filteredCardsData} setCardsData={setCardsData} />
          )}
        </div>

        <div className='flex justify-center bg-white mt-2 border-t'>
          <Footer allTags={allTags} />
        </div>
      </div>
    </div>
  );
}

export default Page;

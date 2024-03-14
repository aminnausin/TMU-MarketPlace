import React, { useState } from 'react'
import LocationPicker from './LocationPicker'
import { RadioGroup } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/solid';

const searchOptions = { availability: ['Available', 'Pending', 'Sold', 'All'], dateRange: ['Any', 'Last 24 Hours', 'Last 7 Days', 'Last 30 Days'], priceRange: {}, prices:  [{ id: 0, name: '$0-$20', min: 0, max: 20, selected: false }, { id: 1, name: '$20-$50', min: 20, max: 50, selected: false }, { id: 2, name: '$50-$100', min: 50, max: 100, selected: false }, { id: 3, name: '$100-$200', min: 100, max: 200, selected: false }]};

export default function SearchSideBar() {
    const [selected, setSelected] = useState("Available");
    const [selectedDateRange, setSelectedDateRange] = useState("Any");
    const [priceRanges, setPriceRanges] = useState([
        { id: 0, name: '$0 - $20', min: 0, max: 20, selected: false }, 
        { id: 1, name: '$20 - $50', min: 20, max: 50, selected: false }, 
        { id: 2, name: '$50 - $100', min: 50, max: 100, selected: false }, 
        { id: 3, name: '$100 - $200', min: 100, max: 200, selected: false }])
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const [priceRangeError, setPriceRangeError] = useState(false);

    const checkPriceRange = (min, max) => {
        if(max < min ) setPriceRangeError(true);
        else setPriceRangeError(false);
    }

    const resetSelectedPrices = () => {
        setPriceRanges(priceRanges.map((mapPrice) => {
            return {...mapPrice, selected: false}
        }));
    }

    const updateSearchPriceRange = () => {
        let selected = 0;
        let min = 2000000;
        let max = 0;
        
        priceRanges.forEach(price => {
            if(price.selected){
                min = Math.min(min, price.min);
                max = Math.max(max, price.max);
                selected ++;
            }
        });
        
        if(selected !== 0){
            setMinPrice(min);
            setMaxPrice(max);
        }
    }

    return (
        <div className={`mx-auto w-[98%] md:w-64 xl:w-80 h-fit shrink-0 m-3 p-4 bg-[#fafafb] rounded-lg shadow-lg border-2 border-gray`}>
            <section className={`w-full space-y-4 md:hidden`}>
                <div className='flex justify-between items-center px-2 rounded-xl shadow-md border-neutral-400/30 hover:bg-sky-400 hover:text-white bg-white p-2 text-lg' onClick={() => { setCollapsed(!collapsed) }}>
                    <Bars3Icon className='h-8 w-8 shrink-0' />
                    <span>Show Search Filters</span>
                </div>
            </section>
            <section className={`w-full space-y-4 mt-6 md:mt-0 md:block ${collapsed ? 'hidden' : ''}`}>
                <div className='w-full flex-col space-y-2'>
                    <h3 className='text-xl'>Price</h3>
                    <section className='flex flex-wrap w-full justify-between items-center'>
                        <div className="relative w-[40%]">
                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none ">$</div>
                            <input type='text' name='minPrice' maxLength={5} className={`ps-7 py-2 rounded-md shadow-md w-full ${priceRangeError ? 'focus:ring-red-600 focus:border-0' : ''}`} placeholder='Min' value={minPrice} 
                                onChange={(e) => { 
                                    let val = parseInt(e.target.value)
                                    resetSelectedPrices();
                                    if(isNaN(val)){
                                        setMinPrice('');
                                        setPriceRangeError(false);
                                        return;
                                    }

                                    setMinPrice(val);
                                    checkPriceRange(val, maxPrice);
                                }
                            }></input>
                        </div>
                        <span className='w-[20%] text-center text-lg'>&mdash;</span>
                        <div className="relative w-[40%]">
                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none ">$</div>
                            <input type='text' name='maxPrice' maxLength={5} className={`ps-7 py-2 rounded-md shadow-md w-full ${priceRangeError ? 'focus:ring-red-600 focus:border-0' : ''}`} placeholder='Max' value={maxPrice} 
                                onChange={(e) => { 
                                    let val = parseInt(e.target.value)
                                    resetSelectedPrices();
                                    if(isNaN(val)){
                                        setMaxPrice('');
                                        setPriceRangeError(false);
                                        return;
                                    }

                                    setMaxPrice(val);
                                    checkPriceRange(minPrice, val);
                                }
                            }></input>
                        </div>
                        {priceRangeError && (
                            <div className={"m-2 text-sm font-medium text-red-600"}>{'Max price is less than minimum.'}</div>
                        )}
                    </section>
                    <section className='w-full bg-inherit space-y-2'>
                        { priceRanges.map((price) => (
                            <div className="flex items-center px-4 py-2 rounded-md hover:bg-gray-100 bg-white shadow-md" key={price.id}>
                                <input id={`price-${price.id}`} type="checkbox" value={price.id} className="w-4 h-4 text-sky-500 bg-gray-100 border-gray-300 focus:ring-sky-500 rounded" checked={priceRanges[price.id].selected} onChange={(e) => {
                                    setPriceRanges(priceRanges.map((mapPrice) => {
                                        if(mapPrice.id === price.id) return {...mapPrice, selected: !(mapPrice.selected)}
                                        else return mapPrice;
                                    }));
                                }}></input>
                                <label htmlFor={`price-${price.id}`} className="py-1 w-full ms-2 text-sm font-medium text-gray-900 rounded">{price.name}</label>
                            </div>
                        ))}
                    </section>
                    <section className='flex w-full justify-end items-center py-2'>
                        <button className="py-1 px-2 rounded-lg hover:bg-sky-600 ring-sky-500 ring-2 text-neutral-900 hover:text-white text-sm" onClick={(e) => {
                            updateSearchPriceRange();
                        }}>
                            Apply Price
                        </button>
                    </section>
                </div>
                <div className='w-full flex-col space-y-2'>
                    <h3 className='text-xl'>Availability</h3>
                    <RadioGroup value={selected} onChange={setSelected} className={"space-y-2"}>
                        {searchOptions.availability.map((option) => (
                            <RadioGroup.Option key={option} value={option} className={({ active, checked }) => `${active ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300' : ''}
                                ${checked ? 'bg-sky-500/75 text-white' : 'bg-white'} relative flex cursor-pointer rounded-lg px-4 py-2 shadow-md focus:outline-none`}>
                                {({ active, checked }) => (
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center text-sm h-6">
                                            <RadioGroup.Label as="p" className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}>
                                                {option}
                                            </RadioGroup.Label>
                                        </div>
                                        {checked && (<div className="shrink-0 text-white"> <CheckIcon className="h-6 w-6" /></div>)}
                                    </div>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </RadioGroup>
                </div>
                <div className='w-full flex-col space-y-2'>
                    <h3 className='text-xl'>Post Time</h3>
                    <RadioGroup value={selectedDateRange} onChange={setSelectedDateRange} className={"space-y-2"}>
                        {searchOptions.dateRange.map((option) => (
                            <RadioGroup.Option key={option} value={option} className={({ active, checked }) => `${active ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300' : ''}
                                ${checked ? 'bg-sky-500/75 text-white' : 'bg-white'} relative flex cursor-pointer rounded-lg px-4 py-2 shadow-md focus:outline-none`}>
                                {({ active, checked }) => (
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center text-sm h-6">
                                            <RadioGroup.Label as="p" className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}>
                                                {option}
                                            </RadioGroup.Label>
                                        </div>
                                        {checked && (<div className="shrink-0 text-white"> <CheckIcon className="h-6 w-6" /></div>)}
                                    </div>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </RadioGroup>
                </div>
                <div>
                    {/* Price distribution graph */}
                </div>
                <div className='space-y-4'>
                    <h3 className='text-xl -mb-2'>Change Location</h3>
                    <LocationPicker />
                </div>
            </section>
        </div>
    )
}


function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
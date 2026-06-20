import React from 'react'

export default function CreateListing() {
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7 '> Create a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-6'>
                <div className='flex flex-col gap-4 flex-1'>
                    <div className='flex flex-col gap-3 '>
                    <input
                        type="text"
                        maxLength='62'
                        minLength='10'
                        required
                        placeholder="Name"
                        className=" px-4 py-2 text-sm text-gray-700 outline-none border placeholder-gray-400 rounded"
                        id='Name'

                    />
                    <textarea
                        type="text"
                        placeholder="Description"
                        className=" rounded  px-4 py-2 text-sm text-gray-700 outline-none border placeholder-gray-400"
                        id='description'
                        required

                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className=" rounded  px-4 py-2 text-sm text-gray-700 outline-none border placeholder-gray-400"
                        id='address'

                    />
                </div>
                <div className='flex gap-6 flex-wrap'>
                    <div className='gap-2'>
                        <input type="checkbox"
                            id='sale'
                            className='w-5'
                        />
                        <span>Sell</span>

                    </div>
                    <div className='gap-2'>
                        <input type="checkbox"
                            id='rent'
                            className='w-5'
                        />
                        <span>Rent</span>
                    </div>
                    <div className='gap-2'>
                        <input type="checkbox"
                            id='parking'
                            className='w-5'
                        />
                        <span>Parking Spot</span>

                    </div>
                    <div className='gap-2'>
                        <input type="checkbox"
                            id='furnished'
                            className='w-5'
                        />
                        <span>Furnished</span>

                    </div>
                    <div className='gap-2'>
                        <input type="checkbox"
                            id='offer'
                            className='w-5'
                        />
                        <span>Offer</span>

                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input type="number"
                            id='bedrooms'
                            min='1'
                            max='10'
                            required
                            className='border rounded p-3 border-gray-300'
                        />
                        <p>Beds</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input type="number"
                            id='baths'
                            min='1'
                            max='10'
                            required
                            className='border rounded p-3 border-gray-300'
                        />
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number"
                            id='regularprice'
                            min='1'
                            max='10'
                            required
                            className='border rounded p-3 border-gray-300'
                        />
                        <div className='flex flex-col items-center'>
                            <p>Regular Price</p>
                            <span className='text-xs' >($/month)</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number"
                            id='discountedprice'
                            min='1'
                            max='10'
                            required
                            className='border rounded p-3 border-gray-300'
                        />
                        <div className='flex flex-col items-center'>
                            <p>Discounted Price</p>
                            <span className='text-xs' >($/month)</span>
                        </div>
                    </div>
                </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>
                            The First image will be the cover
                        </span>
                    </p>
                    <div className='flex gap-4'>
                        <input
                            type='file'
                            id='images'
                            accept='.jpg, .jpeg, .png '
                            multiple
                            className='p-3 border border-gray-300 rounded w-full'
                        />
                        <button
                            className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                        >Upload</button>
                    </div>
                     <button
            
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            Create Listing
          </button>
                </div>
            </form>
        </main>
    )
}

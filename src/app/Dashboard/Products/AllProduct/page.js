import ProductNotFound from '@/Components/Dashboard/Product/ProductNotFound'
import HeaderStatBar from '@/Components/Dashboard/Utility/HeaderStatBar'
import React from 'react'

const AllBlogs = () => {
  return (
    <div>
        <HeaderStatBar location="/Dashboard/Products/CreateProduct" />
        <ProductNotFound/>
    </div>
  )
}

export default AllBlogs

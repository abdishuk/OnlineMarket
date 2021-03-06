import React from 'react'
import{Helmet} from 'react-helmet'

const Meta = ({title='welcome to Online Market',description='we sell the best products for cheap',keywords='electronics,buy electronics,cheap electronics'}) => {
    return (
        <Helmet>
          <title>{title}</title>  
          <meta name='description' content={description}/>
          <meta name='keyword' content={keywords}/>

          
        </Helmet>
    )
}


export default Meta

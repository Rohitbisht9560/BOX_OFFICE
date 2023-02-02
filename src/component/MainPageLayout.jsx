import React, { Children } from 'react'
import Navs from './Navs'
import Title from './Title'

const MainPageLayout = ({children}) => {
  return (
    <div>
        <Title title="BOX OFFICE" subtitle="Are you looking for a movie or an actor"></Title>
      <Navs/>
       {children}
    </div>
  )
}

export default MainPageLayout
import React, { memo, createContext, useState } from 'react'

export const verifiedContext = createContext();

export default memo(function Verfied() {

    const [verified, setVerified ] = useState(false);

  return (
    <verifiedContext.ContextProvider>

    </verifiedContext.ContextProvider>
  )
})

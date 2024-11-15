import React,{createContext} from "react";

export const WalletContext = createContext();

function WalletService({children}) {

    const [address, setAddress] = useState('');

    useEffect(() => {



    }, [address])
 return (
    <WalletContext.Provider>
      {children}
    </WalletContext.Provider>
 );
};

export default
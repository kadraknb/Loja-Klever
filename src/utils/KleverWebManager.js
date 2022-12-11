import { useState } from "react";
import klever from '../providers/klever';

export const fetchBalance = async (setBalance) => {
 
    const amount = await klever.balance();
    const currencyNormalizeMultiplier = Math.pow(10, 6);

    setBalance(amount / currencyNormalizeMultiplier);
  };


export const connectToKlever = async () => {
    const address = await klever.connectWithSdk();
    if (!address.startsWith('klv')) {
      setError(address);
    }    
    setKleverConnected(true);
    setAddress(klever.address);
    await fetchBalance();
  };
import BigNumber from 'bignumber.js';
import { validate } from 'multicoin-address-validator';

// Function to convert Wei to Ether
export const weiToEther = weiValue => {
	const weiAmount = new BigNumber(weiValue);
	const etherAmount = weiAmount.dividedBy('1000000000000000000'); // 1 Ether = 1e18 Wei
	return etherAmount.toFixed(6); // Display with up to 6 decimal places
};

/**
 * Function to check if the address is valid or not
 * @param {*} address 
 * @param {*} addressType 
 * @returns boolean value
 */
export const isAddressValid = (address, addressType) => {
	if (validate(address, addressType)) {
		return true;
	}
	return false;
};
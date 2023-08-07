import React from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default function BankPicker({ onValueChange }) {
  return (
    <SearchableDropdown
      onItemSelect={item => onValueChange(item.name)}
      containerStyle={{ padding: 5 }}
      itemStyle={{
        padding: 10,
        marginTop: 2,
        backgroundColor: '#ddd',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5,
      }}
      itemTextStyle={{ color: '#222' }}
      itemsContainerStyle={{ maxHeight: 140 }}
      items = {[
        { id: 1, name: 'Access Bank Plc' },
        { id: 2, name: 'Citibank Nigeria Limited' },
        { id: 3, name: 'Ecobank Nigeria Plc' },
        { id: 4, name: 'Fidelity Bank Plc' },
        { id: 5, name: 'First Bank Nigeria Limited' },
        { id: 6, name: 'First City Monument Bank Plc' },
        { id: 7, name: 'Globus Bank Limited' },
        { id: 8, name: 'Guaranty Trust Bank Plc' },
        { id: 9, name: 'Heritage Banking Company Ltd.' },
        { id: 10, name: 'Keystone Bank Limited' },
        { id: 11, name: 'Parallex Bank Ltd' },
        { id: 12, name: 'Polaris Bank Plc' },
        { id: 13, name: 'Premium Trust Bank' },
        { id: 14, name: 'Providus Bank' },
        { id: 15, name: 'Stanbic IBTC Bank Plc' },
        { id: 16, name: 'Standard Chartered Bank Nigeria Ltd.' },
        { id: 17, name: 'Sterling Bank Plc' },
        { id: 18, name: 'SunTrust Bank Nigeria Limited' },
        { id: 19, name: 'Titan Trust Bank Ltd' },
        { id: 20, name: 'Union Bank of Nigeria Plc' },
        { id: 21, name: 'United Bank For Africa Plc' },
        { id: 22, name: 'Unity Bank Plc' },
        { id: 23, name: 'Wema Bank Plc' },
        { id: 24, name: 'Zenith Bank Plc' }    
  ]}
  defaultIndex={0}
      resetValue={false}
      textInputProps={{
        placeholder: "Search...",
        underlineColorAndroid: "transparent",
        style: {
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        },
      }}
      listProps={{
        nestedScrollEnabled: true,
      }}
    />
  );
}
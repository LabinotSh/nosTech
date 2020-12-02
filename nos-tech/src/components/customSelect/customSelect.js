import React, { Component } from 'react';
import Select from 'react-select';

const CustomSelect = ({ filtered, onChange }) => {
	const options = [
		// { value: '0', label: '...Filter Courses...' },
		{ value: '1', label: 'Oldest' },
		{ value: '2', label: 'Newest' },
	];

	const customStyles = {
		control: (base, state) => ({
			...base,
			background: '#fff',
			cursor: 'pointer',
			padding: '.3rem',
			borderRadius: state.isFocused ? 3 : 3,
			borderColor: state.isFocused ? '#4D538D ' : '#cdcdcd',
			boxShadow: state.isFocused ? null : null,
			'&:hover': {
				borderColor: state.isFocused ? '#4D538D' : '#4D538D',
			},
		}),
		menu: (base) => ({
			...base,
			borderRadius: '5%',
			hyphens: 'auto',
			marginTop: 0,
			textAlign: 'left',
			wordWrap: 'break-word',
		}),
		menuList: (base) => ({
			...base,
			padding: 0,
		}),
		option: (provided) => ({
			...provided,
			color: '#4D538D',
		}),
	};

	return (
		<Select
			//key={`my_unique_select_key__${filtered.value}`}
			styles={customStyles}
			className="sel-react-com"
			placeholder={'...Filter Courses...'}
			name="form-field-name"
			isClearable
			value={filtered}
			onChange={onChange}
			options={options}
		/>
	);
};

export default CustomSelect;

import { FieldError } from 'react-hook-form/dist/types';
import React from 'react';


const checkErorr = (formError: FieldError[] | FieldError)=> {
	if(Array.isArray(formError)){
		return formError.map((el, index) => <p key={index}>{el.message}</p>);
	} else {
		return <p>{formError.message}</p>;
	}
};


export default checkErorr;

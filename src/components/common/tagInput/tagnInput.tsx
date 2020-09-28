import React, { useState, useEffect } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import {Tag} from "react-tag-input";

import './tagInput.scss';
interface TagInput {
    suggestions: Tag[],
    name: string,
	setValue: Function
}
const KeyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


const TagInput: React.FC<TagInput> = ({suggestions, name, setValue}) => {
	const [tags, setTags] = useState<Tag[]>([]);

	const deleteTag = (i: number): void =>{
		setTags(tags.filter((tag, index) => index !== i));
	};

	const addTag = (tag: Tag): void  => {
        setTags([...tags, tag]);
	};
	
	useEffect(() => {
			setValue(tags);
        },
		[tags]);

	return <ReactTags
		tags={tags}
        name={name}
		suggestions={suggestions}
		handleDelete={deleteTag}
		handleAddition={addTag}
		delimiters={delimiters} />;
};

export  default TagInput;

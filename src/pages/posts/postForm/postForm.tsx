import React  from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useState, useEffect } from 'react';
import TagInput from '../../../components/common/tagInput/tagnInput';
import * as yup from 'yup';
import { Editor } from '@tinymce/tinymce-react';
import MultiSelect from 'react-multi-select-component';
import checkErorr from '../../../utils/checkError';

import {getUsers, deleteUser, createUser} from '../../../api/rest/userAPI';
import {loginUser} from '../../../api/rest/auth';
import './postForm.scss';
import { Option } from 'react-multi-select-component/dist/lib/interfaces';
import {graphClient} from "../../../api/graphql/graphql";
import {SIGN_IN_USER} from  "../../../api/graphql/mutations/auth"

const SUPPORTED_FORMATS = [
	'image/jpg',
	'image/jpeg',
	'image/gif',
	'image/png',
];

const SUGGESTIONS = [
	{ id: 'electro', text: 'electro' },
	{ id: 'indie', text: 'indie' },
]

type FormData = {
    postTitle: string,
	songTitle?: string,
	sonCloudUrl?: string,
	youtubeUrl?: string,
	spotifyUrl?: string,
	appleMusicUrl?: string,
	deezerUrl?: string,
	amazonMusicUrl?: string,
	tidalUrl?: string,
	googlePlayUrl?: string,
    mainArtist?: Option[],
	musicTags?: MusicTags[],
	featureArtists?: Option[],
    description?: string,
	imageCover?: unknown,
	otherUrls?: Array<{ label: string; url: number }>,
	newArtist?: Array<{ artistType: string; artistName: string; facebookUrl: string; twitterUrl: string; instagramUrl: string }>
}

interface MusicTags {
	id: string,
	text: string
}

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];
const PostDataSchema  = yup.object().shape({
	postTitle: yup.string().required(),
	songTitle: yup.string(),
	sonCloudUrl: yup.string().url(),
	youtubeUrl: yup.string().url(),
	spotifyUrl: yup.string().url(),
	appleMusicUrl: yup.string().url(),
	deezerUrl: yup.string().url(),
	amazonMusicUrl: yup.string().url(),
	tidalUrl: yup.string().url(),
	googlePlayUrl: yup.string().url(),
	musicTags: yup.array().of(yup.object().shape({ id: yup.string(), name: yup.string() })),
	mainArtist: yup
		.array()
		.of(yup.number()),
	featureArtists: yup
		.array()
		.of(yup.string()),
	description: yup.string(),
	imageCover:  yup.mixed()
		.test(
			'fileFormat',
			'Unsupported Format',
			value =>  value ? SUPPORTED_FORMATS.includes(value.type) : true,
		),
	otherUrls: yup.array().of(yup.object().shape({ label: yup.string(), url: yup.string().url().required() })),
	newArtist: yup.array().of(yup.object().shape({
		artistType: yup.string().required(),
		artistName: yup.string().required(),
		facebookUrl: yup.string().url(),
		twitterUrl: yup.string().url(),
		instagramUrl: yup.string().url(),
	})),

});


const PostForm: React.FC = () => {


	const { register, handleSubmit, errors , control ,setValue, triggerValidation } = useForm<FormData>({
		validationSchema: PostDataSchema,
	});

	const { fields:otherUrlsFields, append: otherUrlsAppend, remove: otherUrlsRemove } = useFieldArray({
		control,
		name: 'otherUrls',
	});
	const { fields:newArtistField, append: newArtistAppend, remove: newArtistRemove } = useFieldArray({
		control,
		name: 'newArtist',
	});

	const [editorContent, setContent] = useState<string>('');
	const [artists, setMainArtits] = useState<Option[]>( [] );
	const [featureArtists, setfeatureArtists] = useState<Option[]>([]);
	const [coverFile, setCoverFileName] = useState<string>('Please select file');

	const submitPost = handleSubmit((data: FormData): void => {
		console.log(data);
		console.log(errors);
	});

	const handleEditorChange = (content: string): void=> {
		setValue('description', content);
		setContent(content);
	};

	const handleTagChange = (tags: MusicTags[]): void=> {
		console.log(tags);
		setValue('musicTags', tags);
	};
	

	const handleMainArtistChange = (selectedOption: Option[]): void=> {
		setValue('mainArtist', selectedOption);
		setMainArtits( selectedOption );
	};

	const handleFeatureArtists = (selectedOption: Option[]): void => {
		setValue('featureArtists', selectedOption);
		setfeatureArtists(selectedOption) ;

	};
	const handleImageChange = async (e: React.BaseSyntheticEvent<Event>) => {
		let coverFile = e.currentTarget.files[0];
		setValue('imageCover', coverFile);
		setCoverFileName(coverFile ? coverFile.name : 'Please select file');
		await triggerValidation('imageCover');
	};
	
	const addNewUrl = (e: React.MouseEvent) => {
		e.preventDefault();
		otherUrlsAppend({ label: '', url: '' });
	};
	
	const removeNewUrl = (index: number) => {
		otherUrlsRemove(index);
	};
	const addNewArtist = (e: React.MouseEvent) => {
		e.preventDefault();
		newArtistAppend({ label: '', url: '' });
	};

	const removeArtist = (index: number) => {
		newArtistRemove(index);
	};

	const handleGqlLogin = () => {
		graphClient
			.mutate({
				mutation: SIGN_IN_USER,
				variables: { email: "test@test.com", password: "test123" },
			})
			.then((response) => console.log(response.data))
			.catch((err) => console.error(err));
	};

	const createPost = (postData) => {
		const {post, artist, song} = postData;

		return createArtist((artist))
			.then(({ data }) => createSong(song, data.id))
			.then(({ data }) => createPost(post, data.id))
			.catch(err => console.log(err));

	}

	useEffect(() => {
		register({ name: 'description' });
		register({ name: 'mainArtist' });
		register({ name: 'featureArtists' });
		register({ name:'imageCover' });
		register({ name: 'musicTags' });
	}, [register]);

	return <div className='post-form'>
		<button onClick={() => createUser()}>TestAPI</button>
		<button onClick={() => loginUser()}>login</button>
		<button onClick={() => handleGqlLogin()}>login graph</button>
		<form onSubmit={submitPost}>
			<div className={'form-group'}>
				<label form={'postTitle'} >Post Title</label>
				<input name="postTitle" type="text" ref={register}  id={'postTitle'} className={'form-control'}/>
				{errors.postTitle && checkErorr(errors.postTitle)}
			</div>
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<span className="input-group-text">Upload</span>
				</div>
				<div className="custom-file">
					<input name="imageCover" type="file" id={'imageCover'} className={'form-control'} accept="image/*"
						onChange={handleImageChange}
					/>
					<label className="custom-file-label" htmlFor="imageCover">{coverFile}</label>
				</div>
				{errors.imageCover && checkErorr(errors.imageCover)}
			</div>
			<div className={'form-group'}>
				<label form={'songTitle'} >Song Title</label>
				<input name="songTitle" type="text" id={'songTitle'} className={'form-control'}/>
				{errors.songTitle && checkErorr(errors.songTitle)}
			</div>
			<div className={'form-group'}>
				<label form={'musicTags'} >Music Tags</label>
				<TagInput name={'musicTags'} setValue={handleTagChange}  suggestions={SUGGESTIONS}/>
			</div>
			<div className={'form-group'}>
				<label form={'sonCloudUrl'} >Sound Embed</label>
				<input name="sonCloudUrl" type="text" ref={register}  id={'sonCloudUrl'} className={'form-control'}/>
				{errors.sonCloudUrl && checkErorr(errors.sonCloudUrl)}
			</div>
			<div className={'form-group'}>
				<label form={'youtubeUrl'} >Youtube Embed</label>
				<input name="youtubeUrl" type="text" ref={register}  id={'youtubeUrl'} className={'form-control'}/>
				{errors.youtubeUrl && checkErorr(errors.youtubeUrl)}
			</div>
			<div className={'form-group'}>
				<label form={'spotifyUrl'} >Spotify Embed</label>
				<input name="spotifyUrl" type="text" ref={register}  id={'spotifyUrl'} className={'form-control'}/>
				{errors.spotifyUrl && checkErorr(errors.spotifyUrl)}
			</div>
			<div className={'form-group'}>
				<label form={'appleMusicUrl'} >Apple Music</label>
				<input name="appleMusicUrl" type="text" ref={register}  id={'appleMusicUrl'} className={'form-control'}/>
				{errors.appleMusicUrl && checkErorr(errors.appleMusicUrl)}
			</div>
			<div className={'form-group'}>
				<label form={'deezerUrl'} >Deezer</label>
				<input name="deezerUrl" type="text" ref={register}  id={'deezerUrl'} className={'form-control'}/>
				{errors.deezerUrl && checkErorr(errors.deezerUrl)}
			</div>
			<div className={'form-group'}>
				<label form={'amazonMusicUrl'} >Amazon Music</label>
				<input name="amazonMusicUrl" type="text" ref={register}  id={'amazonMusicUrl'} className={'form-control'}/>
				{errors.amazonMusicUrl && checkErorr(errors.amazonMusicUrl)}
			</div>
			<div className={'form-group'}>
				<label form={'tidalUrl'} >Tidal</label>
				<input name="tidalUrl" type="text" ref={register}  id={'tidalUrl'} className={'form-control'}/>
				{errors.tidalUrl && checkErorr(errors.tidalUrl)}
			</div>
			<div className={'form-group'}>
				<label form={'googlePlayUrl'} >Google Play</label>
				<input name="googlePlayUrl" type="text" ref={register}  id={'googlePlayUrl'} className={'form-control'}/>
				{errors.googlePlayUrl && checkErorr(errors.googlePlayUrl)}
			</div>
			{otherUrlsFields.map((item, index) => {
				return (

					<div key={item.id} className='row'>
						<div className='col'>
							<label form={`otherUrls[${index}].label`} >Url Label</label>
							<input
								name={`otherUrls[${index}].label`}
								ref={register()}
								className='form-control'
							/>
						</div>
						<div className='col'>
							<label form={`otherUrls[${index}].url`} >Url</label>
							<input
								name={`otherUrls[${index}].url`}
								ref={register()}
								className='form-control'
							/>
						</div>
						<div className='col d-flex align-items-end'>
							<button className='btn btn-secondary btn-block' onClick={() => removeNewUrl(index)}>
								Delete
							</button>
						</div>
						{errors.otherUrls && errors.otherUrls[index] ?  <p>Please provide proper url format or delete field</p> : ''}
					</div>
				);
			})}
			<button
				className='btn btn-primary'
				onClick={addNewUrl}
			>
				Add
			</button>
			<div className={'form-group'}>
				<label form={'mainArtist'} >Artist</label>
				<MultiSelect
					options={options}
					value={artists}
					onChange={handleMainArtistChange}
					labelledBy={'Select'}
				/>
				{errors.mainArtist && checkErorr(errors.mainArtist)}
			</div>
			<div className={'form-group'}>
				<label form={'featureArtists'} >Feature Author</label>
				<MultiSelect
					options={options}
					value={featureArtists}
					onChange={handleFeatureArtists}
					labelledBy={'Select'}
				/>
				{errors.featureArtists && checkErorr(errors.featureArtists)}
			</div>
			{newArtistField.map((item, index) => {
				return (

					<div key={item.id}>
						<div className="form-check">
							<input className="form-check-input"
								type="radio"
								value="mainArtist"
								name={`newArtist[${index}].artistType`}
								ref={register()}/>
							<label className="form-check-label" htmlFor={`newArtist[${index}].artistType`}>
									Main Artist
							</label>
						</div>
						<div className="form-check">
							<input className="form-check-input"
								type="radio"
								value="featureArtist"
								name={`newArtist[${index}].artistType`}
								ref={register()}
							/>
							<label className="form-check-label" htmlFor={`newArtist[${index}].artistType`}>
									Feature Artist
							</label>
						</div>
						<div className={'form-group'}>
							<label form={`newArtist[${index}].artistName`} >Artist Name</label>
							<input name={`newArtist[${index}].artistName`} type="text" ref={register}  id={`newArtist[${index}].artistName`} className={'form-control'}/>
						</div>
						<div className={'form-group'}>
							<label form={`newArtist[${index}].facebookUrl`} >Facebook Url</label>
							<input name={`newArtist[${index}].facebookUrl`} type="text" ref={register}  id={`newArtist[${index}].facebookUrl`} className={'form-control'}/>
						</div>
						<div className={'form-group'}>
							<label form={`newArtist[${index}].twitterUrl`} >Twitter Url</label>
							<input name={`newArtist[${index}].twitterUrl`} type="text" ref={register}  id={`newArtist[${index}].twitterUrl`}  className={'form-control'}/>
						</div>
						<div className={'form-group'}>
							<label form={`newArtist[${index}].instagramUrl`}  >Instagram Url</label>
							<input name={`newArtist[${index}].instagramUrl`} type="text" ref={register}  id={`newArtist[${index}].instagramUrl`} className={'form-control'}/>
						</div>
						<div className='col d-flex'>
							<button className='btn btn-secondary btn-block' onClick={() => removeArtist(index)}>
								Delete
							</button>
						</div>
						{errors.newArtist && errors.newArtist[index] ?  <p>Please check if you choose artist type nad put name</p> : ''}
					</div>
				);
			})}
			<button
				className='btn btn-primary'
				onClick={addNewArtist}
			>
				Add
			</button>
			<div className={'form-group'}>
				<label form={'description'} > Description</label>
				<Editor textareaName={'description'} id='description' value={editorContent}
					onEditorChange={handleEditorChange}
				/>
				{errors.description && <p>{errors.description.message}</p>}
			</div>

			<button type="submit" className={'btn btn-primary'} >Create Post</button>
		</form>
	</div>;

};


export default PostForm;

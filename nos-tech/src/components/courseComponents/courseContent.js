import React, { useState, useEffect} from 'react';
import CourseItem from '../../screens/courses/CourseItem';
import './courseComponent.css';
import LoadMore from '../loadMore/LoadMore';
import SearchBar from '../../components/searchBar/searchBar';
import { connect } from 'react-redux';
import Tags from '../../components/courseTags/Tags';
import CustomSelect from '../../components/customSelect/customSelect';

const CourseContent = ({ list }) => {
	const [items, setItems] = useState(['']);
	const [visible, setVisible] = useState(9);
  const [filtered, setFiltered] = useState('');
  
	const [filterText, setFilterText] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');
  
	const onSelectChange = (option) => {
		if (!option) {
			setFiltered('');
		} else {
			setFiltered(option.value);
			console.log('Selected: ' + option.value);

			if (option.value === '1') {
				results.sort((a, b) => {
					return new Date(a.createdAt) - new Date(b.createdAt);
				});
			} else if (option.value === '2') {
				results.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt);
				});
			} else if(option.value === '0'){
        results.sort((a,b) => {
          return b.users.length - a.users.length;
        });
			}
		}
	};

	const handleChange = (e) => {
		setFilterText(e.target.value);
	};

	//Make the search appear after 1 seconds and not immediately as the user is typing
	useEffect(() => {
		const timeOutId = setTimeout(() => setDisplayMessage(filterText), 1000);
		return () => clearTimeout(timeOutId);
	}, [filterText]);

	const results = !displayMessage
		? items
		: items.filter((course) => course.name.toLowerCase().includes(displayMessage.toLocaleLowerCase()));

	// Load more function
	const loadMore = () => {
		setVisible((prevValue) => prevValue + 3);
	};

	useEffect(() => {
		if (list) {
      setItems(list.filter((x) => x.status === 1).reverse());
		}
	}, [list]);

	return (
		<>
			<Tags />
			<div className="title-and-search-courses">
				<div className="text-center courses-headline-cont">
					<p className="courses-headline">NosTech All Courses</p>
					<hr />
				</div>

				<div className="container-fluid search-bar-div-cont">
					<div className="row no-gutters">
						<div className="col-xs-2 col-lg-4"></div>
						<div className="col-xs-5 col-lg-3 mt-1">
							<CustomSelect filtered={filtered.value} onChange={onSelectChange} />
						</div>
						<div className="col-xs-5 col-lg-2">
							<SearchBar input={filterText} onChange={handleChange} className="search-bar-cont" />
						</div>
					</div>
				</div>
			</div>
			{/* test */}
			<div className="container row mx-auto">
				{!results.length && (
					<div className="container-fluid mt-4 mb-5 bg-light-gray">
						<div className="row">
							<div className="col-sm-12">
								<div className="text-info text-center nofav">No items match your search criteria!</div>
							</div>
						</div>
					</div>
				)}
				{results.slice(0, visible).map((item, idx) => {
					return (
						<div className="course-content-items" key={idx}>
							<CourseItem course={item} key={idx} />
						</div>
					);
				})}
			</div>
			{visible < items.length && <LoadMore loadMore={loadMore} />}
		</>
	);
};

const mapStateToProps = (state) => ({
  list: state.courses.courses,
});

export default connect(mapStateToProps)(CourseContent);

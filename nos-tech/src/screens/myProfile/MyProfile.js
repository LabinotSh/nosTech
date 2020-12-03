import React, { useState } from 'react';
import './my-profile.css';
import PersonalInfo from '../../components/personal-info/PersonalInfo';
import Password from '../../components/password/Password';
import AccountSettings from '../../components/account-settings/AccountSettings';

import { Tabs, Tab } from 'react-bootstrap';

const MyProfile = () => {
	const [key, setKey] = useState('Personal Information');

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-3"></div>
				<div className="col-sm-6">
					<div className="forum-div-child">
						<Tabs id="controlled-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
							<Tab eventKey="Personal Information" title="Personal Information">
								<PersonalInfo />
							</Tab>
							<Tab eventKey="Password" title="Password">
								<Password />
							</Tab>
							<Tab eventKey="Account Settings" title="Account Settings">
								<AccountSettings />
							</Tab>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyProfile;

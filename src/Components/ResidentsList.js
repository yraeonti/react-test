import React from 'react';

function ResidentsList({resident}) {
	return (
		<div className="pa-10 mt-10 w-75">
			<div className="font-weight-bold text-center">Residents List</div>
			<ul className="mt-10 styled w-50 mx-auto" data-testid="residentsNameList">
				{resident.length===0?<li>No data</li>: 
				resident.map((eachResident,residentId)=>
				<li key={residentId} className="slide-up-fade-in">
				{eachResident.name}
			</li>)
			}

				
			</ul>
		</div>
	);
}

export default ResidentsList;

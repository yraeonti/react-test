import React from 'react';

function Error({error}) {
	return <div>

{ error?
	<div data-testid="errorMsg" className="alert error mt-20 slide-up-fade-in">{error}</div>
	:
	""
}
	</div>
	
}
// 
export default Error;

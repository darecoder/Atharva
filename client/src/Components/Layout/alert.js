import React,{useContext} from 'react';
 import AlertContext from '../../Context/Alert/alertContext';

const Alert=()=>{
	const alertContext=useContext(AlertContext);

		return(
			alertContext.alert!==null&&(<div className={`alert ${alertContext.alert.text}`}>
					<span><i className='fas fa-info-circle'/> {alertContext.alert.msg}</span>
				</div>
					)
		)
}
export default Alert;
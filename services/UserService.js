import axios from 'axios';

const getUserByFilters = async (query) => {
    const token = localStorage.getItem('token');
    try{
        const response = await axios.get('http://localhost:3001/api/v1/users/findUsers', {
	    headers : {
		token,

	    },
	    params : {
		...query
	    }
        });
        return response.data.message;
    }catch (e) {
        console.error(e);
        return false;
    }
}


const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    try {
	const response = await axios.get('http://localhost:3001/api/v1/users/getAllUsers', {
	    headers : {
		token,
	    }
	});


        return response;

    } catch (e) {
	console.error(e);
	return false;

    }
}

const bulkUsers = async (bulk) => {
    const token = localStorage.getItem('token');
   
    try {
	const response = await axios.post('http://localhost:3001/api/v1/users/bulkCreate', bulk ,{
	    headers : {
		token,
	    }
	    
    });
        
	return response.data.message;
    } catch (e) {
	console.error(e);
	return false;

    }

}

export default {getAllUsers, getUserByFilters,bulkUsers};























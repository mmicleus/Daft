export let jsonResponse;
const HousesForSaleQueryUrl = 'https://us-real-estate.p.rapidapi.com/v2/for-sale';

export let queryParameters = 
    {
        offset: '42' ,
        limit: '42',
        state_code:'MI',
        city:'Detroit',
        location:null,
        sort:null,
        price_min:null,
        
        price_max:null,
        beds_min:null,
        beds_max:null,
        baths_min:null,
        baths_max:null,
        property_type:null,
        property_type_nyc_only:null,
        new_construction:null,
        hide_pending_contingent:null,
        has_virtual_tours:null,
        has_3d_tours:null,
        hide_foreclosure:null,
        price_reduced:null,
        open_house:null,
        keywords:null,
        no_hoa_fee:null,
        hoa_max:null,
        days_on_realtor:null,
        expand_search_radius:null,
        include_nearby_areas_slug_id:null,
        home_size_min:null,
        home_size_max:null,
        lot_size_min:null,
        lot_size_max:null,
        home_age_max:null,
        stories:null,
        garage:null,
        heating_cooling:null,
        inside_rooms:null,
        outside_features:null,
        lot_views:null,
        community_ammenities:null,
        features_in_nyc_only:null
    };



async function makeRequest(url){
    // const url = 'https://us-real-estate.p.rapidapi.com/v2/for-sale?offset=0&limit=42&state_code=MI&city=Detroit&sort=newest';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '37256c6cb7msh9b684b1ec1f3258p178571jsnc1f57c4545a6',
		'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	jsonResponse = await response.json();
    return jsonResponse.data.home_search.results;
	// const properties = jsonResponse.data.home_search.results;
    // renderProperties(properties)
    // updatePageIndexes();
} catch (error) {
	console.error(error);
}
}

export async function getProperties(){
   return makeRequest(getQueryUrl(queryParameters));
}

function getQueryUrl(queryParameters){
    let result = HousesForSaleQueryUrl;
    result = result + '?';
    let parameters=[];
    
    for(let key in queryParameters){
        if(!queryParameters[key]) continue;
        parameters.push(`${key}=${queryParameters[key]}`)
    }

    result = result + parameters.join('&');

    return result;
}
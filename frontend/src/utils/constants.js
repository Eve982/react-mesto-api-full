const BASE_URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 
"http://localhost:3000" :
"https://api.eve982.pet-project.nomoredomains.work/";

export default BASE_URL;

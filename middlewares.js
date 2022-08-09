
const validator = (data)=>{
        if(data.title || data.text || data.author !== ''){
            return 'newPost.ejs'
        }else{
            return 'error.ejs';
        }
};

module.exports = validator;
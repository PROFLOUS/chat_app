if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
const getId =(app)=>{
    var id = localStorage.getItem('user')
app.get('/',  (req, res) => {
    const uid =  req.headers.authorization;
    
     localStorage.setItem('user',uid)
     
 });
 return id;
}

module.exports = getId;
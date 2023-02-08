const demo = require('./demo-router');
const product_router = require('./product-router');
let router = {
    '/student' : (req, res)=>{
        console.log('student');
    }
}
router = {...router, ...demo};
router = {...router, ...product_router};
console.log(router);
module.exports = router;
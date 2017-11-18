// load module dependncies 
var DB = require('../DB');

module.exports = function authenticate(opts){
    
    return function middleware(req, res, next){
        // 1. retrive Authorization header

        var authorization = req.get('Authorization');

        if(!authorization){
            res.status(403);
            res.json({
                status : 403,
                type: 'AUTHENTICATION_ERROR',
                message: 'You jock to much'
            });
            return;
        }

        var authParts = authorization.split(' ');

        if(authParts[0] !== 'bearer'){
            res.status(403);
            res.json({
                status : 403,
                type: 'AUTHENTICATION_ERROR',
                message: 'Wrong authentication schema'
            });
        }

        var isAhut = false;
        
        DB.authors.forEach(function(author) {
          if (author.token === authParts[1]){
              isAhut = true;
              return;
          }  
        });

        if (!isAhut){
            res.status(403);
            res.json({
                status : 403,
                type: 'AUTHENTICATION_ERROR',
                message: 'Wrong authentication credentials'
        });
    }else{
        next();
    }
    };

}
import jwt from 'jsonwebtoken';



export const generateJWT = ( uid, name ) => {

    // Creamos nuestro payload
    const myPayload = { uid, name };

    return new Promise( (resolve, reject) => {

        jwt.sign(myPayload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {
    
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            };

        });

    });
};
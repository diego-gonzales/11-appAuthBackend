import express from 'express';
import jwt from 'jsonwebtoken';


export const validateJWT = (req, res=express.response, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            mesagge: 'Token not provided'
        });
    };


    try {
        // el verify devuelve el payload, en este caso lo desestructuramos
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );

        // le agregamos a la request los campos que queremos, en este caso solo ui y name, ya que los objetos en JS pasan por referencia
        req.uid = uid;
        req.name = name;

    } catch (error) {
        // es importante tomar en cuenta la palabra return si queremos que se ejecuten o no las siguientes lineas de codigo
        return res.status(401).json({
            ok: false,
            mesagge: 'Invalid Token'
        });
    };

    // Todo OK!
    next();

};
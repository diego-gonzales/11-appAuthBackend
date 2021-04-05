import express from 'express'; // esto es solo para darle el tipado al response
import bcrypt from 'bcryptjs';
import { generateJWT } from '../helpers/jwt.js'
import { UserModel } from '../models/User.model.js';


// POST new user
export const postNewUser = async (req, res = express.response) => {

    const { name, email, password } = req.body;

    try {

        // Verificamos que no haya un email existente
        const emailExist = await UserModel.findOne({ email });
        if (emailExist) {
            return res.status(400).json({
                ok: false,
                mesagge: 'Email is already registered'
            });
        };

        const newUser = new UserModel( req.body );

        // Hasheamos la contraseña del nuevo usuario antes de guardarla en la base de datos
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        // Generamos un JWT
        const token = await generateJWT( newUser.id, name );

        // Guardamos al nuevo usuario en la base de datos
        await newUser.save();

        // Finalmente mandamos respuesta exitosa (podemos mandar status 201 o dejar el 200 por defecto)
        res.json({
            ok: true,
            uid: newUser.id,
            name,
            email,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mesagge: 'Error, please talking to your administrator'
        });
        // next();
    };
};


// POST login user
export const postLoginUser = async (req, res = express.response) => {

    const { email, password } = req.body;

    try {

        const user = await UserModel.findOne({ email });

        // Validamos si existe el email en la base de datos
        if ( !user ) {
            return res.status(400).json({
                ok: false,
                mesagge: 'Invalid Email'
            });
        };

        // Confirmamos si el password hace match
        const passwordMatch = bcrypt.compareSync( password, user.password );
        if ( !passwordMatch ) {
            return res.status(400).json({
                ok: false,
                mesagge: 'Invalid Password'
            });
        };

        // Si todo va bien entonces generamos su token
        const token = await generateJWT( user.id, user.name );

        // Finalmente mandamos respuesta exitosa
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            email,
            token
        });

    } catch (error) {
        console.log(error);
        // next();
    };
};


// GET renew token
export const getRenewToken = async (req, res = express.response) => {

    // ---aqui actuaria el middleware validate-jwt----

    // esto se hace una vez pasado el middleware personalizado que valida JWT
    const { uid, name } = req;

    // esta linea de codigo va a servir para poder traer el email del usuario, ya que mi token no tiene ese campo en el payload
    const user = await UserModel.findById(uid);

    // generamos un nuevo JWT
    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        uid,
        name,
        email: user.email, 
        token
    });

};
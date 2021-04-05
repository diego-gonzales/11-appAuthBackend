import expressvalidator from 'express-validator';


// Este es un middleware que validará los campos
export const validateMyFields = ( req, res, next ) => {

    // validacion con express-validator que valida los campos de name, email y password
    const errors = expressvalidator.validationResult( req );
    // console.log(errors);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            error: errors.mapped()
        });
    };

    // Todo OK!
    next(); // importante colocarlo para que pase siguiente middleware
};
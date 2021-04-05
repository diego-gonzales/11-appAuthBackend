import mongoose from 'mongoose';


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Connection Success!!!');

    } catch (error) {
        console.log(error);
        throw new Error('DB Connection error');
    };
};


export default dbConnection;
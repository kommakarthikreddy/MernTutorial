const config = {
    env : process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000, 
    mongoUri:  
            'mongodb://localhost:27017/mernproject',
    jwtSecret: process.env.JWT_SECRET || '..................'
}

export default config

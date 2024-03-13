type EnvKeys = {
    PORT?: number
    MYSQL_DB_HOST: string,
    MYSQL_DB_USERNAME: string,
    MYSQL_DB_PASSWORD: string,
    MYSQL_DB_NAME: string,
}

export const envKeys = (): EnvKeys => {
    if (process.env.ENV === 'STG') {
        return {
            MYSQL_DB_HOST: process.env.STG_MYSQL_DB_URL || '',
            MYSQL_DB_USERNAME: process.env.STG_MYSQL_DB_USERNAME || '',
            MYSQL_DB_PASSWORD: process.env.STG_MYSQL_DB_PASSWORD || '',
            MYSQL_DB_NAME: process.env.STG_MYSQL_DB_NAME || '',
        }
    }

    return {
        PORT: Number(process.env.PORT) || 3000,
        MYSQL_DB_HOST: process.env.LCL_MYSQL_DB_URL || '',
        MYSQL_DB_USERNAME: process.env.LCL_MYSQL_DB_USERNAME || '',
        MYSQL_DB_PASSWORD: process.env.LCL_MYSQL_DB_PASSWORD || '',
        MYSQL_DB_NAME: process.env.LCL_MYSQL_DB_NAME || '',
    }
}
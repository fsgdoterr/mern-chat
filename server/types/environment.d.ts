export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            MONGO_URL: string;
            API_URL: string;
            CLIENT_URL: string;
            ACCESS_SECRET: string;
            REFRESH_SECRET: string;
            API_VERSION: string;
            SMTP_HOST: string;
            SMTP_PORT: string;
            SMTP_USER: string;
            SMTP_PASS: string;
            APP_NAME: string;
        }
    }
}
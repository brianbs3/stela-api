module.exports = {
    'secret': 'D6A5757D-0261-4F17-9AC2-D09C14C1FD3E',
    //DB: process.env.DB_URL,
    DB: 'mysql://stela:bs@10.10.10.12/stela', 
    //DB: 'mysql://stela:bs@192.168.0.81/stela',
    DB: process.env.DB_URL,
    CONTACTEMAIL: 'brianbs3@gmail.com',
    TOKENEXPIRETIME: 60 * 60 * 24       // 24 hours
};

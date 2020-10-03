const dbContext       = require('../config/db.config');

exports.getEmailList = async(email) => 
{
    let emailList = await dbContext.sequelize.query(
        ' select email \
            from hairdressing_salons \
            where email = :email\
        union \
        select email \
            from haircut_platform_accounts \
            where email = :email\
        union  \
        select email \
            from facebook_accounts \
            where email = :email\
        union  \
        select email \
            from google_accounts \
            where email = :email',
        {
            replacements: { 
                email: email
            },
            type: dbContext.sequelize.QueryTypes.SELECT
        },
    );
    return emailList;
}
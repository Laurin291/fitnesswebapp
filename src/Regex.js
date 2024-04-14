export const validTrainingsplanname = new RegExp(
    '^[a-zA-Z0-9üÜäÄöÖ/_ ]+$'
);

export const validTagesbezeichnung = new RegExp(
    '^[a-zA-Z0-9üÜäÄöÖ/_ ]+$'
);

export const validfirstName = new RegExp('^[a-zA-Z]+$')
export const validlastName = new RegExp('^[a-zA-Z]+$')
export const validemail = new RegExp('^\\b[A-Za-z0-9._%+-]+@[A-Za-z.-]+\\.[A-Za-z]{2,4}\\b')

export const validpassword=new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')

export const validgewicht = new RegExp('^[0-9]{1,4}[.]?[0-9]?$')





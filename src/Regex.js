export const validTrainingsplanname = new RegExp(
    '^[a-zA-Z0-9_ ]+$'
);
export const validTagesbezeichnung = new RegExp('^[a-zA-Z0-9/_ ]+$')

export const validfirstName = new RegExp('^[a-zA-Z]+$')
export const validlastName = new RegExp('^[a-zA-Z]+$')
export const validemail = new RegExp('^\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}\\b')

export const validpassword=new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\]).{8,32}$')



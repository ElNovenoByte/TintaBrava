package org.novenobyte.tintabrava.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }

    /*public UserNotFoundException(String correo) { super("Not found user with email: " + correo); }

    public UserNotFoundException(String telefono) { super("Not found user with phone: " + telefono); }*/
}

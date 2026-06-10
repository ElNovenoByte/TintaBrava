package org.novenobyte.tintabrava.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }

    /*public UserNotFoundException(String correo) { super("Not found user with email: " + correo); }

    public UserNotFoundException(String telefono) { super("Not found user with phone: " + telefono); }*/
}

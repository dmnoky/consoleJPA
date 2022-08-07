package sberJPA.service.user;

import sberJPA.model.user.User;
import sberJPA.service.MainService;

import java.util.List;

public interface UserService<T extends User> extends MainService<T> {
    List<T> getUsers(Integer begin, Integer end);
    List<T> getUsersOrderByDESC(Integer begin, Integer end);
    int getCountRows();
}

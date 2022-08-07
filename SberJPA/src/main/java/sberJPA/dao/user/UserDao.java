package sberJPA.dao.user;

import sberJPA.dao.MainDao;
import sberJPA.model.user.User;

import java.util.List;

public interface UserDao<T extends User> extends MainDao<T> {
    List<T> getUsers(Integer begin, Integer end);
    List<T> getUsersOrderByDESC(Integer begin, Integer end);
    int getCountRows();
}

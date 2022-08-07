package sberJPA.service.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sberJPA.dao.user.UserDao;
import sberJPA.model.user.ChildC;

import java.util.List;

@Service
public class ChildServiceImpl implements UserService<ChildC> {
    private UserDao<ChildC> childDao;

    public void setChildDao(UserDao<ChildC> childDao) {
        this.childDao = childDao;
    }

    @Override
    @Transactional
    public ChildC add(ChildC childC) {
        return childDao.add(childC);
    }

    @Override
    @Transactional
    public void update(ChildC childC) {
        childDao.update(childC);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        childDao.remove(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ChildC getById(Long id) {
        return childDao.getById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChildC> getAll() {
        return childDao.getAll();
    }

    @Override
    @Transactional(readOnly=true)
    public List<ChildC> getUsers(Integer begin, Integer end) {
        return this.childDao.getUsers(begin, end);
    }

    @Override
    @Transactional(readOnly=true)
    public List<ChildC> getUsersOrderByDESC(Integer begin, Integer end) {
        return this.childDao.getUsersOrderByDESC(begin, end);
    }
    
    @Override
    @Transactional(readOnly=true)
    public int getCountRows(){
        return this.childDao.getCountRows();
    }
}

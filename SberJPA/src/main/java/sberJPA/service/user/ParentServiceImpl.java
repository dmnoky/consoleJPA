package sberJPA.service.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sberJPA.dao.user.UserDao;
import sberJPA.model.user.ParentC;

import java.util.List;

@Service
public class ParentServiceImpl implements UserService<ParentC> {
    private UserDao<ParentC> parentDao;

    public void setParentDao(UserDao<ParentC> parentDao) {
        this.parentDao = parentDao;
    }

    @Override
    @Transactional
    public ParentC add(ParentC parentC) {
        return parentDao.add(parentC);
    }

    @Override
    @Transactional
    public void update(ParentC parentC) {
        parentDao.update(parentC);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        parentDao.remove(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ParentC getById(Long id) {
        return parentDao.getById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ParentC> getAll() {
        return parentDao.getAll();
    }

    @Override
    @Transactional(readOnly=true)
    public List<ParentC> getUsers(Integer begin, Integer end) {
        return this.parentDao.getUsers(begin, end);
    }

    @Override
    @Transactional(readOnly=true)
    public List<ParentC> getUsersOrderByDESC(Integer begin, Integer end) {
        return this.parentDao.getUsersOrderByDESC(begin, end);
    }

    @Override
    @Transactional(readOnly=true)
    public int getCountRows(){
        return this.parentDao.getCountRows();
    }
}

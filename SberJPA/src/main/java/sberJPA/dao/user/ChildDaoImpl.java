package sberJPA.dao.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import sberJPA.model.user.ChildC;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

import static javax.swing.UIManager.get;

@Repository
public class ChildDaoImpl implements UserDao<ChildC> {
    private static final Logger logger = LoggerFactory.getLogger(ChildDaoImpl.class);

    @PersistenceContext
    private EntityManager entityManager;

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public ChildC add(ChildC child) {
        ChildC res = entityManager.merge(child);
        logger.info("child: "+child+" successfully added.");
        return res;
    }

    @Override
    public void update(ChildC child) {
        entityManager.merge(child);
        logger.info("child: "+child+" successfully updated.");
    }

    @Override
    public void remove(Long id) {
        ChildC res = (ChildC) get(id);
        entityManager.remove(res);
        logger.info("child: "+res+" successfully removed.");
    }

    @Override
    public ChildC getById(Long id) {
        return entityManager.find(ChildC.class, id);
    }

    @Override
    public List<ChildC> getAll() {
        TypedQuery<ChildC> namedQuery = entityManager.createNamedQuery("ChildC.getAll", ChildC.class);
        return namedQuery.getResultList();
    }

    @Override
    public List<ChildC> getUsers(Integer begin, Integer end) {
        List<ChildC> childList = entityManager.createQuery("FROM ChildC", ChildC.class)
                .setFirstResult(begin).setMaxResults(end).getResultList();
        logger.info("ChildCs: "+childList.size()+" successfully loaded.");
        return childList;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<ChildC> getUsersOrderByDESC(Integer begin, Integer end) {
        List<ChildC> childList = entityManager.createQuery("FROM ChildC c ORDER BY c.id DESC")
                .setFirstResult(begin).setMaxResults(end).getResultList();
        logger.info("ChildCs: "+childList.size()+" successfully loaded.");
        return childList;
    }

    @Override
    public int getCountRows() {
        return entityManager.createQuery("SELECT count(*) FROM ChildC").getFirstResult();
    }
}

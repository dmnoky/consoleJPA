package sberJPA.dao.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import sberJPA.model.user.ParentC;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

import static javax.swing.UIManager.get;

@Repository
public class ParentDaoImpl implements UserDao<ParentC> {
    private static final Logger logger = LoggerFactory.getLogger(ParentDaoImpl.class);
    @PersistenceContext
    private EntityManager entityManager;

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public ParentC add(ParentC parent) {
        ParentC res = entityManager.merge(parent);
        logger.info("parent: "+parent+" successfully added.");
        return res;
    }

    @Override
    public void update(ParentC parent) {
        entityManager.merge(parent);
        logger.info("parent: "+parent+" successfully updated.");
    }

    @Override
    public void remove(Long id) {
        ParentC res = (ParentC) get(id);
        entityManager.remove(res);
        logger.info("parent: "+res+" successfully removed.");
    }

    @Override
    public ParentC getById(Long id) {
        return entityManager.find(ParentC.class, id);
    }

    @Override
    public List<ParentC> getAll() {
        TypedQuery<ParentC> namedQuery = entityManager.createNamedQuery("ParentC.getAll", ParentC.class);
        return namedQuery.getResultList();
    }

    @Override
    public List<ParentC> getUsers(Integer begin, Integer end) {
        List<ParentC> parentList = entityManager.createQuery("FROM ParentC", ParentC.class)
                .setFirstResult(begin).setMaxResults(end).getResultList();
        logger.info("ParentCs: "+parentList.size()+" successfully loaded.");
        return parentList;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<ParentC> getUsersOrderByDESC(Integer begin, Integer end) {
        List<ParentC> parentList = entityManager.createQuery("FROM ParentC c ORDER BY c.id DESC")
                .setFirstResult(begin).setMaxResults(end).getResultList();
        logger.info("ParentCs: "+parentList.size()+" successfully loaded.");
        return parentList;
    }

    @Override
    public int getCountRows() {
        return entityManager.createQuery("SELECT count(*) FROM ParentC").getFirstResult();
    }
}
